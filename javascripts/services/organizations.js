'use strict';
angular.module('organizationsService', []).service('organizationsService', function($http, config) {
    return {
        getAllOrganizations: function(params) {
            if(params) {
                params = '&conditions=' + JSON.stringify(params);
            }
            return $http.get(config.api_url + '/api/organizations?populate=specialties' + params);
        },
        getOrganizationById: function(organizationId) {
            return $http.get(config.api_url + '/api/organizations/' + organizationId + '?populate=specialties');
        },
        putOrganizationById: function(organizationId, data) {
            return $http.put(config.api_url + '/api/organizations/' + organizationId, data);
        },
        postOrganization: function(data) {
            return $http.post(config.api_url + '/api/organizations', data);
        },
        deleteOrganizationById: function(organizationId) {
            return $http.delete(config.api_url + '/api/organizations/' + organizationId);
        },
        getOrganizationByNotId: function(organizationId) {
            return $http.get(config.api_url + '/api/organizations/?conditions={"_id":{"$not":{"$eq":"' + organizationId + '"}}}');
        },
        getOrganizationNotChild: function(organizationId) {
            return $http.get(config.api_url + '/api/organizations/?conditions={"request.reference":{"$not":{"$eq":"' + organizationId + '"}},"_id":{"$not":{"$eq":"' + organizationId + '"}}}');
        },
        putOrganizationAdministrator: function(organizationAdministratorId, newOrganizationAdministrator) {
            return $http.put(config.api_url + '/api/organizationadministrators/' + organizationAdministratorId, newOrganizationAdministrator);
        },
        getOrganizationWithReference: function(atribute) {
            var populate = '';
            if (atribute) {
                populate = '&populate=' + atribute;
            }
            return $http.get(config.api_url + '/api/organizations/?conditions={"partOf.reference":{"$exists": ' + true + '}}' + populate);
        }
    };

});
