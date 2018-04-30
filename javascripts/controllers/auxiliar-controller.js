'use strict';
angular.module('adistalApp')
    .controller('auxiliarListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/auxiliars')
            .then(function(resp) {
                $scope.auxiliar_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteAuxiliar = function(auxiliarIndex) {
            var id = $scope.auxiliar_list[auxiliarIndex]._id;
            $http.delete(config.api_url + '/api/auxiliars/' + id);
            $scope.auxiliar_list.splice(auxiliarIndex, 1);
        };
    });
