'use strict';
angular.module('adistalApp')
    .controller('organizationAdministratorListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/organizationadministrators')
            .then(function(resp) {
                $scope.organization_administrator_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteOrganizationAdministrator = function(organizationAdministratorIndex) {
            var id = $scope.organization_administrator_list[organizationAdministratorIndex]._id;
            $http.delete(config.api_url + '/api/organizationadministrators/' + id);
            $scope.organization_administrator_list.splice(organizationAdministratorIndex, 1);
        };
    });
