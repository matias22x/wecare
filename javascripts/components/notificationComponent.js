'use strict';
angular.module('adistalApp')
  .component('notification', {
      templateUrl: '/templates/ui-components/notifications.html',
      controller: function($scope, socket, $state, notificationService, $rootScope, appointmentService, $log, userData, $translate, moment, webNotification) {
          var self = this;
          $rootScope.notificationId = '';

          var notificationsInError;
          notificationService.getUserNotifications({readed: false}).then(function(userNotifications) {
              self.unreadNotifications = {quantity: userNotifications.data.length};
              $rootScope.unreadNotifications = self.unreadNotifications;
              notificationsInError = userNotifications.data.length;
          }).catch(function() {
              self.unreadNotifications = {quantity: notificationsInError};
              $rootScope.unreadNotifications = self.unreadNotifications;
          });

          function refreshNotificationList(data) {
              if ($rootScope.notificationListView) {
                  var notification = data;
                  var createdAt = new Date(notification.createdAt);
                  notification.created_at = moment(createdAt).format('DD/MM/YYYY hh:mm');
                  if (notification.readed) {
                      notification.readed = 'Leida';
                  } else {
                      notification.readed = 'No Leida';
                      notification.active = true;
                  }
                  if ($rootScope.notificationListView.indexOf(notification) === -1) {
                      $rootScope.notificationListView.unshift(notification);
                  }
              }
          }

          var serviceWorkerRegistration;
          navigator.serviceWorker.register('worker.js').then(function(registration) {
              serviceWorkerRegistration = registration;
          }).catch($log.error);
          if(!socket.hasListeners('newNotificacion')) {
              socket.on('newNotificacion', function(data) {
                  $scope.$apply(function() {
                      self.unreadNotifications.quantity++;
                      $rootScope.unreadNotifications = self.unreadNotifications;
                      if ($rootScope.notificationId === '' || $rootScope.notificationId !== data._id) {

                          $rootScope.notificationId = data._id;
                          refreshNotificationList(data);
                          $rootScope.checkRoom();

                          webNotification.showNotification($translate.instant('ADISTAL_NOTIFICATION'), {
                              serviceWorkerRegistration: serviceWorkerRegistration,
                              body: data.title,
                              icon: '/img/exo-verde.png'
                          }, function onShow(error) {
                              if (error) {
                                  $log.error('Unable to show notification: ' + error.message);
                              }
                          });

                          $rootScope.showDialog($translate.instant('YOU_HAVE_A_NEW_NOTIFICATION'));
                          var audio = new Audio('/sound/arpeggio.mp3');
                          audio.play();
                      }
                  });
              });
          }
          if(!socket.hasListeners('takeCallSend')) {
              socket.on('takeCallSend', function(data) {
                  $scope.$apply(function() {
                      $rootScope.waitingVideoCall = false;
                      $rootScope.enableAcceptCall = true;
                      $rootScope.videoCallWindows = false;
                      $rootScope.dataUrlClient = data;
                  });
              });
          }

      }
  })
  .component('notificationCallcenter', {
      bindings: {
          'cantNotificationsUnreaded':      '='
      },
      templateUrl: '/templates/ui-components/notification-callcenter.html',
      controller: function($scope, socket, $state, notificationService, $rootScope, $log, config) {
          var self = this;
          self.front_url = config.front_url;
          self.ListNotificationUpdate = [];
          function getNotifications() {
              notificationService.getUserNotifications({readed: false}).then(function(userNotifications) {
                  self.ListNotificationUpdate = userNotifications.data;
                  self.cantNotificationsUnreaded = userNotifications.data.length;
              }).catch($log.error);
          }

          getNotifications();
          socket.on('newNotificacion', function() {
              $scope.$apply(function() {
                  getNotifications();
              });
          });
      }
  });
