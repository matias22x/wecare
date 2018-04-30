'use strict';
angular.module('adistalApp')
    .controller('simpleAuxiliarCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {
        var auxiliarId = $stateParams.id;
        $scope._id = auxiliarId;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.active = true;
        $scope.name = {};
        $scope.telecom = [{}];
        $scope.address = [{
            use: '',
            line: '',
            postalCode: ''
        }];
        $scope.photo = [];
        $scope.auxiliarRole = [{
            managingOrganization: {},
            role: {
                coding: [{}]
            }
        }];
        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $http.get(config.api_url + '/api/auxiliars/' + $stateParams.id)
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

        $scope.saveAuxiliar = function() {
            var newItem = {
                identifier: $scope.identifier,
                address: $scope.address,
                name: $scope.name,
                telecom: $scope.telecom,
                photo: $scope.photo,
                auxiliarRole: $scope.auxiliarRole,
                active: $scope.active
            };

            if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                $http.put(config.api_url + '/api/auxiliars/' + $stateParams.id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('auxiliar_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });

            } else {
                $http.post(config.api_url + '/api/auxiliars', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('auxiliar_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };

        $scope.cancelAuxiliar = function() {
            $state.go('auxiliar_abm');
        };

    });
