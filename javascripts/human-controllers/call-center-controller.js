'use strict';
angular.module('adistalApp')
    .controller('callcenterController', function($scope, notificationService, $log, socket, $translate, $rootScope) {
        $rootScope.title = $translate.instant('HOME');
        if (!$scope.cantNotificationsUnreaded) {
            $scope.thereAreUnreadNotifications = false;
        }
        socket.on('newNotificacion', function() {
            $scope.thereAreUnreadNotifications = true;
        });
    });
