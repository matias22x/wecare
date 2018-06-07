'use strict';
angular.module('wecareApp')
  .controller('botController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    $scope.datos = {};
    $scope.datos.pregunta = 'Escribi "hola" para empezar a hablar';
    $scope.diagnosticoPrematuro = {
      diagnostico: []
    };
    //falta -> guardar,traer opciones, encadenar, entrenar
    $scope.enviar = function() {
      //mandamos nuestra respuesta, y nos devuelve las entities, o respuesta del bot
      botService.postPreguntas($scope.datos)
        .then(function(resp) {
          $scope.entities = resp.data.data.entities;
          var arrayEntities = Object.keys($scope.entities).map(function(key) {
              return $scope.entities[key];
            }
          ).map(function(array) {
            return array[0];
          });
          console.log(arrayEntities);
          if (arrayEntities.length > 0) {
            //si hay mas de 1 respuesta, va a elegir una aleatoria
            var randomResponse = Math.floor((Math.random() * arrayEntities.length));
            //y lo envia al front para que lo vea el usuario
            $scope.datos.pregunta = arrayEntities[randomResponse].value;

            //realizamos el push en el json de diagnosticoPrematuro
            $scope.diagnosticoPrematuro.diagnostico.push({
              pregunta: $scope.datos.pregunta,
              respuesta: $scope.datos.respuesta,
            })
            console.log('asi va el diagnostico: ', $scope.diagnosticoPrematuro);
          } else {
            $scope.datos.pregunta = 'No entendi la respuesta, me la repetis porfavor? ';
          }
        }).catch($log.error);
    }
  });
