'use strict';
angular.module('wecareApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, userService) {

      $scope.login = function() {
          var userType = '';
          $auth.login($scope.login_data).then(function(response) {
            userService.getUserByUserName(response.config.data.username)
            .then(function(resp) {
              userData.set('user', resp.data[0]);//en userData guardo los datos de usuario, si queres guardar algo hacelo de esta manera!
              if(resp.data[0].tipo=='admin'){
                $state.go('listado_especialistas');
              }
              if(resp.data[0].tipo=='alumno'){
                $state.go('alumno_home');
              }
              if(resp.data[0].tipo=='especialista'){
                $state.go('especialista_home');
              }
            });
          })
          .catch(function(err) {
              $log.error('Error: ', err);
          });
      };
    }).controller('logoutController', function($auth, $state, userData, $rootScope) {
      $auth.logout();
      userData.remove('user');
      $state.go('home');
  });
