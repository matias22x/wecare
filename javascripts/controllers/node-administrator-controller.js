'use strict';

angular.module('adistalApp')
    .controller('nodeAdministratorListCtrl', function($scope, $http, config, $log) {
        $scope.properties                 = ['Name', 'Created At'];
        $http.get(config.api_url + '/api/nodeadministrators')
            .then(function(resp) {
                $scope.node_administrator_list    = resp.data;
                $scope.nodeAdministratorsListView = $scope.node_administrator_list.map(function(item) {
                    return {
                        _id:        item._id,
                        identifier: item._id,
                        name:       item.name.text,
                        createdAt:  item.createdAt
                    };
                });
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteNodeAdministrator = function(index) {
            var id = $scope.node_administrator_list[index]._id;

            $http.delete(config.api_url + '/api/nodeadministrators/' + id);
            $scope.node_administrator_list.splice(index, 1);
        };
    });
