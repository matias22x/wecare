'use strict';
angular.module('registrosService', []).service('registrosService', function($http, config) {

    return {
        getRegistros: function(requestId) {
            return $http.get(config.api_url + '/api/registros/' + requestId);
        },
        getAllRegistross: function() {
            return $http.get(config.api_url + '/api/registros');
        },
        putRegistrosById: function(requestId, data) {
            return $http.put(config.api_url + '/api/registros/' + requestId, data);
        },
        postRegistros: function(data) {
            return $http.post(config.api_url + '/api/registros', data);
        },
        deleteRegistrosById: function(requestId) {
            return $http.delete(config.api_url + '/api/registros/' + requestId);
        },
    };

});
