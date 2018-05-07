'use strict';
angular.module('wecareApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      $scope.login = function() {
          var userType = '';
          $auth.login($scope.login_data).then(function(response) {
            $state.go('listado_especialistas');

              // if (response.data && response.data.user) {
              //   console.log('aca dentro');
              //     userData.set('user', response.data.user);
              //     var token = $auth.getToken();
              //     userType = response.data.user.type;
              //     $state.go('listado_especialistas');
              // }
          })
          .catch(function(err) {
              $log.error('Error: ', err);
          });
      };
    });
