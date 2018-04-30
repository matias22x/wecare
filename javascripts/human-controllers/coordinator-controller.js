'use strict';
angular.module('adistalApp')

.controller('simpleEditCoordinatorCtrl', function($scope, $http, $state, $stateParams, config, utilities, $log) {
    var id = $stateParams.id;
    $scope._id = id;


    $scope.identifier = [{
        type: {
            coding: [{}]
        },
        assigner: {}
    }];
    $scope.address = [{
        use: '',
        line: '',
        postalCode: ''
    }];
    $scope.name = {};
    $scope.telecom = [{
        'system': 'phone home'
    }, {
        'system': 'phone'
    }, {
        'system': 'email'
    }];

    $scope.photo = [];
    $scope.data = {
        active: true
    };

    if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
        $http.get(config.api_url + '/api/coordinators/' + $stateParams.id)
            .then(function(resp) {
                Object.keys(resp.data).forEach(function(key) {
                    if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                        $scope[key] = resp.data[key];
                    }
                });
                if (typeof resp.data.photo !== 'undefined') {
                    $scope.file_upload = resp.data.photo[0];
                }
            }).catch(function(err) {
                $log.error(err);
            });
    }

    $scope.saveCoordinator = function() {
        var newCoordinator = {
            identifier: $scope.identifier,
            address: $scope.address,
            name: $scope.name,
            telecom: $scope.telecom,
            photo: $scope.photo
        };
        Object.keys($scope.data).forEach(function(key) {
            newCoordinator[key] = $scope.data[key];
        });

        $log.info(newCoordinator);
        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $http.put(config.api_url + '/api/coordinators/' + $stateParams.id, utilities.stringToDateRecursive(newCoordinator))
                .then(function() {
                    $state.go('coordinator_abm');
                }).catch(function(err) {
                    $log.error(err);
                });
        } else {
            $http.post(config.api_url + '/api/coordinators', utilities.stringToDateRecursive(newCoordinator))
                .then(function() {
                    $state.go('coordinator_abm');
                }).catch(function(err) {
                    $log.error(err);
                });
        }
    };

    $scope.cancelCoordinator = function() {
        $state.go('coordinator_abm');
    };

});
