'use strict';
angular.module('userService', []).service('userService', function($http, config) {

    return {
        getUser: function(requestId) {
            return $http.get(config.api_url + '/api/users/' + requestId);
        },
        getUserByUserName: function(username) {
            return $http.get(config.api_url + '/api/users?conditions={"username":"' + username +'"}');
        },
        getAllUsers: function() {
            return $http.get(config.api_url + '/api/users');
        },
        putUserById: function(requestId, data) {
            return $http.put(config.api_url + '/api/users/' + requestId, data);
        },
        postUser: function(data) {
            return $http.post(config.api_url + '/api/users', data);
        },
        deleteUserById: function(requestId) {
            return $http.delete(config.api_url + '/api/users/' + requestId);
        },
        estadisticas: function() {
            return $http.get(config.api_url + '/estadisticas');
        }
    };

});
