'use strict';
angular.module('practitionersService', []).service('practitionerService', function($http, config) {
    return {
        getAllPractitioner: function() {
            return $http.get(config.api_url + '/api/practitioners');
        },
        getPractitionerById: function(practitionerId) {
            return $http.get(config.api_url + '/api/practitioners/' + practitionerId);
        },
        putPractitionerById: function(practitionerId, newPractitioner) {
            return $http.put(config.api_url + '/api/practitioners/' + practitionerId, newPractitioner);
        },
        postPractitioner: function(data) {
            return $http.post(config.api_url + '/api/practitioners', data);
        },
        deletePractitionerById: function(practitionerId) {
            return $http.delete(config.api_url + '/api/practitioners/' + practitionerId);
        },
        deleteUserByPractitioner: function(practitionerId) {
            return $http.delete(config.api_url + '/api/users?conditions={"role.practitioner":"' + practitionerId + '"}');
        },
        saveSpeciality: function(method, dataSpeciality) {
            if (method === 'post') {
                return $http.post(config.api_url + '/api/predetermineds', dataSpeciality);
            } else if (method === 'put') {
                return $http.put(config.api_url + '/api/predetermineds/' + dataSpeciality._id, dataSpeciality);
            }
            return false;
        },
        getSpeciality: function() {
            return $http.get(config.api_url + '/api/predetermineds');
        },
        savePractitionerRole: function(data) {
            return $http.post(config.api_url + '/api/practitionerroles', data);
        },
        getPractitionerRoleByIdPractitioner: function(practitionerId) {
            return $http.get(config.api_url + '/api/practitionerroles?conditions={"practitioner.reference":"' + practitionerId + '"}');
        },
        deletePractitionerRoleById: function(practitionerRoleId) {
            return $http.delete(config.api_url + '/api/practitionerroles/' + practitionerRoleId);
        },
        getOrganization: function(practitionerId) {
            return $http.get(config.api_url + '/api/practitionerroles?conditions={"practitioner.reference":"' + practitionerId + '"}');
        },
        getPractitionersByOrganization: function(organizationId) {
            return $http.get(config.api_url + '/api/practitionerroles?conditions={"organization.reference":"' + organizationId + '"}');
        }

    };
});
