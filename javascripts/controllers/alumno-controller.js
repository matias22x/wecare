'use strict';
angular.module('wecareApp')
.controller('alumnoUserController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {
  if(userData.get('datosRol').chatbot){
    $state.go('bot_inicio');
  }else{
    $rootScope.alumnoMenu=true;
  }
  console.log('user');
  $scope.usuario = userData.get('user');
  console.log($scope.usuario);
  $scope.alumno = userData.get('datosRol');
  console.log($scope.alumno);
  $scope.alumno.fecha_nacimiento = $filter('date')($scope.alumno.fecha_nacimiento, "dd-MM-yyyy");
  $scope.contraseniaNueva= "";
  $scope.contraseniaNuevaBis= "";
  $scope.passwordError = false;
  $scope.emailErrorMensaje = "";
  $scope.cambiarClave = function(){
    if($scope.contraseniaNueva==$scope.contraseniaNuevaBis && $scope.contraseniaNueva && $scope.contraseniaNueva.length>8){
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
       if (!$scope.contraseniaNueva){
        $scope.contraseniaErrorMensaje = "la contraseña no puede estar vacia y debe ser mayor a 8 caracteres";
      }else if($scope.contraseniaNueva.length<8){
        $scope.contraseniaErrorMensaje = "La contraseña es demasiado corta, debe ser mayor a 8 caracteres";
      }else{
        $scope.contraseniaErrorMensaje = "Las contraseñas no coinciden";
      }
    }

  }
})
  .controller('alumnoHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    console.log("alumnoHomeController");

  })
  .controller('alumnoActividadesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }
    console.log("alumnoHomeController");

  })
  .controller('alumnoEstadosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService, $document) {
    var modalMjs = $document.find('#demoModal').modal();

    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    $scope.fechaDeHoy = new Date();
    $scope.registro = {
      actividades: {
        deporte: false,
        descanso: false,
        estudio: false,
        fiesta: false,
        juego: false,
        salida: false,
        nada: false,
      },
      lugares: {
        escuela: false,
        casa: false,
        plaza: false,
        casa_amigo: false,
        gimnasio: false,
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
        modalMjs.modal('open');
      }).catch($log.error);

    }

  })
  .controller('alumnoLugaresController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    console.log("alumnoLugaresController");

  })
  .controller('alumnoContarController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    console.log("alumnoContarController");

  })
  .controller('alumnoSumarioController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    console.log("alumnoSumarioController");

  })
  .controller('alumnoFinalizacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }
    console.log("alumnoFinalizacionController");

  })
  .controller('alumnoAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }

  })
  .controller('alumnoHistorialController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService, turnoService, moment) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }

    var dataMoment = moment(new Date, 'DD/MM/YYYY');
    var date = dataMoment.format();

    turnoService.getProximosTurnosByPaciente(userData.get('datosRol')._id, date, 1)
    .then(function(resp) {
      $scope.turnos = resp.data[0];
    }).catch($log.error);

    registrosService.getRegistrosPorPaciente(userData.get('datosRol')._id)
    .then(function(resp) {
      $scope.registros = resp.data;
    }).catch($log.error);

    $scope.verRegistro = function(registro) {
      $scope.registroSeleccionado = registro;
    }

  })
  .controller('alumnoInformacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, noticiasService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      $rootScope.alumnoMenu=true;
    }

    noticiasService.getAllNoticias()
    .then(function(resp) {
      $scope.noticias = resp.data;
    }).catch($log.error);

  });
