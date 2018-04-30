'use strict';
angular.module('observationService', []).service('observationService', function($http, config) {
    return {
        getAllObservation: function() {
            return $http.get(config.api_url + '/api/observations');
        },
        getObservation: function(observationId) {
            return $http.get(config.api_url + '/api/observations/' + observationId);
        },
        putObservationById: function(observationId, data) {
            return $http.put(config.api_url + '/api/observations/' + observationId, data);
        },
        postObservation: function(data) {
            return $http.post(config.api_url + '/api/observations', data);
        },
        deleteObservationById: function(observationId) {
            return $http.delete(config.api_url + '/api/observations/' + observationId);
        },
        getPatientObservation: function(patientIdentifier) {
            return $http.get(config.api_url + '/api/observations/?conditions={"subject.reference":"' + patientIdentifier + '"}');
        }
    };

});
