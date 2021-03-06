'use strict';
angular.module('alumnoService', []).service('alumnoService', function($http, config) {

    return {
        getAlumno: function(requestId) {
            return $http.get(config.api_url + '/api/pacientes/' + requestId);
        },
        getAlumnoByUser: function(id) {
          return $http.get(config.api_url + '/api/pacientes?conditions={"user":"' + id +'"}');
        },
        getAlumnoByDni: function(dni) {
          return $http.get(config.api_url + '/api/pacientes?conditions={"dni":"' + dni +'"}');
        },
        getAllAlumnos: function() {
            return $http.get(config.api_url + '/api/pacientes');
        },
        putAlumnoById: function(requestId, data) {
            return $http.put(config.api_url + '/api/pacientes/' + requestId, data);
        },
        postAlumno: function(data) {
            return $http.post(config.api_url + '/api/pacientes', data);
        },
        deleteAlumnoById: function(requestId) {
            return $http.delete(config.api_url + '/api/pacientes/' + requestId);
        },
        getAlumnoByUserId: function(requestId) {
            return $http.get(config.api_url + '/api/pacientes?conditions={"user":"' + requestId +'"}');
        },
        getAlumnoByEspecialistaId: function(especialistaId) {
            return $http.get(config.api_url + '/api/pacientes?conditions={"especialistaAsociado":"' + especialistaId +'"}');
        }
    };

});
