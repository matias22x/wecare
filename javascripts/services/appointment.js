'use strict';
angular.module('appointmentService', []).service('appointmentService', function($http, config) {
    return {
        getAllAppointment: function() {
            return $http.get(config.api_url + '/api/appointments');
        },
        getAppointmentById: function(appointmentId) {
            return $http.get(config.api_url + '/api/appointments/' + appointmentId);
        },
        putAppointmentById: function(appointmentId, newAppointment) {
            return $http.put(config.api_url + '/api/appointments/' + appointmentId, newAppointment);
        },
        postAppointment: function(data) {
            return $http.post(config.api_url + '/api/appointments', data);
        },
        deleteAppointmentById: function(appointmentId) {
            return $http.delete(config.api_url + '/api/appointments/' + appointmentId);
        },
        getAppointmentByRequestReference: function(reference) {
            return $http.get(config.api_url + '/api/appointments/?conditions={"request.reference":"' + reference + '"}');
        },
        callState: function(userId) {
            return $http.get(config.api_url + '/api/appointments/?conditions={"$and": [{"participant.0.actor.reference":"' + userId + '"},{"status": "pending"}]}');
        },
        checkRooms: function(userId) {
            return $http.get(config.api_url + '/api/appointments/?conditions={"$and": [{"participant.actor.reference":"' + userId + '"},{"status": "arrived"}]}&limit=1');
        },
        cancelCall : function(data) {
            return $http.post(config.api_url + '/api/finishcurrentcall', data);
        }
    };
});
