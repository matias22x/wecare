'use strict';
angular.module('wecareApp')
  .controller('especialistaHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaHomeController");

  })
  .controller('especialistaAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaAgendaController");

  })
  .controller('especialistaDiagnosticosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
    $scope.informacion = {};
    diagnosticoPrematuroService.getAllDiagnosticosPrematuros()
    .then(function(resp) {
      $scope.diagnosticosPrematuros = resp.data;
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

  })
  .controller('especialistaDiagnosticoVerController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaDiagnosticoVerController");

  })
  .controller('especialistaHistorialController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaHistorialController");

  })
  .controller('especialistaObservacionesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaObservacionesController");

  })
  .controller('especialistaPacientesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaPacientesController");

  })
  .controller('especialistaSesionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaSesionesController");

  })
  .controller('especialistaTurnoController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {
    console.log("especialistaTurnoController");

  });
