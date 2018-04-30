'use strict';
angular.module('adistalApp')
    .controller('locationListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/locations')
            .then(function(resp) {
                $scope.location_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteLocation = function(locationIndex) {
            var id = $scope.location_list[locationIndex]._id;
            $http.delete(config.api_url + '/api/locations/' + id);
            $scope.location_list.splice(locationIndex, 1);
        };
    })
    .controller('editLocationCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.status = '';
        $scope.description = '';
        $scope.mode = '';
        $scope.name = '';

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.physicalType = {
            coding: [{}]
        };

        $scope.telecom = [{}];

        $scope.address = {};

        $scope.locationPosition = {};

        $scope.type = [{
            coding: [{}]
        }];

        $scope.partOf = {};

        if (typeof $stateParams.location_id !== 'undefined' && $stateParams.location_id !== 'undefined') {
            $http.get(config.api_url + '/api/locations/' + $stateParams.location_id)
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

        $scope.saveLocation = function() {
            var newItem = {
                identifier: $scope.identifier,
                physicalType: $scope.physicalType,
                address: $scope.address,
                telecom: $scope.telecom,
                type: $scope.type,
                locationPosition: $scope.locationPosition,
                status: $scope.status,
                description: $scope.description,
                mode: $scope.mode,
                name: $scope.name
            };

            if (typeof $stateParams.location_id !== 'undefined' && $stateParams.location_id !== '') {
                $http.put(config.api_url + '/api/locations/' + $stateParams.location_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('location');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/locations', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('location');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editLocationStatus', function($scope) {
        $scope.title = 'Status';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent;
    })
    .controller('editLocationDescription', function($scope) {
        $scope.title = 'Description';
        $scope.model_name = 'description';
        $scope.data = $scope.$parent;
    })
    .controller('editLocationMode', function($scope) {
        $scope.title = 'Mode';
        $scope.model_name = 'mode';
        $scope.data = $scope.$parent;
    })
    .controller('editLocationName', function($scope) {
        $scope.title = 'Name';
        $scope.model_name = 'name';
        $scope.data = $scope.$parent;
    })
    .controller('editLocationManagingOrganization', function($scope) {
        $scope.title = 'Managing Organization';
        $scope.reference = $scope.$parent.schedule;
    })
    .controller('editLocationPhysicalTypeText', function($scope) {
        $scope.title = 'PhysicalType Text';
        $scope.codeableConcept = $scope.$parent.physicalType;
    })
    .controller('editLocationPhysicalTypeCoding', function($scope, $stateParams) {
        $scope.title = 'PhysicalType Coding';
        $scope.coding = $scope.$parent.physicalType.coding[$stateParams.coding_index];
    })
    .controller('editLocationTelecom', function($scope, $stateParams) {
        $scope.title = 'Telecom';
        $scope.contactPoint = $scope.$parent.telecom[$stateParams.index];
    })
    .controller('editLocationAddress', function($scope) {
        $scope.title = 'Address';
        $scope.address = $scope.$parent.address;
    })
    .controller('editLocationPosition', function($scope) {
        $scope.title = 'Position';
        $scope.locationPosition = $scope.$parent.position;
    })
    .controller('editLocationTypeText', function($scope, $stateParams) {
        $scope.title = 'Location Type Text';
        $scope.codeableConcept = $scope.$parent.type[$stateParams.codeable_index];
    })
    .controller('editLocationTypeCoding', function($scope, $stateParams) {
        $scope.title = 'Location Type Coding';
        $scope.coding = $scope.$parent.type[$stateParams.codeable_index].coding[$stateParams.coding_index];
    })
    .controller('editLocationPartOf', function($scope) {
        $scope.title = 'Part Of';
        $scope.reference = $scope.$parent.partOf;
    });
