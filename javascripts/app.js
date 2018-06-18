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
    'alumnoService',
    'userService',
    'botService',
    'esTranslation',
    'enTranslation',
    'actividadesService'
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

wecareApp.run(function($rootScope, userData, $state, $log, $auth) {


  $rootScope.isAuthenticated = function() {
      return $auth.isAuthenticated();
  };

  if ($rootScope.isAuthenticated()) {
    $rootScope.type = userData.get('user').tipo;
  }
});

/*
var app = angular.module('materializeApp', ['ui.materialize'])
    .controller('BodyController', ["$scope", function ($scope) {
        $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };
    }]);
*/
