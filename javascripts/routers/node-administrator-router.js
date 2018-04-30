'use strict';
angular.module('nodeAdministratorRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('node_administrator', {
            url: '/node_administrator',
            cache: false,
            templateUrl: 'templates/node_administrator_list.html',
            controller: 'nodeAdministratorListCtrl'
        });
});
