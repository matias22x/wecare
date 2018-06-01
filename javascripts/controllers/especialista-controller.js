'use strict';
angular.module('wecareApp')
  .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
        $scope.page = [];
        $scope.cantRegistros = 2;
        $scope.pagActual = 1;
        var cantRegis = $scope.cantRegistros;
        especialistaService.getAllEspecialistas()
        .then(function(especialistas) {
            $scope.listadoEspecialistas = especialistas.data;
            console.log($scope.listadoEspecialistas);
            $scope.paginas = Math.ceil($scope.listadoEspecialistas.length/$scope.cantRegistros);
            console.log('cantidad de paginas: '+$scope.paginas);
            $scope.getNumber = function(num) {
                return new Array($scope.paginas);
            }

            for (var i=0; i<cantRegis; i++) {
              $scope.page.push($scope.listadoEspecialistas[i]);
            }


        }).catch($log.error);

        $scope.cambiarPag = function (pag) {
          $scope.pagActual = pag+1;
          pag = pag+1;
          var hasta = pag*cantRegis;
          var desde = hasta - cantRegis;
          $scope.page = [];

          for (var i=desde; i<hasta; i++) {
            if($scope.listadoEspecialistas[i]!=null){
              $scope.page.push($scope.listadoEspecialistas[i]);
            }

          }
        }

        $scope.sigPag = function () {
          if($scope.pagActual+1<=$scope.paginas){
            $scope.pagActual = $scope.pagActual+1;
            var hasta = $scope.pagActual*cantRegis;
            var desde = hasta - cantRegis;
            $scope.page = [];

            for (var i=desde; i<hasta; i++) {
              if($scope.listadoEspecialistas[i]!=null){
                $scope.page.push($scope.listadoEspecialistas[i]);
              }

            }
          }

        }

        $scope.antPag = function () {
          if($scope.pagActual-1>0){
            $scope.pagActual = $scope.pagActual-1;
            var hasta = $scope.pagActual*cantRegis;
            var desde = hasta - cantRegis;
            $scope.page = [];

            for (var i=desde; i<hasta; i++) {
              if($scope.listadoEspecialistas[i]!=null){
                $scope.page.push($scope.listadoEspecialistas[i]);
              }

            }
          }

        }



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
  })
  .controller('verEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService) {
    var id = $stateParams.id;

    especialistaService.getEspecialista(id)
    .then(function(especialista){
        $scope.especialista = especialista.data;
        $scope.especialista.fecha_nacimiento = new Date ($scope.especialista.fecha_nacimiento);

        userService.getUser($scope.especialista.user)
        .then(function(user){
            $scope.user = user.data;
            $scope.user.createdAt = new Date ($scope.user.createdAt);
            $scope.user.updatedAt = new Date ($scope.user.updatedAt);
        }).catch($log.error);
    }).catch($log.error);

  })
  .controller('borrarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService) {

    var id = $stateParams.id;

    especialistaService.getEspecialista(id)
    .then(function(especialistaABorrar){
        $scope.especialista = especialistaABorrar.data;
        $scope.especialista.fecha_nacimiento = new Date ($scope.especialista.fecha_nacimiento);
    }).catch($log.error);

    $scope.borrarEspecialista = function() {
        var id = $scope.especialista._id;
        var userId = $scope.especialista.user;
        especialistaService.deleteEspecialistaById(id)
        .then(function() {
            console.log('userId', userId);
            return userService.deleteUserById(userId);
        })
        .then(function(userEliminado) {
            console.log(userEliminado.data);
            console.log('LISTO', userEliminado);
            $location.path("/listado_especialistas");
        })
        .catch($log.error);

    };
  });
