'use strict';
angular.module('LoggedHomeRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('loggedhome', {
            url: '/home',
            cache: false,
            templateUrl: 'templates/home.html',
            controller: 'loggedHomeController'
        }).state('loggedhomeadministrator', {
            url: '/home_a',
            cache: false,
            templateUrl: 'templates/home_administrator.html',
            controller: 'loggedHomeAdministratorController'
        }).state('loggedhomecallcenter', {
            url: '/home_c',
            cache: false,
            templateUrl: 'templates/home_callcenter.html',
            controller: 'callcenterController'
        });
});
