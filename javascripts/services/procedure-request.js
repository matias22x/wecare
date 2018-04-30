'use strict';
angular.module('procedureRequestService', []).service('procedureRequestService', function($http, config) {
    return {
        getAllProcedureRequest: function(options) {
            var lim = (options && options.limit || 20);
            if(options && options.currentOrganizationId && options.CLIENT) {
                return $http.get(config.api_url + '/api/procedurerequests?conditions={"requester.onBehalfOf.reference":"' + options.currentOrganizationId + '"}&limit=' + lim);
            }else if (options && options.currentOrganizationId && options.LENDER) {
                return $http.get(config.api_url + '/api/procedurerequests?conditions={"performer.reference":"' + options.currentOrganizationId + '"}&limit=' + lim);
            }
            return $http.get(config.api_url + '/api/procedurerequests?limit=' + lim);
        },
        getProcedureRequest: function(requestId) {
            return $http.get(config.api_url + '/api/procedurerequests/' + requestId);
        },
        putProcedureRequestById: function(requestId, data) {
            return $http.put(config.api_url + '/api/procedurerequests/' + requestId, data);
        },
        postProcedureRequest: function(data) {
            return $http.post(config.api_url + '/api/procedurerequests', data);
        },
        deleteProcedureRequestById: function(requestId) {
            return $http.delete(config.api_url + '/api/procedurerequests/' + requestId);
        },
        getUserProcedureRequest: function(userId) {
            return $http.get(config.api_url + '/api/procedurerequests/?conditions={"orderer.reference":"' + userId + '"}');
        },
        getUserProcedureRequestLimit: function(userId, limit) {
            return $http.get(config.api_url + '/api/procedurerequests/?conditions={"orderer.reference":"' + userId + '"}&limit=' + limit);
        },
        getProcedureRequestsConditions: function(conditions) {
            return $http.get(config.api_url + '/api/procedurerequests/' + conditions);
        },
        searchProcedureRequestsRoute: function(data, organizationId, typeId) {
            var dataParams = '?';
            if (data) {
                data = Object.keys(data).length && typeof data === 'object' && JSON.stringify(data);
                dataParams += 'data=' + data;
            }
            if (organizationId) {
                dataParams += '&organization=' + organizationId;
            }
            if(typeId === 'CLIENT') {
                return $http.get(config.api_url + '/api/searchingordersclient' + dataParams);
            }
            return $http.get(config.api_url + '/api/searchingorderslender' + dataParams);
        },
        getProceduresCount: function() {
            return $http.get(config.api_url + '/api/procedurerequests?count=true');
        },
        getSkippedProceduresClient: function(organizationId) {
            return $http.get(config.api_url + '/api/procedurerequests/?conditions={"requester.onBehalfOf.reference":"' + organizationId + '"}&sort=-createdAt&limit=10');
        },
        getSkippedProcedures: function() {
            return $http.get(config.api_url + '/api/procedurerequests/?sort=-createdAt&limit=10');
        }
    };

});
