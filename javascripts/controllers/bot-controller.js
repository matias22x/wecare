'use strict';
angular.module('wecareApp')
  .controller('botController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    $scope.mensaje = {};
    $scope.enviar = function() {
      botService.postPreguntas($scope.mensaje)
        .then(function(resp) {
          $scope.entities = resp.data.msg.entities;
          var arrayEntities = Object.keys($scope.entities).map(function(key) {
              return $scope.entities[key];
            }
          ).map(function(array) {
            return array[0];
          });
          console.log(arrayEntities);
          $scope.respuesta = arrayEntities[0].value;
        }).catch($log.error);
    }
  });
