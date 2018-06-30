'use strict';
angular.module('wecareApp')
.controller('alumnoUserController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {
  console.log('user');
  $scope.usuario = userData.get('user');
  $scope.alumno = userData.get('datosRol');
  $scope.alumno.fecha_nacimiento = $filter('date')($scope.alumno.fecha_nacimiento, "dd-MM-yyyy");
  $scope.contraseniaNueva= "";
  $scope.contraseniaNuevaBis= "";
  $scope.passwordError = false;
  $scope.emailErrorMensaje = "";
  $scope.cambiarClave = function(){
    if($scope.contraseniaNueva==$scope.contraseniaNuevaBis){
      $scope.usuario.password=$scope.contraseniaNuevaBis;
      $scope.usuario.updatedAt = new Date();
      userService.putUserById($scope.usuario._id, $scope.usuario)
        .then(function(resp) {
          console.log('LISTO', resp);
          $scope.passwordCorrecto = true;
          $scope.contraseniaCorrectoMensaje = "Las contraseñas cambio satisfactoriamente";
        }).catch($log.error);
    }else{
      $scope.passwordError = true;
      $scope.contraseniaErrorMensaje = "Las contraseñas no coinciden";
    }

  }
})
  .controller('alumnoHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoHomeController");

  })
  .controller('alumnoActividadesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoHomeController");

  })
  .controller('alumnoEstadosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService) {
    $scope.registro = {
      actividades: {
        deporte: false,
        descanso: false,
        estudio: false,
        fiesta: false,
        juego: false,
        salida: false,
      },
      animo: {
        contento: false,
        enojado: false,
        neutral: false,
        triste: false
      },
      social: {
        amigos: false,
        familia: false,
        pareja: false,
        solo: false
      },
      cuentanosmas: '',
      pacienteId: userData.get('datosRol')._id
    }

    $scope.enviarRegistro = function() {

      registrosService.postRegistros($scope.registro)
      .then(function(resp) {
        $state.go('alumno_informacion');
      }).catch($log.error);

    }

  })
  .controller('alumnoLugaresController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoLugaresController");

  })
  .controller('alumnoContarController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoContarController");

  })
  .controller('alumnoSumarioController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoSumarioController");

  })
  .controller('alumnoFinalizacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoFinalizacionController");

  })
  .controller('alumnoAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoAgendaController");

  })
  .controller('alumnoHistorialController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoHistorialController");

  })
  .controller('alumnoInformacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    console.log("alumnoInformacionController");

  });
