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
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"alumno":"' + userId + '"},{"horario":{"$gte": "' + fecha + '"}}]}');
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
            fechaFin.setHours(0,0,0,0);
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"especialista":"' + especialistaId + '"},{"horario":{"$gte": "' + fechaInicio + '"}},{"horario":{"$lte": "' + fechaFin + '"}},{"sesion.observaciones":{"$exists": false}}]}');
        },
        getTurnosEspecialista: function(especialistaId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"especialista":"' + especialistaId + '"}');
        },
        getTurnosEspecialistaPorFecha: function(especialistaId, desde, hasta) {
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"especialista":"' + especialistaId + '"},{"horario":{"$gte": "' + desde + '"}},{"horario":{"$lte": "' + hasta + '"}}]}');
        },
        getTurnosAlumno: function(alumnoId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"alumno":"' + alumnoId + '"}');
        },
        getTurnosAlumnoPorFecha: function(desde, hasta, alumnoId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"alumno":"' + alumnoId + '"},{"horario":{"$gte": "' + desde + '"}},{"horario":{"$lte": "' + hasta + '"}}]}');
        },
        getTurnoPorFechaDeEspecialista: function(turno, especialistaId) {
            return $http.get(config.api_url + '/api/turnos?conditions={"$and":[{"horario":"' + turno + '"},{"especialista":"' + especialistaId + '"}]}');
        },
    };

});
