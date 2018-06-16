'use strict';
angular.module('wecareApp')
  .controller('botController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    $scope.datos = {};
    $scope.datos.pregunta = "¿Con quien vivis?";//INICIALIZO
    $scope.datos.respuesta = "¿Con quien vivis?";//INICIALIZO
    $scope.opciones = [];
    $scope.diagnosticoPrematuro = {
      diagnostico: []
    };

    //falta -> guardar,traer opciones, encadenar, entrenar
    $scope.enviar = function(datos) {
      console.log(datos);
      $scope.opciones = [];

      botService.postPreguntas(datos)
        .then(function(resp) {
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

          } else if(arrayEntities.length === 1 || arrayEntities[0].value.indexOf('*INPUT*') !== -1) {
            $scope.datos.pregunta = arrayEntities[0].value;
            $scope.enviar({'respuesta': $scope.datos.pregunta})

          }//recorrido para inputs
        }).catch($log.error);
    }

    $scope.enviar($scope.datos);
  });
  // $scope.diagnosticoPrematuro.diagnostico.push({
  //   pregunta: $scope.datos.pregunta,
  //   respuesta: datos,
  // })
  // console.log('asi va el diagnostico: ', $scope.diagnosticoPrematuro);
