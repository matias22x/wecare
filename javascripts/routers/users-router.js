'use strict';
angular.module('usersRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/users',
            cache: false,
            templateUrl: 'templates/users_list.html',
            controller: 'userListController',
            restricted: true
        })
        .state('users-create', {
            url: '/users/create',
            templateUrl: 'templates/users_create.html',
            controller: 'createUserController'
        })
        .state('user_type_add', {
            cache: false,
            url: '/users/create/:type?',
            templateUrl: 'templates/users_create.html',
            controller: 'createUserController'
        })
        .state('users-edit', {
            url: '/users/edit/:id',
            cache: false,
            templateUrl: 'templates/users_edit.html',
            controller: 'userEditController'
        })
        .state('users-view', {
            url: '/users/view/:id',
            cache: false,
            templateUrl: 'templates/users_view.html',
            controller: 'userEditController'
        })
        ;
});
