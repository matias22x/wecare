'use strict';
angular.module('printRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('print', {
            url: '/print',
            cache: false,
            templateUrl: 'templates/views/print.html'
                //controller: 'planListCtrl'
        });
});
