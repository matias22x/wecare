'use strict';
angular.module('diagnosticoPrematuroService', []).service('diagnosticoPrematuroService', function($http, config) {

    return {
        getDiagnosticoPrematuro: function(requestId) {
            return $http.get(config.api_url + '/api/diagnosticoprematuros/' + requestId);
        },
        getAllDiagnosticosPrematuros: function() {
            return $http.get(config.api_url + '/api/diagnosticoprematuros');
        },
        putDiagnosticoPrematuroById: function(requestId, data) {
            return $http.put(config.api_url + '/api/diagnosticoprematuros/' + requestId, data);
        },
        postDiagnosticoPrematuro: function(data) {
            return $http.post(config.api_url + '/api/diagnosticoprematuros', data);
        },
        deleteDiagnosticoPrematuro: function(requestId) {
            return $http.delete(config.api_url + '/api/diagnosticoprematuros/' + requestId);
        },
    };

});
