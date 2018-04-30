'use strict';
angular.module('setPasswordRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('setpassword', {
            noLoginRequired: true,
            url: '/set_password/:token',
            cache: false,
            views: {
                'setpassword': {
                    templateUrl: 'templates/set_password.html',
                    controller: 'setPassword'
                }
            }
        })
        .state('select-role', {
            url: '/selec_role/',
            cache: false,
            views: {
                'selectRol': {
                    templateUrl: 'templates/roles/select-role.html',
                    controller: 'selectRoleController'
                }
            }
        });
});
