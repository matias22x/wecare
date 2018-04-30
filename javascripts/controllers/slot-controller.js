'use strict';
angular.module('adistalApp')
    .controller('slotListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/slots')
            .then(function(resp) {
                $scope.slot_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteSlot = function(slotIndex) {
            var id = $scope.slot_list[slotIndex]._id;
            $http.delete(config.api_url + '/api/slots/' + id);
            $scope.slot_list.splice(slotIndex, 1);
        };
    })
    .controller('editSlotCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.type = [{
            coding: [{}]
        }];
        $scope.schedule = {};

        $scope.overbooked = '';
        $scope.comment = '';
        $scope.freeBusyType = '';
        $scope.start = '';
        $scope.end = '';


        if (typeof $stateParams.slot_id !== 'undefined' && $stateParams.slot_id !== 'undefined') {
            $http.get(config.api_url + '/api/slots/' + $stateParams.slot_id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                    });
                }).catch(function(err) {
                    $log.error(err);
                });
        }

        $scope.saveSlot = function() {
            var newItem = {
                identifier: $scope.identifier,
                schedule: $scope.schedule,
                type: $scope.type,
                freeBusyType: $scope.freeBusyType,
                overbooked: $scope.overbooked,
                comment: $scope.comment,
                start: $scope.start,
                end: $scope.end
            };
            if (typeof $stateParams.slot_id !== 'undefined' && $stateParams.slot_id !== '') {
                $http.put(config.api_url + '/api/slots/' + $stateParams.slot_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('slot');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/slots', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('slot');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editSlotComment', function($scope) {
        $scope.title = 'Comment';
        $scope.model_name = 'comment';
        $scope.data = $scope.$parent;
    })
    .controller('editSlotFreeBusyType', function($scope) {
        $scope.title = 'Free Busy Type';
        $scope.model_name = 'freeBusyType';
        $scope.data = $scope.$parent;
    })
    .controller('editSlotTypeText', function($scope, $stateParams) {
        $scope.title = 'Slot Text';
        $scope.codeableConcept = $scope.$parent.type[$stateParams.codeable_index];
    })
    .controller('editSlotTypeCoding', function($scope, $stateParams) {
        $scope.title = 'Slot Coding';
        $scope.coding = $scope.$parent.type[$stateParams.codeable_index].coding[$stateParams.coding_index];
    })
    .controller('editSlotStart', function($scope) {
        $scope.title = 'Start';
        $scope.subtitle = 'date';
        $scope.model_name = 'start';
        $scope.data = $scope.$parent;
    })
    .controller('editSlotEnd', function($scope) {
        $scope.title = 'End';
        $scope.subtitle = 'date';
        $scope.model_name = 'end';
        $scope.data = $scope.$parent;
    })
    .controller('editSlotOverBookead', function($scope) {
        $scope.title = 'OverBooked';
        $scope.model_name = 'overbooked';
        $scope.data = $scope.$parent;
    })
    .controller('editSlotSchedule', function($scope) {
        $scope.title = 'Schedule';
        $scope.reference = $scope.$parent.schedule;
    });
