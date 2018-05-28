'use strict';
angular.module('wecareApp')
  .controller('listadoAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
        alumnoService.getAllAlumnos()
        .then(function(alumnos) {
            $scope.listadoAlumnos = alumnos.data;
            console.log($scope.listadoAlumnos);
        }).catch($log.error);

  })
  .controller('agregarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $location, config, alumnoService, userService, moment) {
    $scope.alumnoNuevo = {};
    $scope.usuario = {};
    $scope.alumnoDatos = {};
    $scope.alumno = {};

    $scope.crearAlumno = function() {
      var esp = $scope.alumnoNuevo;
      if (esp.username && esp.email && esp.dni && esp.nombre && esp.direccion && esp.fecha_nacimiento && esp.password) {
        $scope.usuario.username = esp.username;
        $scope.usuario.password = esp.password;
        $scope.usuario.email = esp.email;
        $scope.usuario.tipo = 'alumno'

        $scope.alumnoDatos.dni = esp.dni;
        $scope.alumnoDatos.nombre = esp.nombre;
        $scope.alumnoDatos.direccion = esp.direccion;
        $scope.alumnoDatos.fecha_nacimiento = esp.fecha_nacimiento;

        userService.postUser($scope.usuario)
        .then(function(user) {
            $scope.alumnoDatos.user = user.data;
            $scope.alumnoDatos.user = user.data._id;
            return alumnoService.postAlumno($scope.alumnoDatos);
        }).then(function(alumno) {
          $location.path("/listado_alumnos");
        }).catch($log.error);

      } else {
        $scope.mensajeErrorIncompleto = true;
      }
    }

    $scope.esconderError = function() {
      $scope.mensajeErrorIncompleto = false;
    }

  })
  .controller('editarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {

    var id = $stateParams.id;

    alumnoService.getAlumno(id)
    .then(function(alumnoAModificar){
        $scope.alumno = alumnoAModificar.data;
        $scope.alumno.fecha_nacimiento = new Date ($scope.alumno.fecha_nacimiento);
    }).catch($log.error);

    $scope.modificarUsuario = function() {
      alumnoService.putAlumnoById($scope.alumno._id, $scope.alumno)
      .then(function(resp) {
        console.log('LISTO', resp);
        $location.path("/listado_alumnos");
      }).catch($log.error);
    }
  })
  .controller('verAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {
    var id = $stateParams.id;

    alumnoService.getAlumno(id)
    .then(function(alumno){
        $scope.alumno = alumno.data;
        $scope.alumno.fecha_nacimiento = new Date ($scope.alumno.fecha_nacimiento);

        userService.getUser($scope.alumno.user)
        .then(function(user){
            $scope.user = user.data;
            $scope.user.createdAt = new Date ($scope.user.createdAt);
            $scope.user.updatedAt = new Date ($scope.user.updatedAt);
        }).catch($log.error);
    }).catch($log.error);

  })
  .controller('borrarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {

    var id = $stateParams.id;

    alumnoService.getAlumno(id)
    .then(function(alumnoABorrar){
        $scope.alumno = alumnoABorrar.data;
        $scope.alumno.fecha_nacimiento = new Date ($scope.alumno.fecha_nacimiento);
    }).catch($log.error);

    $scope.borrarAlumno = function() {
        var id = $scope.alumno._id;
        var userId = $scope.alumno.user;
        alumnoService.deleteAlumnoById(id)
        .then(function() {
            console.log('userId', userId);
            return userService.deleteUserById(userId);
        })
        .then(function(userEliminado) {
            console.log(userEliminado.data);
            console.log('LISTO', userEliminado);
            $location.path("/listado_alumnos");
        })
        .catch($log.error);

    };
  });
