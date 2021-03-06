'use strict';
angular.module('wecareApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, config, userService, especialistaService, alumnoService) {
      $rootScope.nombre = "";
      $rootScope.stateIn = "";
      $scope.display=false;
      $scope.login = function() {
        $rootScope.alumnoMenu=false;
          var userType = '';
          var aux_data = {};
          aux_data.password = $scope.login_data.password;
          aux_data.username =$filter('lowercase')($scope.login_data.username);
          $auth.login(aux_data).then(function(response) {
            userService.getUserByUserName(response.config.data.username)
            .then(function(resp) {
              userData.set('user', resp.data[0]);//en userData guardo los datos de usuario, si queres guardar algo hacelo de esta manera!
              if(resp.data[0].tipo=='admin'){
                $rootScope.type = userData.get('user').tipo;
                $rootScope.nombre = userData.get('user').username;
                $state.go('admin_home');
              }
              if(resp.data[0].tipo=='alumno') {
                $rootScope.type = userData.get('user').tipo;
                alumnoService.getAlumnoByUser(userData.get('user')._id)
                .then(function(datosAlumno) {
                  userData.set('datosRol', datosAlumno.data[0]);
                  $rootScope.bot = userData.get('datosRol').chatbot;
                  $rootScope.nombre = userData.get('datosRol').nombre;
                  if (userData.get('datosRol').chatbot == true){
                    $state.go('bot_inicio');
                  }else{
                    if(!userData.get('datosRol').especialistaAsociado){
                        $state.go('bot_final');
                    }else{
                      $rootScope.alumnoMenu=true;
                      $state.go('alumno_home');
                    }

                  }
                });

              }
              if(resp.data[0].tipo=='especialista'){
                $rootScope.type = userData.get('user').tipo;
                especialistaService.getEspecialistaByUser(userData.get('user')._id)
                .then(function(datosEspecialista) {
                  userData.set('datosRol', datosEspecialista.data[0]);
                  $rootScope.nombre = userData.get('datosRol').nombre;
                });
                $state.go('especialista_home');
              }
            });
          })
          .catch(function(err) {
              $log.error('Error: ', err);
              $scope.display=true;
          });
      };

    }).controller('logoutController', function($auth, $state, userData, $rootScope) {
      $auth.logout();
      userData.remove('user');
      userData.remove('datosRol');
      $rootScope.nombre = "";
      $rootScope.stateIn = "";
      $state.go('home');
  });
