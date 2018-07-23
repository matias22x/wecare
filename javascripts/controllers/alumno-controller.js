'use strict';
angular.module('wecareApp')
.controller('alumnoUserController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {
  if(userData.get('datosRol').chatbot){
    $state.go('bot_inicio');
  }else{
    if(!userData.get('datosRol').especialistaAsociado){
        $state.go('bot_final');
    }else{
      $rootScope.alumnoMenu=true;
    }
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
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoHomeController");

  })
  .controller('alumnoActividadesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoHomeController");

  })
  .controller('alumnoEstadosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService, $document) {
    var modalMjs = $document.find('#demoModal').modal();
    var errorMjs = $document.find('#errorModal').modal();


    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
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

    function checkRegistro() {
      if (!$scope.registro.animo.contento && !$scope.registro.animo.enojado && !$scope.registro.animo.neutral && !$scope.registro.animo.triste) {
        return false;
      }
      return true;
    }

    $scope.enviarRegistro = function() {
      var checkeandoRegistro = checkRegistro();
      if (!checkeandoRegistro) {
        errorMjs.modal('open');
        return;
      }

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
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoLugaresController");

  })
  .controller('alumnoContarController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoContarController");

  })
  .controller('alumnoSumarioController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoSumarioController");

  })
  .controller('alumnoFinalizacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }
    console.log("alumnoFinalizacionController");

  })
  .controller('alumnoAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }

  })
  .controller('alumnoHistorialController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, registrosService, turnoService, moment) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }

    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 5;
      }
      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      if(lista && lista.length>0){
        $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);
      }else{
        $scope.paginas = 1;
      }
      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }
      $scope.page = [];
      if(lista){
        for (var i = 0; i < $scope.cantRegistros; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];
      if(lista){
        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
    }
    $scope.antPag = function(lista) {
      if ($scope.pagActual - 1 > 0) {
        $scope.pagActual = $scope.pagActual - 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
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
      $scope.paginInit($scope.registros);
    }).catch($log.error);

    $scope.filtrarFecha = function(desde, hasta) {
      $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      registrosService.getRegistrosPorPacientePorFecha($scope.desde, $scope.hasta, userData.get('datosRol')._id)
        .then(function(resp) {
          $scope.registros = resp.data;
          $scope.paginInit($scope.registros)
        }).catch($log.error);
    }

    $scope.verRegistro = function(registro) {
      $scope.registroSeleccionado = registro;
    }

  })
  .controller('alumnoInformacionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService, noticiasService) {
    if(userData.get('datosRol').chatbot){
      $state.go('bot_inicio');
    }else{
      if(!userData.get('datosRol').especialistaAsociado){
          $state.go('bot_final');
      }else{
        $rootScope.alumnoMenu=true;
      }
    }

    noticiasService.getAllNoticias()
    .then(function(resp) {
      $scope.noticias = resp.data;
    }).catch($log.error);

  });
