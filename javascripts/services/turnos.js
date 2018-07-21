'use strict';
angular.module('turnoService', []).service('turnoService', function($http, config, moment) {

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
        },
        getTurnosdeHoyEspecialista: function(especialistaId) {
            var fechaInicio = new Date();
            fechaInicio.setHours(0,0,0,0);
            var fechaFin = new Date();
            fechaFin.setDate(fechaInicio.getDate() + 1);

            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"especialista":"' + especialistaId + '"},{"horario":{"$gte": "' + fechaInicio + '"}},{"horario":{"$lte": "' + fechaFin + '"}}]}');
        },
        getTurnosEspecialista: function(especialistaId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"especialista":"' + especialistaId + '"}');
        },
        getTurnosAlumno: function(alumnoId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"alumno":"' + alumnoId + '"}');
        },
        getTurnoPorFecha: function(turno) {
            return $http.get(config.api_url + '/api/turnos?conditions={"horario":"' + turno + '"}');
        },
    };

});
