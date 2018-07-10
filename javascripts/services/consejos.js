'use strict';
angular.module('consejosService', []).service('consejosService', function($http, config) {

    return {
        getConsejos: function(requestId) {
            return $http.get(config.api_url + '/api/consejos/' + requestId);
        },
        getAllConsejos: function() {
            return $http.get(config.api_url + '/api/consejos');
        },
        putConsejosById: function(requestId, data) {
            return $http.put(config.api_url + '/api/consejos/' + requestId, data);
        },
        postConsejos: function(data) {
            return $http.post(config.api_url + '/api/consejos', data);
        },
        deleteConsejosById: function(requestId) {
            return $http.delete(config.api_url + '/api/consejos/' + requestId);
        }
    };

});
