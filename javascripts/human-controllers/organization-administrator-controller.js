'use strict';
angular.module('adistalApp')
    .controller('simpleEditOrganizationAdministratorCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.address = [{}];
        $scope.name = {};
        $scope.telecom = [{}];
        $scope.partOf = [{}];
        $scope.photo = [];
        $scope.data = {
            active: true
        };
        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $http.get(config.api_url + '/api/organizationadministrators/' + $stateParams.id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                    });

                    if (resp.data.photo) {
                        $scope.file_upload = resp.data.photo[0];
                    }

                }).catch(function(err) {
                    $log.error(err);
                });
        }

        $scope.saveorganizationAdministrator = function() {
            var newOrganizationAdministrator = {
                identifier: $scope.identifier,
                address: $scope.address,
                telecom: $scope.telecom,
                name: $scope.name,
                photo: $scope.photo,
                active: $scope.active,
                partOf: $scope.partOf
            };
            Object.keys($scope.data).forEach(function(key) {
                newOrganizationAdministrator[key] = $scope.data[key];
            });

            if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                $http.put(config.api_url + '/api/organizationadministrators/' + $stateParams.id, utilities.stringToDateRecursive(newOrganizationAdministrator))
                    .then(function() {
                        $state.go('organizationadministrator_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/organizationadministrators', utilities.stringToDateRecursive(newOrganizationAdministrator))
                    .then(function() {
                        $state.go('organizationadministrator_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };

        $scope.cancelorganizationAdministrator = function() {
            $state.go('organizationadministrator_abm');
        };


    });
