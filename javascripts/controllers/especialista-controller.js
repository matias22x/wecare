'use strict';
angular.module('wecareApp')
  .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService) {

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
        $scope.especialistaDatos.fecha_nacimiento = moment(esp.fecha_nacimiento).format('DD/ MM/ YYYY');

        userService.postUser($scope.usuario)
        .then(function(user) {
            $scope.especialistaDatos.user = user.data;
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
  .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config) {
    console.log('editar');
    $scope.id = $stateParams.ID;

    $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));

    $scope.especialistas[$scope.id].fecha_nacimiento = new Date($scope.especialistas[$scope.id].fecha_nacimiento);

    $scope.especialistaElegido = $scope.especialistas[$scope.id];

    $scope.modificarUsuario = function() {
      var esp = $scope.especialistaElegido;
      if (esp.dni && esp.nombre && esp.direccion && esp.fecha_nacimiento && esp.password) {
        $scope.especialistas[$scope.id].dni = esp.dni;
        $scope.especialistas[$scope.id].nombre = esp.nombre;
        $scope.especialistas[$scope.id].direccion = esp.direccion;
        $scope.especialistas[$scope.id].fecha_nacimiento = esp.fecha_nacimiento;
        $scope.especialistas[$scope.id].password = esp.password;

        sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));

        $location.path("/listado_especialistas");
      } else {
        $scope.mensajeErrorIncompleto = true;
      }
    }

    $scope.esconderError = function() {
      $scope.mensajeErrorIncompleto = false;
    }

  })
  .controller('eliminarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config) {
    console.log('eliminar');
    $scope.id = $stateParams.ID;
    console.log($scope.id);

    $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));

    //$scope.especialistas[$scope.id].fecha_nacimiento = new Date($scope.especialistas[$scope.id].fecha_nacimiento);

    $scope.especialistaElegido = $scope.especialistas[$scope.id];
    console.log($scope.especialistaElegido);

    $scope.eliminarUsuario = function() {
      var esp = $scope.especialistaElegido;
      var indexUsuario = esp.indexUsuario;
      var indexEspecialistaDatos = esp.indexEspecialistaDatos;


      $scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
      $scope.especialistasDatos = JSON.parse(sessionStorage.getItem('especialistasDatos'));
      $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));

      $scope.especialistas.splice($scope.id, 1);
      sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));

      $scope.especialistasDatos.splice(indexEspecialistaDatos, 1);
      sessionStorage.setItem('especialistasDatos', JSON.stringify($scope.especialistasDatos));

      $scope.usuarios.splice(indexUsuario, 1);
      sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

      $location.path("/listado_especialistas");


    }

    $scope.volver = function() {

      $location.path("/listado_especialistas");

    }



  });
