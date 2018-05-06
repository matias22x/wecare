'use strict';
angular.module('wecareApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      $scope.login = function() {
          var userType = '';
          $auth.login($scope.login_data).then(function(response) {
            console.log('la response', response);
              if (response.data && response.data.user) {
                  userData.set('user', response.data.user);
                  var token = $auth.getToken();
                  userType = response.data.user.type;
              }
          })
          .catch(function(err) {
              $log.error('Error: ', err);
          });
      };
    });
