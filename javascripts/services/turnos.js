'use strict';
angular.module('turnoService', []).service('turnoService', function($http, config) {

    return {
        getTurno: function(requestId) {
            return $http.get(config.api_url + '/api/turnos/' + requestId);
        },
        getAllTurnos: function() {
            return $http.get(config.api_url + '/api/turnos');
        },
        getProximosTurnosByPaciente: function(userId, fecha, cantidad) {
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"alumno":"' + userId + '"},{"horario":{"$gte": "' + fecha + '"}}]}&limit=' + cantidad);
        },
        putTurnoById: function(requestId, data) {
            return $http.put(config.api_url + '/api/turnos/' + requestId, data);
        },
        postTurno: function(data) {
            return $http.post(config.api_url + '/api/turnos', data);
        },
        deleteTurnoById: function(requestId) {
            return $http.delete(config.api_url + '/api/turnos/' + requestId);
        }
    };

});
