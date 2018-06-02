'use strict';
angular.module('wecareApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, userService) {

      $scope.login = function() {
          var userType = '';
          $auth.login($scope.login_data).then(function(response) {
            userService.getUserByUserName(response.config.data.username)
            .then(function(resp) {
              $rootScope.userData = resp.data[0];
              console.log($rootScope.userData);
              $state.go('listado_especialistas');
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
