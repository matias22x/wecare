'use strict';
angular.module('notificationRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('notification', {
            url: '/notifications/list',
            cache: false,
            templateUrl: 'templates/views/notification/list.html',
            controller: 'notificationListController'
        })
        .state('notification_view', {
            url: '/notifications/view/:id?',
            cache: false,
            templateUrl: 'templates/views/notification/view.html',
            controller: 'notificationViewController'
        })
        ;
});
