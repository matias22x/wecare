'use strict';
angular.module('wecareApp')
  .controller('botController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    $scope.datos = {};
    $scope.datos.pregunta = "¿Con quien vivis?";//INICIALIZO
    $scope.datos.respuesta = "¿Con quien vivis?";//INICIALIZO
    $scope.enableInput = false;
    $scope.opciones = [];
    $scope.diagnosticoPrematuro = {
      diagnostico: []
    };

    function guardarEnDiagnostico(datos) {
      if (datos.input) {
        datos.respuesta = datos.input;
        datos.pregunta = datos.pregunta.slice(7);
      }
      $scope.diagnosticoPrematuro.diagnostico.push({
        pregunta: datos.pregunta,
        respuesta: datos.respuesta
      });
    }
    //falta: entrenar y finalizar recorrido.
    $scope.enviar = function(datos) {
      $scope.enableInput = false;
      $scope.opciones = [];
      botService.postPreguntas(datos)
        .then(function(resp) {
          $scope.datos.preguntaParseada = '';
          $scope.entities = resp.data.data.entities;
          var arrayEntities = Object.keys($scope.entities).map(function(key) {
              return $scope.entities[key];
            }
          ).map(function(array) {
            return array[0];
          });
          if (arrayEntities.length > 1) {
            Object.keys(arrayEntities).forEach(function(key) {
              $scope.opciones.push(arrayEntities[key].value);
            });

          } else if(arrayEntities.length === 1 && arrayEntities[0].value.indexOf('*INPUT*') === -1) {
            $scope.datos.pregunta = arrayEntities[0].value;
            guardarEnDiagnostico(datos);
            $scope.enviar({'respuesta': $scope.datos.pregunta})

          } else if(arrayEntities[0].value.indexOf('*INPUT*') !== -1) {
            $scope.enableInput = true;
            $scope.datos.pregunta = arrayEntities[0].value;
            $scope.datos.preguntaParseada = arrayEntities[0].value.slice(7);
            guardarEnDiagnostico(datos);
          } else if(arrayEntities[0].value.indexOf('Finalizacion del recorrido') !== -1) {
            //ACA DEBERIA TERMINAR EL CHATBOT.
          }
        }).catch($log.error);
    }

    $scope.enviar($scope.datos);
  });
