'use strict';
angular.module('noticiasService', []).service('noticiasService', function($http, config) {

    return {
        getNoticias: function(requestId) {
            return $http.get(config.api_url + '/api/noticias/' + requestId);
        },
        getAllNoticias: function() {
            return $http.get(config.api_url + '/api/noticias');
        },
        putNoticiasById: function(requestId, data) {
            return $http.put(config.api_url + '/api/noticias/' + requestId, data);
        },
        postNoticias: function(data) {
            return $http.post(config.api_url + '/api/noticias', data);
        },
        deleteNoticiasById: function(requestId) {
            return $http.delete(config.api_url + '/api/noticias/' + requestId);
        }
    };

});
