'use strict';
angular.module('patientsService', []).service('patientsService', function($http, config) {
    return {
        getAllPatient: function() {
            return $http.get(config.api_url + '/api/patients');
        },
        getPatientById: function(patientId) {
            return $http.get(config.api_url + '/api/patients/' + patientId);
        },
        getPatientByDni: function(patientDni) {
            return $http.get(config.api_url + '/api/patients/?conditions={"identifier.value":"' + patientDni + '"}');
        },
        searchPatient: function(query, limit) {
            limit = limit || 25;
            return $http.get(config.api_url + '/api/patients/?conditions={"$or":[{"identifier.value":{"$regex":"' + query + '","$options":"i"}},{"name.text":{"$regex":"' + query + '","$options":"i"}}]}&limit=' + limit);
        },
        putPatientById: function(patientId, newPatient) {
            return $http.put(config.api_url + '/api/patients/' + patientId, newPatient);
        },
        postPatient: function(data) {
            return $http.post(config.api_url + '/api/patients', data);
        },
        deletePatientById: function(patientId) {
            return $http.delete(config.api_url + '/api/patients/' + patientId);
        },
        putPatientByIdDateRecursive: function(stateParamsId, dataPatient) {
            return $http.put(config.api_url + '/api/patients/' + stateParamsId, dataPatient);
        },
        postPatientByIdDateRecursive: function(dataPatient) {
            return $http.post(config.api_url + '/api/patients', dataPatient);
        }

    };
});
