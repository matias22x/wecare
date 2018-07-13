'use strict';
var wecareApp = angular.module('wecareApp', ['satellizer', 'ui.router', 'ui.materialize',
    'naif.base64', 'angular-storage',
    'pascalprecht.translate',
    'angularMoment',
    'angularFileUpload',
    'Materialize',
    'ngSanitize',
    'angular-web-notification',
    'wecareRouter',
    'especialistaService',
    'diagnosticoPrematuroService',
    'alumnoService',
    'userService',
    'botService',
    'esTranslation',
    'enTranslation',
    'registrosService',
    'turnoService',
    'noticiasService',
    'consejosService'
]);
wecareApp.constant('config', {
    api_url: 'http://159.65.176.157:3000',
    // api_url: 'http://localhost:3000',
    front_url: '/',
    user_validation: new RegExp('^(([A-z0-9]){4,20})$'),
    pass_validation: new RegExp('^(([A-z0-9@]){8,20})$')
});
wecareApp.factory('userData', function(store) {
    return store.getNamespacedStore('userData');
});
wecareApp.config(function(config, $stateProvider, $authProvider, $urlRouterProvider, $translateProvider) {
    $authProvider.loginUrl = config.api_url + '/login';
    $authProvider.signupUrl = config.api_url + '/api/signup';
    $authProvider.tokenName = 'token';

    $stateProvider
        .state('home', {
            url: '/',
            noLoginRequired: true,
            views: {
                'login': {
                    templateUrl: 'templates/login.html',
                    controller: 'loginController'
                }
            }
        })
        .state('logout', {
            url: '/logout',
            views: {
                'login': {
                    templateUrl: 'templates/login.html',
                    controller: 'logoutController'
                }
            }
        });
    $urlRouterProvider.otherwise('/');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('es');
});

wecareApp.run(function($rootScope, userData, $state, $log, $auth, especialistaService, alumnoService) {

  $rootScope.alumnoMenu=false;

  $rootScope.isAuthenticated = function() {
      return $auth.isAuthenticated();
  };

  if ($rootScope.isAuthenticated()) {
    $rootScope.type = userData.get('user').tipo;
    console.log(userData.get('user'));
    if ($rootScope.type === 'especialista') {
        especialistaService.getEspecialistaByUser(userData.get('user')._id)
        .then(function(datosEspecialista) {
          userData.set('datosRol', datosEspecialista.data[0]);
          console.log(userData.get('datosRol'));
        });
    } else if ($rootScope.type === 'alumno') {
        alumnoService.getAlumnoByUser(userData.get('user')._id)
        .then(function(datosAlumno) {
          userData.set('datosRol', datosAlumno.data[0]);
          $rootScope.bot = userData.get('datosRol').chatbot;
          console.log($rootScope.bot);
          if(userData.get('datosRol').chatbot == true){
            $state.go('bot_inicio');
          }else{
            $rootScope.alumnoMenu=true;
          }
          console.log(userData.get('datosRol'));
        });
    }
  }
});
