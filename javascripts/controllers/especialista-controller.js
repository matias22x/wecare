'use strict';
angular.module('wecareApp')
.controller('especialistaUserController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {

  $scope.usuario = userData.get('user');
  $scope.especialista = userData.get('datosRol');
  $scope.especialista.fecha_nacimiento = $filter('date')($scope.especialista.fecha_nacimiento, "dd-MM-yyyy");
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
  .controller('especialistaHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaDiagnosticosController', function($auth, $scope, $rootScope,$filter, $window, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
    $scope.informacion = {};
    $scope.diagnosticosPrematuros = [];
    diagnosticoPrematuroService.getAllDiagnosticosPrematuros()
    .then(function(resp) {
      angular.forEach(resp.data, function(value, key) {
        if(value.visto==false){
          $scope.diagnosticosPrematuros.push(value);
        };
      })
      $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "gravedad", true);
    }).catch($log.error);



    $scope.informacionAlumno = function(diagnostico) {
      $scope.informacion.diagnostico = diagnostico;
        alumnoService.getAlumnoByDni(diagnostico.dniAlumno)
        .then(function(alumno) {
          $scope.informacion.diagnostico.alumno = alumno.data[0];
          if ($scope.informacion.diagnostico.gravedad === 0) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Estable'
          } else if ($scope.informacion.diagnostico.gravedad > 0 && $scope.informacion.diagnostico.gravedad < 10) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Observar'
          }  else if ($scope.informacion.diagnostico.gravedad > 10 && $scope.informacion.diagnostico.gravedad < 18) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Preocupante'
          }  else if ($scope.informacion.diagnostico.gravedad > 15) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Urgente'
          }
        }).catch($log.error);
    }
    $scope.agregarAMisPacientes = function(idAlumno, idDiagnostico) {
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
      .then(function(diagnostico){
        diagnostico.data.asignado = true;
        diagnostico.data.visto = true;
        $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
        diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
        .then(function(diagnosticoPrematuro) {
            return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
        })
        .then(function() {
            $state.go('especialista_pacientes');
        }).catch($log.error);
      }).catch($log.error);


    };

    $scope.cambiarDiagnosticoAVisto = function(idDiagnostico) {
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
      .then(function(diagnostico){
        diagnostico.data.visto = true;
        $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
        diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
        .then(function(diagnosticoPrematuro) {
            $window.location.reload();
        }).catch($log.error);
      }).catch($log.error);
    };

  }).controller('especialistaDiagnosticosViejosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
    $scope.informacion = {};
    diagnosticoPrematuroService.getAllDiagnosticosPrematurosVistos()
    .then(function(resp) {
          $scope.diagnosticosPrematuros = resp.data;
      }).catch($log.error);

    $scope.filtrarFecha = function (desde, hasta) {
        diagnosticoPrematuroService.getAllDiagnosticosPrematurosPorFecha(desde, hasta)
        .then(function(resp) {
          $scope.diagnosticosPrematuros = resp.data;
        }).catch($log.error);
    }

    $scope.informacionAlumno = function(diagnostico) {
      $scope.informacion.diagnostico = diagnostico;
        alumnoService.getAlumnoByDni(diagnostico.dniAlumno)
        .then(function(alumno) {
          $scope.informacion.diagnostico.alumno = alumno.data[0];
          if ($scope.informacion.diagnostico.gravedad === 0) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Estable'
          } else if ($scope.informacion.diagnostico.gravedad > 0 && $scope.informacion.diagnostico.gravedad < 10) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Observar'
          }  else if ($scope.informacion.diagnostico.gravedad > 10 && $scope.informacion.diagnostico.gravedad < 18) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Preocupante'
          }  else if ($scope.informacion.diagnostico.gravedad > 15) {
              $scope.informacion.diagnostico.puntuacionDeGravedad = 'Urgente'
          }
        }).catch($log.error);
    }
    $scope.agregarAMisPacientes = function(idAlumno, idDiagnostico) {
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
      .then(function(diagnostico){
        diagnostico.data.asignado = true;
        diagnostico.data.visto = true;
        $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
        diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
        .then(function(diagnosticoPrematuro) {
            return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
        })
        .then(function() {
            $state.go('especialista_pacientes');
        }).catch($log.error);
      }).catch($log.error);


    };



  })
  .controller('especialistaDiagnosticoVerController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaHistorialController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaObservacionesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaPacientesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, alumnoService) {
    alumnoService.getAlumnoByEspecialistaId(userData.get('datosRol')._id)
    .then(function(dataAlumnos) {
      $scope.alumnosEspecialista = dataAlumnos.data;
    }).catch($log.error);

  })
  .controller('especialistaSesionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaTurnoController', function($auth, $scope, $stateParams, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, alumnoService, turnoService) {
      $scope.turno = {};

      if ($stateParams.id !== '') {
          alumnoService.getAlumno($stateParams.id)
          .then(function(dataAlumno) {
            $scope.alumnoElegido = dataAlumno.data;
          }).catch($log.error);
      }

      $scope.crearTurno = function() {
        var data = {
          alumno: $scope.alumnoElegido._id,
          horario: $scope.turno.horario,
          nota_previa: $scope.turno.nota_previa,
          especialista: userData.get('datosRol')._id,
        }

        turnoService.postTurno(data)
        .then(function(resp) {
            $state.go('especialista_pacientes');
        }).catch($log.error);
      }
  });
