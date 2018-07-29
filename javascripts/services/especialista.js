'use strict';
angular.module('especialistaService', []).service('especialistaService', function($http, config) {

    return {
        getEspecialista: function(requestId) {
            return $http.get(config.api_url + '/api/especialistas/' + requestId);
        },
        getEspecialistaByUser: function(id) {
          return $http.get(config.api_url + '/api/especialistas?conditions={"user":"' + id +'"}');
        },
        getEspecialistaVerify: function(dni) {
            return $http.get(config.api_url + '/api/especialistas?conditions={"dni":"' + dni +'"}');
        },
        getAllEspecialistas: function() {
            return $http.get(config.api_url + '/api/especialistas');
        },
        putEspecialistaById: function(requestId, data) {
            return $http.put(config.api_url + '/api/especialistas/' + requestId, data);
        },
        postEspecialista: function(data) {
            return $http.post(config.api_url + '/api/especialistas', data);
        },
        deleteEspecialistaById: function(requestId) {
            return $http.delete(config.api_url + '/api/especialistas/' + requestId);
        },
    };

});
