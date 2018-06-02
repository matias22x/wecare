'use strict';
angular.module('wecareApp')
  .controller('botController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, botService) {
    $scope.mensaje = {};
    $scope.enviar = function() {
      botService.postPreguntas($scope.mensaje)
      .then(function(resp) {
        console.log(resp);
      }).catch($log.error);
    }
  });
