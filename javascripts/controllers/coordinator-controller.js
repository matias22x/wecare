'use strict';
angular.module('adistalApp')
    .controller('coordinatorListCtrl', function($scope, $http, config, $log) {
        $scope.properties = ['Name', 'Created At'];
        $http.get(config.api_url + '/api/coordinators')
            .then(function(resp) {
                $scope.coordinatorList = resp.data;
                $scope.coordinatorListView = $scope.coordinatorList.map(function(item) {
                    return {
                        _id: item._id,
                        identifier: item._id,
                        name: item.name.text,
                        createdAt: item.createdAt
                    };
                });
            }).catch(function(err) {
                $log.error(err);
            });

        $scope.deleteCoordinator = function(index) {
            var coordinatorId = $scope.coordinatorList[index]._id;
            $http.delete(config.api_url + '/api/coordinators/' + coordinatorId);
            $scope.coordinatorList.splice(index, 1);
        };

    });
