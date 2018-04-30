'use strict';
angular.module('adistalApp')
    .controller('planListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/plans')
            .then(function(resp) {
                $scope.plan_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deletePlan = function(planIndex) {
            var id = $scope.plan_list[planIndex]._id;
            $http.delete(config.api_url + '/api/plans/' + id);
            $scope.plan_list.splice(planIndex, 1);
        };
    })
    .controller('editPlanCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.buyCredit = false;
        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.serviceType = [{}];
        $scope.providerOrganization = [{}];
        $scope.clientOrganization = {};

        if (typeof $stateParams.plan_id !== 'undefined' && $stateParams.plan_id !== 'undefined') {
            $http.get(config.api_url + '/api/plans/' + $stateParams.plan_id)
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

        $scope.savePlan = function() {
            var newItem = {
                identifier: $scope.identifier,
                serviceType: $scope.serviceType,
                providerOrganization: $scope.providerOrganization,
                clientOrganization: $scope.clientOrganization,
                buyCredit: $scope.buyCredit
            };

            if (typeof $stateParams.plan_id !== 'undefined' && $stateParams.plan_id !== '') {
                $http.put(config.api_url + '/api/plans/' + $stateParams.plan_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('plan');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/plans', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('plan');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editPlanBuyCreditCtrl', function($stateParams, $scope) {
        $scope.title = 'Buy Credit';
        $scope.model_name = 'buyCredit';
        $scope.data = $scope.$parent;
    })
    .controller('editPlanServiceTypeCtrl', function($stateParams, $scope) {
        $scope.title = 'Service Type';
        $scope.reference = $scope.$parent.serviceType[$stateParams.index];
    })
    .controller('editPlanProviderOrganizationCtrl', function($stateParams, $scope) {
        $scope.title = 'Provider Organization';
        $scope.reference = $scope.$parent.providerOrganization[$stateParams.index];
    })
    .controller('editPlanClientOrganizationCtrl', function($scope) {
        $scope.title = 'Client Organization';
        $scope.reference = $scope.$parent.clientOrganization;
    });
