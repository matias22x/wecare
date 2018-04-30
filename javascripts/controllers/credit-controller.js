'use strict';
angular.module('adistalApp')
    .controller('creditListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/credits')
            .then(function(resp) {
                $scope.credit_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteCredit = function(creditIndex) {
            var creditId = $scope.credit_list[creditIndex]._id;
            $http.delete(config.api_url + '/api/credits/' + creditId);
            $scope.credit_list.splice(creditIndex, 1);
        };
    })
    .controller('editCreditCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.value = '';

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.managingOrganization = {};

        if (typeof $stateParams.credit_id !== 'undefined' && $stateParams.credit_id !== '') {
            $http.get(config.api_url + '/api/credits/' + $stateParams.credit_id)
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

        $scope.saveCredit = function() {
            var newItem = {
                identifier: $scope.identifier,
                value: $scope.value,
                managingOrganization: $scope.managingOrganization
            };

            if (typeof $stateParams.credit_id !== 'undefined' && $stateParams.credit_id !== '') {
                $http.put(config.api_url + '/api/credits/' + $stateParams.credit_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('credit');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/credits', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('credit');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editCreditManagingOrganization', function($scope) {
        $scope.reference = $scope.$parent.managingOrganization;
    })
    .controller('editCreditValueCtrl', function($scope) {
        $scope.title = 'Credit Value';
        $scope.model_name = 'value';
        $scope.data = $scope.$parent;
    });
