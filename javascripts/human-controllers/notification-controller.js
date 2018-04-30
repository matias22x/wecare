'use strict';

angular.module('adistalApp')
    .controller('notificationListController', function($scope, notificationService, moment, $log, $rootScope, $translate, practitionerService, userData, diagnosticReportService, procedureRequestService) {
        $rootScope.title            = $translate.instant('NOTIFICATIONS');
        $rootScope.description      = $translate.instant('NOTIFICATIONS_LIST');
        $scope.properties           = ['title', 'created_at', 'importance', 'status'];
        $rootScope.notificationListView = [];

        notificationService.getUserNotifications().then(function(resp) {
            $rootScope.notificationListView = resp.data.map(function(notif) {
                if (notif.objectType === 'diagnosticReport') {
                    diagnosticReportService.getDiagnosticReport(notif.objectReference).then(function(diagnosticReport) {
                        return procedureRequestService.getProcedureRequest(diagnosticReport.data.basedOn[0].reference);
                    }).then(function(procedureRequest) {
                        notif.status = $translate.instant(procedureRequest.data.status);
                    });
                } else if(notif.objectType === 'procedureRequest') {
                    procedureRequestService.getProcedureRequest(notif.objectReference).then(function(procedureRequest) {
                        if (procedureRequest.data.category[0].text === 'SPONTANEOUS_SYNCHRONOUS_CONSULTATION' && (procedureRequest.data.status === 'requested' || procedureRequest.data.status === 'commented')) {
                            notif.callLink = true;
                        }
                        notif.status = $translate.instant(procedureRequest.data.status);
                    });
                }
                var createdAt = new Date(notif.createdAt);
                notif.created_at = moment(createdAt).format('DD/MM/YYYY hh:mm');
                if (notif.readed) {
                    notif.readed = 'Leida';
                } else {
                    notif.readed = 'No Leida';
                    notif.active = true;
                }
                return notif;
            });
        }).catch($log.error);

        if ($rootScope.isPractitionerCallcenter()) {
            $scope.enableTransfer = true;
            practitionerService.getOrganization(userData.get('user').role.practitioner).then(function(respOrganization) {
                return practitionerService.getPractitionersByOrganization(respOrganization.data[0].organization.reference);
            }).then(function(respPractitioners) {
                $scope.practitionerList = [];
                var pos = 0;
                Object.keys(respPractitioners.data).forEach(function(key) {
                    if (respPractitioners.data[key].practitioner.display !== 'practitioner') {
                        $scope.practitionerList[pos] = {
                            id:        respPractitioners.data[key].practitioner._id,
                            display:   respPractitioners.data[key].practitioner.display,
                            specialty: respPractitioners.data[key].specialty[0].text,
                            state:     'available'
                        };
                        pos++;
                    }
                });
            }).catch($log.error);
        }

        $scope.changeNotificationStatus = function(notificationId) {
            notificationService.getNotificationById(notificationId)
          .then(function(notification) {
              $scope.notification = notification.data;
              if (!$scope.notification.readed) {
                  $scope.notification.readed = true;
                  return notificationService.putNotificationReaded(notificationId, $scope.notification);
              }
              return false;
          })
          .then(function(notificationReaded) {
              if (notificationReaded) {
                  $rootScope.unreadNotifications.quantity--;
              }
          });
        };
    })
    .controller('notificationViewController', function($scope, notificationService, $log, $stateParams, $rootScope, $translate, callerService, userData, $window, practitionerService, $auth, appointmentService, procedureRequestService, diagnosticReportService, $state) {
        $rootScope.title       = $translate.instant('NOTIFICATIONS');
        $rootScope.description = $translate.instant('NOTIFICATION_VIEW');
        var id = $stateParams.id;
        $scope._id = id;
        var procedureId = '';
        $scope.reason = '';
        $scope.cancelledCall = '';
        $scope.notification = {};

        function getData(notification) {
            if (notification.objectReference) {
                if(notification.redirectTo.indexOf('request') !== -1) {
                    procedureRequestService.getProcedureRequest(notification.objectReference).then(function(resp) {
                        $scope.object = resp.data;
                        $scope.textIndex = 'system';
                        $scope.text = 'SEE_REQUEST';
                        if ($scope.object.status !== 'requested' && $scope.object.status !== 'commented') {
                            $scope.transferred = true;
                        }
                    });
                }else if(notification.redirectTo.indexOf('report') !== -1) {
                    diagnosticReportService.getDiagnosticReport(notification.objectReference).then(function(resp) {
                        $scope.object = resp.data;
                        $scope.textIndex = 'value';
                        $scope.text = 'SEE_REPORT';
                    });
                }
            }
        }

        notificationService.getNotificationById($scope._id)
            .then(function(resp) {
                $scope.notification = resp.data;
                getData(resp.data);
                procedureId = $scope.notification.objectReference;
                if (!$scope.notification.readed) {
                    $scope.notification.readed = true;
                    return notificationService.putNotificationReaded($scope._id, $scope.notification);
                }
                return false;
            }).then(function(notificationReaded) {
                if (notificationReaded) {
                    $rootScope.unreadNotifications.quantity--;
                }
                return appointmentService.getAppointmentByRequestReference(procedureId);
            }).then(function(resp) {
                if (resp.data.length === 0) {
                    $scope.procedureAsinchronous = true;
                }


                if (resp.data[0].status === 'cancelled' && userData.get('user').role.sub_role !== 'CLIENT') {
                    $scope.cancelledCall = 'La llamada ya fue cancelada.';
                }

            }).catch(function(err) {
                $log.error(err);
            });

        if ($rootScope.isPractitionerCallcenter()) {
            $scope.enableRedirectList = true;
            practitionerService.getOrganization(userData.get('user').role.practitioner).then(function(respOrganization) {
                return practitionerService.getPractitionersByOrganization(respOrganization.data[0].organization.reference);
            }).then(function(respPractitioners) {
                $scope.practitionerList = [];
                var pos = 0;
                Object.keys(respPractitioners.data).forEach(function(key) {
                    if (respPractitioners.data[key].practitioner.display !== 'practitioner') {
                        $scope.practitionerList[pos] = {
                            id:        respPractitioners.data[key].practitioner.reference,
                            display:   respPractitioners.data[key].practitioner.display,
                            specialty: respPractitioners.data[key].specialty[0].text,
                            state:     'available'
                        };
                        pos++;
                    }
                });
            }).catch($log.error);
        }

        $scope.isSinchronous = function(notificationId) {
            var data = {
                procedureid:    $scope.object._id,
                userid:         userData.get('user')._id,
                notificationId: notificationId
            };

            notificationService.putNotificationReaded($scope.notification._id, $scope.notification)
            .then(function() {
                return procedureRequestService.getProcedureRequest(procedureId);
            })
            .then(function(procedureRequest) {

                if (procedureRequest.data.status === 'requested' || procedureRequest.data.status === 'commented') {
                    return callerService.acceptCall(data);
                }
                $scope.cancelledCall = 'La llamada ya fue cancelada.';
                return false;
            })
            .then(function(resp) {
                if (resp) {
                    $window.location.href = resp.data.dataCall.callUrl + '&t=' + $auth.getToken();
                }
            }).catch($log.error);
        };

        $scope.transferCall = function(notificationId, practitionerId) {
            var data = {
                practitionerId: practitionerId,
                notificationId: notificationId
            };
            if ($scope.notification.declined) {
                data.declined = true;
            }

            notificationService.putNotificationReaded($scope.notification._id, $scope.notification)
            .then(function() {
                return procedureRequestService.getProcedureRequest($scope.object._id);
            })
            .then(function(procedureRequest) {
                if(procedureRequest.data.status === 'requested' || procedureRequest.data.status === 'commented') {
                    return callerService.reTransferCall(data);
                }

                $scope.cancelledCall = 'La llamada ya fue cancelada.';

                return false;

            }).then(function(resp) {
                if (resp) {
                    $log.info('[DATOS]', resp);
                    $log.info('llamada transferida');
                    $scope.transferred = true;
                    $rootScope.showDialog($translate.instant('TRANSFERRED_CALL'));
                    $state.go('notification');
                }
            }).catch($log.error);
        };

        $scope.enableDerivation = function() {
            $scope.enableDerivationButton = true;
        };

        $scope.cancelCall = function() {

            var data = {
                procedureId:    $scope.object._id,
                reason:         $scope.reason
            };

            callerService.rejectProcedureRequest(data).then(function() {
                $scope.transferred = true;
                $state.go('procedure_request_abm');
            }).catch($log.error);
        };

    });
