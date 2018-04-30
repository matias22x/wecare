'use strict';
angular.module('adistalApp')

    .controller('simpleEditNodeAdministratorCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log, nodeAdministratorService) {
        var nodeAdministratorId = $stateParams.id;

        $scope._id = nodeAdministratorId;


        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.address = [{}];
        $scope.name = {};
        $scope.telecom = [{}];
        $scope.partOf = [{}];
        $scope.photo = [{}];
        $scope.data = {
            active: true
        };

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            nodeAdministratorService.getNodeAdministratorById($stateParams.id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                        if ($scope.address.length === 0) {
                            $scope.address = [{}];
                        }
                    });

                }).catch(function(err) {
                    $log.error(err);
                });
        }
        $scope.saveNodeAdministrator = function() {
            var newNodeAdministrator = {
                identifier: $scope.identifier,
                address: $scope.address,
                telecom: $scope.telecom,
                name: $scope.name,
                active: $scope.active,
                partOf: $scope.partOf
            };

            Object.keys($scope.data).forEach(function(key) {
                newNodeAdministrator[key] = $scope.data[key];
            });
            $log.info('newNodeAdministrator: ', JSON.stringify(utilities.stringToDateRecursive(newNodeAdministrator)));
            if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                nodeAdministratorService.putNodeAdministratorById($stateParams.id, utilities.stringToDateRecursive(newNodeAdministrator))
                    .then(function() {
                        $state.go('node_admin_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                nodeAdministratorService.postNodeAdministrator(utilities.stringToDateRecursive(newNodeAdministrator))
                    .then(function() {
                        $state.go('node_admin_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });

            }
        };


        $scope.cancelNodeAdministrator = function() {
            $state.go('node_admin_abm');
        };

    });
