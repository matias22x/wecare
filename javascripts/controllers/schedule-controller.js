'use strict';
angular.module('adistalApp')
    .controller('scheduleListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/schedules')
            .then(function(resp) {
                $scope.schedule_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteSchedule = function(scheduleIndex) {
            var id = $scope.schedule_list[scheduleIndex]._id;
            $http.delete(config.api_url + '/api/schedules/' + id);
            $scope.schedule_list.splice(scheduleIndex, 1);
        };
    })
    .controller('editScheduleCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.comment = '';

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.type = [{
            coding: [{}]
        }];

        $scope.planningHorizont = {};

        $scope.actor = {};

        if (typeof $stateParams.schedule_id !== 'undefined' && $stateParams.schedule_id !== '') {
            $http.get(config.api_url + '/api/schedules/' + $stateParams.schedule_id)
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

        $scope.saveSchedule = function() {
            var newItem = {
                identifier: $scope.identifier,
                planningHorizont: $scope.planningHorizont,
                actor: $scope.actor,
                type: $scope.type,
                comment: $scope.comment
            };

            if (typeof $stateParams.schedule_id !== 'undefined' && $stateParams.schedule_id !== '') {
                $http.put(config.api_url + '/api/schedules/' + $stateParams.schedule_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('schedule');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/schedules', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('schedule');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editScheduleComment', function($scope) {
        $scope.title = 'Comment';
        $scope.model_name = 'comment';
        $scope.data = $scope.$parent;
    })
    .controller('editScheduleTypeText', function($scope, $stateParams) {
        $scope.title = 'Schedule Text';
        $scope.codeableConcept = $scope.$parent.type[$stateParams.codeable_index];
    })
    .controller('editScheduleTypeCoding', function($scope, $stateParams) {
        $scope.title = 'Schedule Coding';
        $scope.coding = $scope.$parent.type[$stateParams.codeable_index].coding[$stateParams.coding_index];
    })
    .controller('editSchedulePlaningHorizont', function($scope) {
        $scope.title = 'Planning Horizont';
        $scope.period = $scope.$parent.planningHorizont;
    })
    .controller('editScheduleActor', function($scope) {
        $scope.title = 'Actor';
        $scope.reference = $scope.$parent.actor;
    });
