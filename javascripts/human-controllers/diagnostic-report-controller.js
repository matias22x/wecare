'use strict';
angular.module('adistalApp')
    .controller('simpleEditDiagnosticReportCtrl', function($scope, $http, $stateParams, config, $q, $state, utilities, $translate,
        $log, userData, observationService, organizationsService, diagnosticOrderService, diagnosticReportService, moment, procedureRequestService,
        $window, $rootScope, listService, $timeout, socket, notificationService, $document, callerService, $location, $anchorScroll) {
        var diagnosticReportId = $stateParams.id;
        $scope.enableEdition = $state.current.name !== 'diagnostic_report_view';
        $scope.viewState = $state.current.name === 'diagnostic_report_view';
        $rootScope.title = $translate.instant('DIAGNOSTIC_REPORT');
        $rootScope.description = '';
        $scope.reason = '';
        $scope.diagnosticOrder = {};
        $scope.error_msg = '';
        $scope.observationAttached = {};
        $scope.reasonResend = '';
        $scope.noteinfo = {};
        $scope.noteAdded = false;
        $scope.noteError = false;
        $scope.unsaved_notes = false;
        $scope.performer = {};
        $scope.commentStr = $translate.instant('COMMENT');
        $scope._id = diagnosticReportId;
        $scope.placeHolderNote = $translate.instant('WRITE_YOUR_COMENT_HERE');
        $scope.entry = [];
        $document.find('#modal10').modal();
        var myModalId = $document.find('#modal10');
        $scope.physicalExam = ['GENERAL_INSPECTION', 'TEMPERATURE', 'FACE_AND_HEAD', 'EYES', 'EAR', 'NOSE', 'MOUTH', 'NECK', 'RESPIRATORY_SYSTEM', 'CARDIOVASCULAR_APPARATUS', 'CHEST', 'ABDOMEN_AND_PELVIS', 'APPARATUS_GENITO_URINARIO', 'NERVOUS_SYSTEM', 'SKIN_FANERAS_AND_SUBCUTANEOUS_CELLULAR_TISSUE', 'OSTEOMYOARTICULAR_SYSTEM'];
        $scope.toxicHabits = ['SMOKING', 'ALCOHOLISM', 'ILICIT_DRUGS'];
        $scope.psysiologicHabits = ['WEIGHT', 'FEEDING', 'DIET', 'THIRST', 'SLEEP', 'DIURESIS', 'CATHARSIS'];
        $scope.chillhoodDiseases = ['CHICKENPOX', 'PAROTITIS_CHILLHOOD', 'MEASLES', 'MUMPS', 'ASTHMA_CHILLHOOD', 'SCARLATIN_FEVER', 'RUBELLA', 'POLE', 'DIPHTERIA', 'SMALLPOX'];
        $scope.horizontalTransmitionDiseases = ['TUBERCULOSIS', 'MALARIA', 'PNEUMONIA', 'TYPHOID_FEVER', 'HEPATITIS_A', 'HEPATITIS_B', 'HEPATITIS_C', 'HEPATITIS_D', 'ETS'];
        $scope.adultDiseases = ['TONSILLITIS', 'SINUSITIS', 'REUMATHIC_FEVER', 'ANEMIA', 'BILLIAR_DISEASES', 'PALUDISM', 'PARASITISM', 'HTA', 'DIGESTIVE_HEMORRHAGE', 'EPILEPSY', 'ITU', 'OBESITY', 'DIABETES', 'CANCER', 'DROP', 'ASTHMA_ADULTHOOD', 'LUPUS', 'PEPTIC_ULCER', 'PANCREATITIS', 'PAROTITIS_ADULTHOOD'];
        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.data = {
            active: true,
            conclusion: ''
        };
        $scope.result = [{}];
        $scope.appointment = null;

        function setParcialRequest() {
            procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, {
                status: 'suspended'
            }).then(function(resp) {
                var data = {
                    procedureId: resp.data._id,
                    type: 'reporting'
                };
                socket.emit('start action', data);
                $scope.sendReporting = true;
            });
        }

        function stringToBoolean(stringToParse) {
            if (stringToParse === 'true') {
                return true;
            }
            return stringToParse;
        }

        function pushToArrayAndCreateEntry(index, type, entry) {
            if ($scope[type].indexOf(index) === -1) {
                $scope[type].push(index);
            }
            var value = stringToBoolean(entry.flag.coding[0].system);
            $scope.entry[index] = {
                text: entry.flag.text,
                value: value,
                version: entry.flag.coding[0].version,
                code: parseInt(entry.flag.coding[0].code)
            };
        }

        function getAppointmentInfo(diagnosticOrderId) {
            $http.get(config.api_url + '/api/appointments/?conditions={"request.reference":"' + diagnosticOrderId + '"}')
                .then(function(appointmentResponse) {
                    $scope.appointment = appointmentResponse.data.length && appointmentResponse.data[0] || null;
                }).catch($log.error);
        }

        function updateAppointmentInfo() {
            return $http.put(config.api_url + '/api/appointments/' + $scope.appointment._id, utilities.stringToDateRecursive($scope.appointment));
        }

        function preparePatientInfo(data) {
            if (data) {
                $scope.diagnosticOrder.createdAt = moment($scope.diagnosticOrder.createdAt).format('DD/MM/YY');
                $scope.diagnosticOrder.updatedAt = moment($scope.diagnosticOrder.updatedAt).format('DD/MM/YY');
                $scope.diagnosticOrder.subject.gender = data.data.gender;
                $scope.diagnosticOrder.subject._id = data.data._id;
                $scope.diagnosticOrder.subject.age = new Date().getFullYear() - new Date(data.data.birthDate).getFullYear();
            }
        }

        function getOrderInformation() {
            var allEntries = [];
            procedureRequestService.getProcedureRequest($stateParams.diagnostic_order_id).then(function(resp) {
                if (typeof resp.data !== 'undefined') {
                    $scope.diagnosticOrder = resp.data;

                    $scope.identifier[0].value = $scope.diagnosticOrder.identifier[0].system;
                    if ($scope.diagnosticOrder.status === 'suspended' || $scope.diagnosticOrder.status === 'cancelled' || $scope.diagnosticOrder.status === 'received' || $scope.diagnosticOrder.status === 'revision') {
                        $scope.isCancelled = true;
                    }

                    if ($scope.diagnosticOrder.status === 'suspended' || $scope.diagnosticOrder.status === 'requested' || $scope.diagnosticOrder.status === 'commented') {
                        $scope.inProgress = true;
                    }

                    if ($scope.diagnosticOrder.status === 'completed') {
                        $scope.procedureCompleted = true;
                    }

                    return diagnosticReportService.getPatientByReference($scope.diagnosticOrder.subject.reference);
                }

                return false;
            }).then(function(data) {
                preparePatientInfo(data);
                if ($scope.diagnosticOrder.supportingInfo.length > 0 && typeof $scope.diagnosticOrder.supportingInfo[0].reference !== 'undefined') {
                    var attachedObservations = $scope.diagnosticOrder.supportingInfo.map(function(infoItem) {
                        return observationService.getObservation(infoItem.reference)
                        .then(function(respFunction) {
                            if (typeof respFunction.data._id !== 'undefined') {
                                $scope.observationAttached[respFunction.data._id] = true;
                            }
                            return respFunction.data;
                        });
                    });
                    return $q.all(attachedObservations);
                }
                return false;
            }).then(function(attObservations) {
                if (attObservations) {
                    $scope.attachedObservations = attObservations;
                }
                return listService.getListByProcedure($scope.diagnosticOrder._id);
            }).then(function(lists) {
                if (lists.data.length > 0) {
                    $scope.listToPut = lists.data[0]._id;
                    allEntries = lists.data[0].entry;
                }
                return listService.getListBackGround($scope.diagnosticOrder.subject._id);
            }).then(function(lists) {
                if (lists.data.length > 0) {
                    $scope.listToPut = lists.data[0]._id;
                    allEntries = allEntries.concat(lists.data[0].entry);
                }
                Object.keys(allEntries).forEach(function(key) {
                    var index = allEntries[key].flag.coding[0].display;
                    var type = allEntries[key].flag.text;
                    pushToArrayAndCreateEntry(index, type, allEntries[key]);
                });
            }).catch($log.error);
        }

        if (typeof $stateParams.diagnostic_order_id !== 'undefined') {
            $scope.basedOn = [{
                reference: $stateParams.diagnostic_order_id
            }];
            getAppointmentInfo($stateParams.diagnostic_order_id);
            getOrderInformation();
            setParcialRequest();
        }
        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $http.get(config.api_url + '/api/diagnosticreports/' + $stateParams.id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                        $scope.data = {
                            active: $scope.active,
                            conclusion: $scope.conclusion
                        };

                    });
                    $scope.performer.display = resp.data.performer[1].actor.display;
                    $stateParams.diagnostic_order_id = resp.data.basedOn[0].reference;
                    getOrderInformation();

                    var notificationData = {
                        objectId: $stateParams.id,
                        to: userData.get('user')._id
                    };

                    notificationService.getNotificationByObjectAndUser(notificationData).then(function(notificationList) {
                        notificationList.data.forEach(function(notification) {
                            if (!notification.readed) {
                                $rootScope.unreadNotifications.quantity--;
                            }
                        });
                        return notificationService.readNotificationByReferenceAndUserId(notificationData);
                    }).then(function(response) {
                        $log.info(response);
                    });

                }).catch(function(err) {
                    $log.error(err);
                });
        }

        if (userData.get('user') !== null && typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
            var role = userData.get('user').role;
            $http.get(config.api_url + '/api/practitioners/' + role.practitioner)
                .then(function(resp) {
                    $scope.organizations = resp.data.practitionerRole;
                });
        }

        organizationsService.getAllOrganizations().then(function(orgResp) {
            $scope.organizationList = orgResp.data;
        }).catch($log.error);

        function postDiagnosticReport(newDiagnosticReport) {
            diagnosticReportService.postDiagnosticReport(utilities.stringToDateRecursive(newDiagnosticReport))
            .then(function(newReportResp) {
                if (typeof $stateParams.diagnostic_order_id !== 'undefined') {
                    procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, {
                        status: 'answered',
                        note: $scope.diagnosticOrder.note
                    }).then(function() {
                        if ($scope.appointment) {
                            $scope.appointment.report = {
                                reference: newReportResp.data._id
                            };
                            updateAppointmentInfo().then(function() {
                                myModalId.modal('open');
                            }).catch($log.error);
                        } else {
                            myModalId.modal('open');
                        }
                    }).catch(function(error) {
                        $log.error(error);
                        $scope.error_msg = error.data.error.message;
                    });
                } else {
                    myModalId.modal('open');
                }

            }).catch(function(err) {
                $log.error(err);
            });
        }

        function putDiagnosticReport(id, newDiagnosticReport) {
            diagnosticReportService.putDiagnosticReportById(id, newDiagnosticReport)
            .then(function() {
                if ($scope.noteAdded) {
                    return procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, {
                        note: $scope.diagnosticOrder.note
                    });
                }
                return true;
            })
            .then(function() {
                $state.go('diagnostic_report_abm');
            }).catch(function(err) {
                $log.error(err);
            });
        }

        $scope.saveDiagnosticReport = function() {
            $rootScope.enable_exit = true;

            if ($scope.noteinfo.currentNote) {
                $scope.unsaved_notes = true;
                var setFocusInNotes = true;
                $scope.chevron({position: 5}, setFocusInNotes);
                $location.hash('note');
                $anchorScroll();
                return;
            }

            if($scope.data.conclusion === '' || $scope.data.conclusion.length <= 10) {
                $scope.errorMsg = true;
                return;
            }

            if ($scope.noteinfo.currentNote) {
                $scope.noteError = true;
                return;
            }

            var performer = [{
                actor: userData.get('currentOrganization'),
                role: {
                    text: 'Organization'
                }
            }];
            var newDiagnosticReport = {
                identifier: $scope.identifier,
                conclusion: $scope.conclusion,
                result: $scope.result,
                managingOrganization: $scope.managingOrganization,
                basedOn: $scope.basedOn,
                performer: performer
            };
            Object.keys($scope.data).forEach(function(key) {
                newDiagnosticReport[key] = $scope.data[key];
            });

            if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                delete newDiagnosticReport.performer;

                var data = {
                    status: 'answered'
                };
                putDiagnosticReport($stateParams.id, utilities.stringToDateRecursive(newDiagnosticReport));
                procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, data);
            } else {
                postDiagnosticReport(utilities.stringToDateRecursive(newDiagnosticReport));
            }
        };
        $scope.revisionDiagnostic = function() {
            var data = {
                reason: $scope.reason,
                reportId: $stateParams.id
            };

            notificationService.revisionDiagnostic(data)
            .then(function() {
                $state.go('diagnostic_report_abm');
            })
            .catch($log.error);

        };

        $scope.sendNote = function() {
            $log.info('noteinfo: ', $scope.noteinfo.currentNote, $scope.username);
            $scope.noteAdded = true;
            $scope.noteError = false;
            $scope.diagnosticOrder.note.push({
                text: $scope.noteinfo.currentNote,
                authorString: $scope.username,
                authorReference: {
                    reference: userData.get('user')._id,
                    display: $scope.username
                }
            });
            $scope.noteinfo.currentNote = '';
            var procedureRequestOnlyNotes = {
                note: $scope.diagnosticOrder.note
            };
            procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, procedureRequestOnlyNotes);
        };

        $scope.observationDetail = function(observation) {
            $scope.currentObservation = {};
            $scope.currentObservation.studyName = observation.valueString;
            $scope.currentObservation._id = observation._id;
            $scope.currentObservation.attachment = observation.component.map(function(item) {
                return {
                    contentType: item.valueAttachment.contentType,
                    hash: item.valueAttachment.hash,
                    title: item.valueAttachment.title,
                    url: config.api_url + '/' + item.valueAttachment.url
                };
            });
            if ($scope.currentObservation.attachment[0].title.indexOf('dcm') === -1 && $scope.currentObservation.attachment[0].title.indexOf('png') === -1) {
                $scope.notIsDicom = true;
            } else {
                $scope.notIsDicom = false;
            }
        };

        $scope.selectAttachment = function(attachment) {
            $scope.currentAttachment = attachment;
            $log.info('currentAttachment: ', $scope.currentAttachment);
            if ($scope.currentAttachment.title.indexOf('dcm') === -1 && $scope.currentAttachment.title.indexOf('png') === -1 && !$scope.editing) {
                $scope.notIsDicom = true;
                $window.open($scope.currentAttachment.url);
            } else if ($scope.editing) {
                $scope.notIsDicom = true;
            }
        };

        $scope.cancelDiagnosticReport = function() {
            $state.go('diagnostic_report_abm');
        };

        $scope.chevronOptions = ['generalLi', 'solicitudLi', 'examen_fisicoLi', 'estudiosLi', 'antecedentesLi', 'notasLi', 'reporteLi'];

        $scope.initPosition = 6;

        $scope.selectedTab = function(selectedTab) {
            $scope.initPosition = $scope.chevronOptions.indexOf(selectedTab);
        };

        function changePosition(initialPosition) {
            var position = '#' + $scope.chevronOptions[initialPosition];
            $timeout(function() {
                angular.element(position).trigger('click');
            });
        }

        $scope.chevron = function(chevronArray) {
            var chevronPosition = chevronArray.position;
            if ($scope.chevronOptions[chevronPosition]) {
                $scope.initPosition = chevronArray.position;
                changePosition($scope.initPosition);
            }
        };

        $scope.reportModified = function() {
            return ($scope.updatedAt && !($scope.createdAt === $scope.updatedAt));
        };

        $scope.diagnosticOrderModified = function() {
            if($scope.diagnosticOrder) {
                return ($scope.diagnosticOrder.updatedAt && !($scope.diagnosticOrder.createdAt === $scope.diagnosticOrder.updatedAt));
            }
            return false;
        };

        $scope.$on('$destroy', function() {
            if ($scope.sendReporting && typeof $stateParams.diagnostic_order_id !== 'undefined') {
                var data = {
                    procedureId: $stateParams.diagnostic_order_id,
                    type: 'reporting'
                };
                socket.emit('stop action', data);
                delete $scope.sendReporting;
            }
        });


        $scope.receivedProcedure = function() {
            var data = {
                status: 'received'
            };
            procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, data).then(function() {
                $state.go('diagnostic_report_abm');
            }).catch($log.error);
        };


        $scope.rejectAndResendProcedure = function() {
            var data = {
                status: 'received',
                reasonCode: [{
                    text: $scope.reasonResend
                }],
                reasonReference: [{
                    reference: userData.get('user')._id,
                    display: userData.get('user').username
                }]
            };
            procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, data).then(function() {
                return $state.go('procedure_request_add', {id: $stateParams.diagnostic_order_id, resend: true});
            }).catch($log.info);
        };

        $scope.endRequest = function() {
            $scope.finishDate = new Date();
            $scope.procedureCompleted = true;

            $scope.diagnosticOrder.event.push({
                actor: {
                    reference: userData.get('user')._id,
                    display: userData.get('user').username
                },
                status: 'completed'
            });

            var data = {
                status: 'completed',
                event: $scope.diagnosticOrder.event
            };

            procedureRequestService.putProcedureRequestById($stateParams.diagnostic_order_id, data)
            .then(function() {
                $state.go('diagnostic_report_abm');
            });

            $rootScope.showDialog($translate.instant('YOU_FINALIZED_THIS_REQUEST'));
        };

        $scope.rejectProcedureRequest = function() {
            var data = {
                procedureId:    $stateParams.diagnostic_order_id,
                reason:         $scope.reason
            };

            callerService.rejectProcedureRequest(data)
            .then(function() {
                $state.go('procedure_request_abm');
            }).catch($log.error);
        };

    })
    .controller('printDiagnosticReportController', function($scope, $http, $stateParams,
        config, $state, utilities, $log, diagnosticReportService, procedureRequestService, patientsService, organizationsService, moment) {
        var diagnosticReportId = $stateParams.id;
        $scope._id = diagnosticReportId;

        diagnosticReportService.getDiagnosticReport(diagnosticReportId)
        .then(function(diagnosticReport) {
            $scope.diagnosticReport = diagnosticReport.data;

            return procedureRequestService.getProcedureRequest($scope.diagnosticReport.basedOn[0].reference);
        }).then(function(procedureRequest) {
            $scope.procedureRequest = procedureRequest.data;

            return patientsService.getPatientById($scope.procedureRequest.subject.reference);
        }).then(function(patient) {
            $scope.patient = patient.data;

            var now = moment(new Date());
            var age = now.diff(moment($scope.patient.birthDate), 'years');
            $scope.patient.age = age;

            return organizationsService.getOrganizationById($scope.procedureRequest.requester.onBehalfOf.reference);
        }).then(function(organization) {
            $scope.organization = organization.data;
        }).catch($log.error);

        $scope.printDiv = function() {
            var printContents = document.getElementById('divToPrint').innerHTML;
            var popupWin = window.open('', '_blank', 'width=800,height=800');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="stylesheets/printView.css"/><link rel="stylesheet" type="text/css" href="stylesheets/style.css"/><link rel="stylesheet" type="text/css" href="stylesheets/materialize.css"/><link rel="stylesheet" type="text/css" href="stylesheets/responsive.css"/></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };

    });
