'use strict';
angular.module('coordinatorRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('coordinator', {
            url: '/coordinator',
            cache: false,
            templateUrl: 'templates/coordinator_list.html',
            controller: 'coordinatorListCtrl'
        });
});
