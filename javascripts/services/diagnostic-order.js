'use strict';
angular.module('diagnosticOrderService', []).service('diagnosticOrderService', function($http, config) {
    return {
        getAllDiagnosticOrder: function(limit) {
            if (limit) {
                return $http.get(config.api_url + '/api/diagnosticorders?limit=' + limit);
            }
            return $http.get(config.api_url + '/api/diagnosticorders');
        },
        getDiagnosticOrder: function(diagnosticId) {
            return $http.get(config.api_url + '/api/diagnosticorders/' + diagnosticId);
        },
        putDiagnosticOrderById: function(diagnosticId, data) {
            return $http.put(config.api_url + '/api/diagnosticorders/' + diagnosticId, data);
        },
        postDiagnosticOrder: function(data) {
            return $http.post(config.api_url + '/api/diagnosticorders', data);
        },
        deleteDiagnosticOrderById: function(diagnosticId) {
            return $http.delete(config.api_url + '/api/diagnosticorders/' + diagnosticId);
        },
        getUserDiagnosticOrder: function(userId) {
            return $http.get(config.api_url + '/api/diagnosticorders/?conditions={"orderer.reference":"' + userId + '"}');
        },
        getUserDiagnosticOrderLimit: function(userId, limit) {
            return $http.get(config.api_url + '/api/diagnosticorders/?conditions={"orderer.reference":"' + userId + '"}&limit=' + limit);
        },
        searchDiagnosticOrder: function(data, userId) {
            if (userId) {
                return $http.get(config.api_url + '/api/diagnosticorders?conditions={"$and":[{"$or":[{"identifier.system":{"$regex": "' + data + '", "$options": "i"}},{"orderer.display":{"$regex":"' + data + '", "$options": "i"}},{"subject.display":{"$regex":"' + data + '", "$options": "i"}},{"identifier.value":{"$regex":"' + data + '", "$options": "i"}}]},{"orderer.reference":"' + userId + '"}]}');
            }
            return $http.get(config.api_url + '/api/searchingorders?name=' + data);
        },
        searchDiagnosticOrderByDate: function(dateStart, dateEnd) {
            return $http.get(config.api_url + '/api/diagnosticorders?conditions={"$and":[{"createdAt":{"$gte": "' + dateStart + '"}},{"createdAt":{"$lte": "' + dateEnd + '"}}]}');
        }
    };
});
