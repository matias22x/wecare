'use strict';
angular.module('auxiliarService', []).service('auxiliarService', function($http, config) {
    return {
        getAuxiliars: function() {
            return $http.get(config.api_url + '/api/auxiliars/');
        },
        getAuxiliar: function(auxiliarId) {
            return $http.get(config.api_url + '/api/auxiliars/' + auxiliarId);
        },
        postAuxiliar: function(auxiliar) {
            return $http.post(config.api_url + '/api/auxiliars/', auxiliar);
        },
        putAuxiliar: function(auxiliarId, auxiliar) {
            return $http.put(config.api_url + '/api/auxiliars/' + auxiliarId, auxiliar);
        }
    };
});
