'use strict';
angular.module('wecareApp')
  .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
        especialistaService.getAllEspecialistas()
        .then(function(especialistas) {
            $scope.listadoEspecialistas = especialistas.data;
            console.log($scope.listadoEspecialistas);
        }).catch($log.error);

        $scope.borrarEspecialista = function(especialistaIndex) {
            var id = $scope.listadoEspecialistas[especialistaIndex]._id;
            especialistaService.deleteEspecialistaById(id)
            .then(function() {
                var userId = $scope.listadoEspecialistas[especialistaIndex].user;
                console.log('userId', userId);
                $scope.listadoEspecialistas.splice(especialistaIndex, 1);
                return userService.deleteUserById(userId);
            })
            .then(function(userEliminado) {
                console.log(userEliminado.data);
            })
            .catch($log.error);

        };

  })
  .controller('agregarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $location, config, especialistaService, userService, moment) {
    $scope.especialistaNuevo = {};
    $scope.usuario = {};
    $scope.especialistaDatos = {};
    $scope.especialista = {};

    $scope.crearEspecialista = function() {
      var esp = $scope.especialistaNuevo;
      if (esp.username && esp.email && esp.dni && esp.nombre && esp.direccion && esp.fecha_nacimiento && esp.password) {
        $scope.usuario.username = esp.username;
        $scope.usuario.password = esp.password;
        $scope.usuario.email = esp.email;
        $scope.usuario.tipo = 'especialista'

        $scope.especialistaDatos.dni = esp.dni;
        $scope.especialistaDatos.nombre = esp.nombre;
        $scope.especialistaDatos.direccion = esp.direccion;
        $scope.especialistaDatos.fecha_nacimiento = esp.fecha_nacimiento;

        userService.postUser($scope.usuario)
        .then(function(user) {
            $scope.especialistaDatos.user = user.data;
            $scope.especialistaDatos.user = user.data._id;
            return especialistaService.postEspecialista($scope.especialistaDatos);
        }).then(function(especialista) {
          $location.path("/listado_especialistas");
        }).catch($log.error);

      } else {
        $scope.mensajeErrorIncompleto = true;
      }
    }

    $scope.esconderError = function() {
      $scope.mensajeErrorIncompleto = false;
    }

  })
  .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService) {

    var id = $stateParams.id;

    especialistaService.getEspecialista(id)
    .then(function(especialistaAModificar){
        $scope.especialista = especialistaAModificar.data;
        $scope.especialista.fecha_nacimiento = new Date ($scope.especialista.fecha_nacimiento);
    }).catch($log.error);

    $scope.modificarUsuario = function() {
      especialistaService.putEspecialistaById($scope.especialista._id, $scope.especialista)
      .then(function(resp) {
        console.log('LISTO', resp);
        $location.path("/listado_especialistas");
      }).catch($log.error);
    }
  });
