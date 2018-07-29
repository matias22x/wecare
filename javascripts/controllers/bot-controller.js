'use strict';
angular.module('wecareApp')
  .controller('botInicioController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    responsiveVoice.speak('Bienvenido a WeCare, para comenzar te voy a hacer una serie de preguntas para que puedas ser asignado a un especialista', "Spanish Latin American Male");
  })
  .controller('botFinalController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService, alumnoService) {
    responsiveVoice.speak('Gracias por tomarte tu tiempo para contestarme las preguntas! un especialista va a ver tus respuestas y te ayudará con tus problemas.', "Spanish Latin American Male");
    if ($rootScope.byeBot) {
      $rootScope.byeBot = false;
      $state.reload();
    }
  })
  .controller('botController', function($location, $timeout, $auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService, alumnoService, diagnosticoPrematuroService) {
    $scope.datos = {};
    $scope.datos.pregunta = "¿Con quien vivis?"; //INICIALIZO
    $scope.datos.respuesta = "¿Con quien vivis?"; //INICIALIZO
    $scope.enableInput = false;
    $scope.opciones = [];
    var ultimaPregunta = '';
    $scope.diagnosticoPrematuro = {
      diagnostico: [],
      gravedad: 0,
      asignado: false
    };
    $scope.diagnosticoPrematuro.gravedad = 0;
    alumnoService.getAlumnoByUserId(userData.get('user')._id)
      .then(function(resp) {
        $scope.alumno = resp.data[0];
        $scope.diagnosticoPrematuro.dniAlumno = resp.data[0].dni;
        $scope.diagnosticoPrematuro.nombreAlumno = resp.data[0].nombre;
      });


    function guardarEnDiagnostico(datos) {
      if (datos.respuestaSinGravedad) {
        datos.respuesta = datos.respuestaSinGravedad;
      }
      if (datos.input) {
        datos.respuesta = datos.input;
        datos.pregunta = datos.pregunta.slice(7);
      }
      $scope.diagnosticoPrematuro.diagnostico.push({
        pregunta: datos.pregunta,
        respuesta: datos.respuesta
      });
    }

    function botParlante(pregunta) {
      if (pregunta !== ultimaPregunta && pregunta.indexOf('*INPUT*') === -1) {
        responsiveVoice.speak(pregunta, "Spanish Latin American Male");
      }
      ultimaPregunta = pregunta;
    }
    $scope.enviar = function(datos) {
      $scope.enableInput = false;
      $scope.datos.input = '';
      $scope.opciones = [];

      botService.postPreguntas(datos)
        .then(function(resp) {
          botParlante($scope.datos.pregunta);
          $scope.datos.preguntaParseada = '';
          $scope.entities = resp.data.data.entities;
          var arrayEntities = Object.keys($scope.entities).map(function(key) {
            return $scope.entities[key];
          }).map(function(array) {
            return array[0];
          });
          if (arrayEntities.length > 1) {
            Object.keys(arrayEntities).forEach(function(key) {
              var opcionSinGravedad;
              if (arrayEntities[key].value.indexOf('*gravedad:') !== -1) {
                var comienzoGravedad = arrayEntities[key].value.indexOf('*gravedad:');
                var gravedad = 0;
                gravedad = arrayEntities[key].value.substring(comienzoGravedad + 10, comienzoGravedad + 11);
                opcionSinGravedad = arrayEntities[key].value.slice(0, -12);
              }
              $scope.opciones.push({
                opcion: arrayEntities[key].value,
                opcionSinGravedad: opcionSinGravedad,
                gravedad: gravedad
              });
            });

          } else if (arrayEntities.length === 1 && arrayEntities[0].value.indexOf('*INPUT*') === -1) {
            guardarEnDiagnostico(datos);
            if (arrayEntities[0].value.indexOf('*FINALIZACION DEL RECORRIDO*') !== -1) {
              diagnosticoPrematuroService.postDiagnosticoPrematuro($scope.diagnosticoPrematuro)
                .then(function(resp) {
                  $scope.alumno.chatbot = false;
                  alumnoService.putAlumnoById($scope.alumno._id, $scope.alumno)
                    .then(function(resp) {
                      userData.set('datosRol', $scope.alumno);
                      $rootScope.byeBot = true;
                      $location.path("/bot_final");
                    }).catch($log.error);

                }).catch($log.error);
              return;
            }
            $scope.datos.pregunta = arrayEntities[0].value;
            $scope.enviar({
              'respuesta': $scope.datos.pregunta
            });
          } else if (arrayEntities[0].value.indexOf('*INPUT*') !== -1) {
            $scope.enableInput = true;
            $scope.datos.pregunta = arrayEntities[0].value;
            $scope.datos.preguntaParseada = arrayEntities[0].value.slice(7);
            botParlante($scope.datos.preguntaParseada);
            guardarEnDiagnostico(datos);
          }
        }).catch($log.error);
    }

    $scope.aumentarGravedad = function(gravedad) {
      $scope.diagnosticoPrematuro.gravedad = $scope.diagnosticoPrematuro.gravedad + parseInt(gravedad);
    }

    $scope.enviar($scope.datos);
  });
