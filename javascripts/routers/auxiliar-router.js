'use strict';
angular.module('auxiliarRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('auxiliar', {
            url: '/auxiliar',
            cache: false,
            templateUrl: 'templates/auxiliar_list.html',
            controller: 'auxiliarListCtrl'
        });
});
