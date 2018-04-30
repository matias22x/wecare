'use strict';
angular.module('nodeAdministratorService', []).service('nodeAdministratorService', function($http, config) {
    return {
        getAllNodeAdministrators: function() {
            return $http.get(config.api_url + '/api/nodeadministrators');
        },
        getNodeAdministratorById: function(nodeAdministratorId) {
            return $http.get(config.api_url + '/api/nodeadministrators/' + nodeAdministratorId);
        },
        putNodeAdministratorById: function(nodeAdministratorId, data) {
            return $http.put(config.api_url + '/api/nodeadministrators/' + nodeAdministratorId, data);
        },
        postNodeAdministrator: function(data) {
            return $http.post(config.api_url + '/api/nodeadministrators', data);
        },
        deleteNodeAdministratorById: function(nodeAdministratorId) {
            return $http.delete(config.api_url + '/api/nodeadministrators/' + nodeAdministratorId);
        }
    };

});
