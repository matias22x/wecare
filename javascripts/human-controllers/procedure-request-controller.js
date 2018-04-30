'use strict';
angular.module('adistalApp')
    .controller('simpleDiagnosticRequestCtrl', function($scope, $http, $stateParams, diagnosticReportService, $auth,
        config, $state, utilities, $log, userData, organizationsService, $window, appointmentService, practitionerService,
        observationService, patientsService, $q, $translate, diagnosticOrderService, procedureRequestService, $rootScope, moment, listService, $timeout, callerService, $document, $location, $anchorScroll, notificationService) {
        $rootScope.title = $translate.instant('DIAGNOSTIC_ORDERS');
        $rootScope.description = $translate.instant('DIAGNOSTIC_ORDERS_ARE_MADE_FROM_PATIENTS') + $translate.instant('SEE_PATIENTS');
        var procedureResquestId = $stateParams.id;
        $scope.EnableEdit = $stateParams.edit;
        $scope.enableRejected = false;
        $scope.exitAttachmentMsg = $translate.instant('EXIT_STUDY_UPLOAD');
        $scope.saveAttachmentMsg = $translate.instant('SAVE_STUDY');
        $scope.placeHolderNote = $translate.instant('ADD_YOUR_NOTE_HERE');
        $scope.sendStr = $translate.instant('SEND');
        $scope.commentStr = $translate.instant('COMMENT');
        $scope.userId = userData.get('user')._id;
        $scope.addStr = $translate.instant('ADD');
        $scope._id = procedureResquestId;
        $scope.unsaved_notes = false;
        $scope.currentObservation = {};
        $scope.observationAttached = {};
        $scope.patientInfoExist = false;
        $scope.loading = true;
        $scope.reason = '';
        $scope.appointmentLength = 0;
        $scope.practitionerRole = userData.get('user').role.sub_role;
        $scope.procedureResquest = {
            '_id': procedureResquestId,
            'identifier': [{
                type: {
                    coding: [{}]
                }
            }],
            bodySite: {
                coding: [{}]
            },
            note: [],
            status: 'requested',
            priority: '',
            subject: {},
            requester: {
                agent: {},
                onBehalfOf: {}
            },
            context: {},
            performer: {},
            supportingInfo: [{}],
            reasonReference: [{}],
            specimen: [{}],
            category: {
                coding: [{}]
            },
            code: {
                coding: [{}]
            },
            assignTo: []
        };
        $scope.attachment = [];
        $scope.noteinfo = {};
        $document.find('#modal10').modal();
        $document.find('#modal_reject_reason').modal();
        $scope.appointments = [{}];
        $scope.appointmentDate = '';
        $scope.observations = [];
        $scope.modalStatus = {
            open: false
        };
        $scope.subject = {};
        $scope.physicalExam = ['GENERAL_INSPECTION', 'TEMPERATURE', 'FACE_AND_HEAD', 'EYES', 'EAR', 'NOSE', 'MOUTH', 'NECK', 'RESPIRATORY_SYSTEM', 'CARDIOVASCULAR_APPARATUS', 'CHEST', 'ABDOMEN_AND_PELVIS', 'APPARATUS_GENITO_URINARIO', 'NERVOUS_SYSTEM', 'SKIN_FANERAS_AND_SUBCUTANEOUS_CELLULAR_TISSUE', 'OSTEOMYOARTICULAR_SYSTEM'];
        $scope.toxicHabits = ['SMOKING', 'ALCOHOLISM', 'ILICIT_DRUGS'];
        $scope.psysiologicHabits = ['WEIGHT', 'FEEDING', 'DIET', 'THIRST', 'SLEEP', 'DIURESIS', 'CATHARSIS'];
        $scope.chillhoodDiseases = ['CHICKENPOX', 'PAROTITIS_CHILLHOOD', 'MEASLES', 'MUMPS', 'ASTHMA_CHILLHOOD', 'SCARLATIN_FEVER', 'RUBELLA', 'POLE', 'DIPHTERIA', 'SMALLPOX'];
        $scope.horizontalTransmitionDiseases = ['TUBERCULOSIS', 'MALARIA', 'PNEUMONIA', 'TYPHOID_FEVER', 'HEPATITIS_A', 'HEPATITIS_B', 'HEPATITIS_C', 'HEPATITIS_D', 'ETS'];
        $scope.adultDiseases = ['TONSILLITIS', 'SINUSITIS', 'REUMATHIC_FEVER', 'ANEMIA', 'BILLIAR_DISEASES', 'PALUDISM', 'PARASITISM', 'HTA', 'DIGESTIVE_HEMORRHAGE', 'EPILEPSY', 'ITU', 'OBESITY', 'DIABETES', 'CANCER', 'DROP', 'ASTHMA_ADULTHOOD', 'LUPUS', 'PEPTIC_ULCER', 'PANCREATITIS', 'PAROTITIS_ADULTHOOD'];
        $scope.listBackground = {
            source: {},
            code: {},
            subject: [],
            entry : []
        };
        $scope.listPhysicalExam = {
            source: {},
            code: {},
            subject: [],
            entry : []
        };
        $scope.entry = {};
        var currentId = null;
        var role = null;

        $scope.chevronOptions = ['generalLi', 'solicitudLi', 'examen_fisicoLi', 'estudiosLi', 'antecedentesLi', 'notasLi'];

        $scope.initPosition = 0;
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

        if ($stateParams.tab) {
            $scope.initPosition = $scope.chevronOptions.indexOf(utilities.getNameLiByTabName($stateParams.tab));
            if ($scope.initPosition === 1) {
                $document.find('#solicitud').css('display', 'inherit');
            }
        }

        function answerProcedureButton() {
            if ($scope.appointments[0].status === 'arrived' || $scope.appointments[0].status === 'finished' || (($scope.procedureResquest.status === 'requested' || $scope.procedureResquest.status === 'commented') && $scope.procedureResquest.category[0].text === 'ASYNCHRONOUS_CONSULTATION')) {
                $scope.answerProcedureButton = true;
            }
        }

        function acceptCallButton() {
            if ($scope.appointments.length > 0 && $scope.appointments[0]._id && $scope.appointments[0].status === 'pending' && ($scope.procedureResquest.status === 'requested' || $scope.procedureResquest.status === 'commented')) {
                $scope.acceptCallButton = true;
            }
        }

        if (userData.get('user') !== null && typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
            role = userData.get('user').role;
            practitionerService.getPractitionerById(role.practitioner)
                .then(function(resp) {
                    $scope.organizations = resp.data.practitionerRole;
                });
        }
        organizationsService.getAllOrganizations().then(function(orgResp) {
            $scope.organizationList = orgResp.data;
        }).catch($log.error);
        if (typeof $stateParams.patient_id !== 'undefined' && $stateParams.patient_id !== '') {
            patientsService.getPatientById($stateParams.patient_id)
                .then(function(resp) {
                    $scope.procedureResquest.subject.reference = resp.data._id;
                    $scope.procedureResquest.subject.display = resp.data.name[0].text;
                    answerProcedureButton();
                    acceptCallButton();
                    observationService.getPatientObservation(resp.data._id)
                        .then(function(observationResp) {
                            $scope.observations = observationResp.data;
                        }).catch($log.error);
                });
        }

        if ((userData.get('user').type === 'Practitioner' && userData.get('user').role.sub_role === 'CLIENT')) {
            $scope.patientInfoExist = true;
        }

        function stringToBoolean(stringToParse) {
            if (stringToParse === 'true') {
                return true;
            }
            return stringToParse;
        }
        function formatEntry(entry) {
            var value = stringToBoolean(entry.flag.coding[0].system);

            return {
                text: entry.flag.text,
                value: value,
                version: entry.flag.coding[0].version,
                code: parseInt(entry.flag.coding[0].code)
            };
        }

        function setBtnReply() {
            if ($scope.procedureResquest.status !== 'requested' && $scope.procedureResquest.status !== 'commented') {
                $scope.keyMsj = $scope.procedureResquest.status === 'suspended' ? $translate.instant('THIS_REQUEST_IS_BEING_ANSWERED_AT_THIS_TIME') : $translate.instant('THIS_REQUEST__HAS_ALREADY_BEEN_ANSWERED');
            }
        }

        function insertEntry(dataList) {
            if (dataList.data.length > 0) {
                if(dataList.data[0].code.text === 'physicalExam') {
                    $scope.physicalExamToPut = dataList.data[0]._id;
                } else {
                    $scope.backgroundToPut = dataList.data[0]._id;
                }

                var entry = dataList.data[0].entry;
                Object.keys(entry).forEach(function(key) {
                    var index = entry[key].flag.coding[0].display;
                    var type = entry[key].flag.text;
                    if ($scope[type].indexOf(index) === -1) {
                        $scope[type].push(index);
                    }
                    $scope.entry[index] = formatEntry(entry[key]);
                });
            }
        }

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            currentId = $stateParams.id;
            var component = {};
            procedureRequestService.getProcedureRequest(currentId).then(function(resp) {
                $scope.subject = {
                    reference: resp.data.subject.reference,
                    display: resp.data.subject.display
                };
                Object.keys(resp.data).forEach(function(key) {
                    $scope.procedureResquest[key] = resp.data[key];
                });

                var notificationData = {
                    objectId: currentId,
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

                setBtnReply();
                $scope.procedureResquest.statusTranslate = $translate.instant($scope.procedureResquest.status);
                $scope.procedureResquest.category_text = $translate.instant($scope.procedureResquest.category[0].text);
                $scope.subjectEnable = true;
                if ($scope.procedureResquest.subject.reference) {
                    patientsService.getPatientById($scope.procedureResquest.subject.reference).then(function(userResp) {
                        $scope.currentPatient = userResp.data;
                        var now = moment(new Date());
                        var age = now.diff($scope.currentPatient.birthDate, 'years');
                        $scope.currentPatient.age = age;

                        listService.getList(userResp.data._id)
                          .then(function(dataList) {
                              insertEntry(dataList);
                          }).catch(function(err) {
                              $log.error(err);
                          });

                        listService.getListPhysicalExam(resp.data._id)
                            .then(function(dataList) {
                                insertEntry(dataList);
                            }).catch(function(err) {
                                $log.error(err);
                            });

                        if (userResp.data.name.length && userResp.data.name[0].text) {
                            $scope.procedureResquest.subject.display = userResp.data.name[0].text;
                            if(Object.keys($scope.procedureResquest.performer).length === 0) {
                                $scope.voidLength = 'false';
                            }

                        }

                    }).catch($log.error);
                }
                $scope.attachedObservations = [];
                if ($scope.procedureResquest.supportingInfo.length > 0 && typeof $scope.procedureResquest.supportingInfo[0].reference !== 'undefined') {
                    var attachedObservations = $scope.procedureResquest.supportingInfo.map(function(infoItem) {
                        return observationService.getObservation(infoItem.reference)
                            .then(function(observationResp) {
                                if (typeof observationResp.data._id !== 'undefined') {
                                    $scope.observationAttached[observationResp.data._id] = true;
                                }
                                return observationResp.data;
                            });
                    });
                    $q.all(attachedObservations).then(function(attObservations) {
                        $scope.observations = attObservations;
                        $scope.attachedObservations = $scope.observations;
                    });
                }
                var formatCreatedAt = new Date($scope.createdAt);
                $scope.formatCreatedAt = formatCreatedAt.toDateString();

                if (typeof $scope.procedureResquest.requester.onBehalfOf.reference !== 'undefined') {
                    organizationsService.getOrganizationById($scope.procedureResquest.requester.onBehalfOf.reference)
                        .then(function(response) {
                            $scope.currentOrganization = response.data;
                        }).catch($log.error);
                }
                diagnosticReportService.getByRequest(currentId)
                    .then(function(reportsResp) {
                        $scope.reports = reportsResp.data;
                    }).catch($log.error);
                appointmentService.getAppointmentByRequestReference(currentId)
                    .then(function(appointmentResp) {
                        $scope.appointments = appointmentResp.data.length && appointmentResp.data || [{}];
                        answerProcedureButton();
                        $scope.appointmentLength = appointmentResp.data.length;
                        acceptCallButton();
                    }).catch($log.error);

                if ($scope.procedureResquest.reasonCode[0] && $scope.procedureResquest.reasonCode[0].coding.length < 1) {
                  $document.find('#modal_reject_reason').modal('open');
                }
            }).catch($log.error);
            $scope.loading = false;
        }

        $scope.flicker = function flicker() {
          $scope.activeFlicker = true;
        }

        $scope.saveNewStudy = function saveNewStudy() {
            if (typeof $scope.currentObservation._id === 'undefined' || $scope.currentObservation._id === '') {
                if ($scope.attachment && $scope.attachment.length) {
                    component = $scope.attachment.map(function(item) {
                        return {
                            valueAttachment: item
                        };
                    });
                    observationService.postObservation({
                        valueString: $scope.studyName,
                        component: component,
                        subject: $scope.procedureResquest.subject
                    }).then(function(observationResp) {
                        $scope.procedureResquest.supportingInfo.push({
                            reference: observationResp.data._id
                        });
                        $scope.observations.push(observationResp.data);
                        $scope.attachment = [];
                        $scope.studyName = '';
                        $scope.modalStatus.open = false;
                    }).catch($log.error);
                }
            } else {
                component = $scope.attachment.map(function(item) {
                    return {
                        valueAttachment: item
                    };
                });
                var id = $scope.currentObservation._id;
                $scope.currentObservation._id = '';
                $scope.datos = {};
                $scope.datos.valueString = $scope.currentObservation.studyName;
                $scope.datos.component = component;
                $scope.datos.subject = $scope.procedureResquest.subject;
                observationService.putObservationById(id, $scope.datos)
                    .then(function(observationSave) {
                        var idObservations = $scope.observations.map(function(item) {
                            return item._id;
                        });
                        $scope.observations[idObservations.indexOf(id)].valueString = $scope.datos.valueString;
                        $scope.observations[idObservations.indexOf(id)].component = observationSave.data.component;
                        $scope.modalStatus.open = false;
                    })
                    .catch(function(data) {
                        $log.error('Error:' + data);
                    });
            }
        };
        $scope.setEmpty = function setEmpty() {
            $scope.attachment = [];
            $scope.currentObservation = {};
        };

        $scope.cancelStudy = function cancelStudy() {
            $scope.attachment = [];
            $scope.studyName = '';
        };

        function filterDataToResend(data) {
            delete data._id;
            delete data.context;
            delete data.createdAt;
            delete data.deleted;
            delete data.statusTranslate;
            data.requester = {};
            data.specimen = [{}];
            data.status = 'requested';
            return data;
        }
        function filterDataAppointmentToResend(dataAppointment) {
            delete dataAppointment._id;
            delete dataAppointment.created;
            delete dataAppointment.createdAt;
            delete dataAppointment.updatedAt;
            delete dataAppointment.__v;
            return dataAppointment;
        }

        $scope.saveDiagnosticOrder = function() {
            if ($scope.noteinfo.currentNote) {
                $scope.unsaved_notes = true;
                var setFocusInNotes = true;
                $scope.chevron({position: 5}, setFocusInNotes);
                $location.hash('sendNote');
                $anchorScroll();
                return true;
            }
            var requestId = '';
            $scope.procedureResquest.supportingInfo = [];
            $scope.procedureResquest.supportingInfo = $scope.observations.map(function(observation) {
                return {
                    reference: observation._id
                };
            });
            var cleanData = utilities.stringToDateRecursive($scope.procedureResquest);
            delete cleanData.__v;
            if (!cleanData.supportingInfo || cleanData.supportingInfo.length < 1) {
                cleanData.supportingInfo = [];
            }

            return $q(function(resolve) {
                if (typeof $scope.procedureResquest['_id'] !== 'undefined' && $scope.procedureResquest['_id'] !== '' && !$stateParams.resend) {
                    requestId = $stateParams.id;
                    return resolve(procedureRequestService.putProcedureRequestById(requestId, cleanData));
                }
                if ($stateParams.resend) {
                    cleanData = filterDataToResend(cleanData);
                }
                return resolve(procedureRequestService.postProcedureRequest(cleanData));
            })
                .then(function(respData) {
                    var procedurerequest = respData.data;
                    requestId = procedurerequest._id;
                    Object.keys($scope.entry).forEach(function(key) {
                        var value = '-';
                        var code = '-';
                        if ($scope.entry[key].value) {
                            value = $scope.entry[key].value.toString();
                        }
                        if ($scope.entry[key].code) {
                            code = $scope.entry[key].code.toString();
                        }
                        $scope.newEntry = {
                            flag: {
                                text: $scope.entry[key].text,
                                coding: [{
                                    'system': value || '-',
                                    'display': key || '-',
                                    'version': $scope.entry[key].version || '-',
                                    'code': code || '-'
                                }]
                            }
                        };
                        if ($scope.newEntry.flag.text === 'physicalExam') {
                            $scope.listPhysicalExam.entry.push($scope.newEntry);
                        } else {
                            $scope.listBackground.entry.push($scope.newEntry);
                        }
                    });
                    $scope.listPhysicalExam.subject.push($scope.procedureResquest.subject);
                    $scope.listPhysicalExam.source.reference = requestId;
                    $scope.listPhysicalExam.source.display = $scope.procedureResquest.identifier[0].system;
                    $scope.listPhysicalExam.code.text = 'physicalExam';
                    $scope.listBackground.subject.push($scope.procedureResquest.subject);
                    $scope.listBackground.code.text = 'background';

                    if (!$scope.backgroundToPut) {
                        listService.postList($scope.listBackground).then(function(postListResp) {
                            $log.info(postListResp);
                        }).catch($log.error);
                    } else {
                        listService.putList($scope.backgroundToPut, $scope.listBackground).then(function(postListResp) {
                            $log.info(postListResp);
                        }).catch($log.error);
                    }

                    if (!$scope.physicalExamToPut || $stateParams.resend) {
                        listService.postList($scope.listPhysicalExam).then(function(postListResp) {
                            $log.info(postListResp);
                        }).catch($log.error);
                    } else {
                        listService.putList($scope.physicalExamToPut, $scope.listPhysicalExam).then(function(postListResp) {
                            $log.info(postListResp);
                        }).catch($log.error);
                    }

                    if ($scope.procedureResquest.category[0].text && $scope.procedureResquest.category[0].text !== 'ASYNCHRONOUS_CONSULTATION') {
                        $scope.appointments[0].request = {
                            reference: procedurerequest._id
                        };
                        $scope.appointments[0].serviceCategory = procedurerequest.type;
                        $scope.appointments[0].reason = [procedurerequest.code];
                        if ($scope.appointments[0]._id && !$stateParams.resend) {
                            var appointmentId = $scope.appointments[0]._id || '';
                            return appointmentService.putAppointmentById(appointmentId, utilities.stringToDateRecursive($scope.appointments[0]));
                        }
                        if ($stateParams.resend) {
                            $scope.appointments[0] = filterDataAppointmentToResend($scope.appointments[0]);
                        }
                        return appointmentService.postAppointment(utilities.stringToDateRecursive($scope.appointments[0]));
                    }
                    return true;
                }).then(function() {
                    if ($stateParams.resend) {
                        $document.find('#modal10').modal('open');
                    }else {
                        $rootScope.showDialog($translate.instant('PROCEDURE_REQUEST_EDITED'));
                        $state.go('procedure_request_abm');
                    }
                }).catch(function(err) {
                    $log.error(err);
                });
        };

        $scope.sendNote = function() {
            $scope.procedureResquest.note.push({
                text: $scope.noteinfo.currentNote,
                authorString: $scope.username,
                authorReference: {
                    reference: userData.get('user')._id,
                    display: $scope.username
                }
            });

            Object.keys($scope.procedureResquest.note).forEach(function(key) {
                if ($scope.procedureResquest.note[key].time) {
                    $scope.procedureResquest.note[key].time.type = new Date($scope.procedureResquest.note[key].time.type);
                }
            });

            $scope.noteinfo.currentNote = '';

            var procedureRequestOnlyNotes = {
                note: $scope.procedureResquest.note
            };

            procedureRequestService.putProcedureRequestById($stateParams.id, procedureRequestOnlyNotes);

            $scope.unsaved_notes = false;
        };

        $scope.cancelDiagnosticOrder = function() {
            $state.go('procedure_request_abm');
        };

        $scope.selectOrganization = function() {
            var parentOrganizationId = $scope.procedureResquest.requester.onBehalfOf.reference;
            $scope.procedureResquest.organizationList.forEach(function(organization) {
                if (organization._id === parentOrganizationId) {
                    $scope.procedureResquest.requester.onBehalfOf.reference = parentOrganizationId;
                    $scope.procedureResquest.requester.onBehalfOf.display = organization.name;
                }
            });
        };

        $scope.removeObservation = function(observation) {
            var observationIndex = $scope.observations.indexOf(observation);
            $scope.observations.splice(observationIndex, 1);
            $scope.observationAttached[observation._id] = false;
            $scope.procedureResquest.supportingInfo.splice(observationIndex, 1);
            $scope.currentObservation = {};
        };
        $scope.editObservation = function(observation) {
            $scope.editing = true;
            $scope.currentObservation = {};
            $scope.attachment = observation.component;
            $scope.currentObservation.studyName = observation.valueString;
            $scope.currentObservation._id = observation._id;
            $scope.attachment = observation.component.map(function(item) {
                return {
                    contentType: item.valueAttachment.contentType,
                    hash: item.valueAttachment.hash,
                    title: item.valueAttachment.title,
                    url: config.api_url + '/' + item.valueAttachment.url
                };
            });
            $scope.currentObservation.attachment = $scope.attachment;
        };
        $scope.selectPatient = function(patient) {
            $scope.subject.reference = patient.patient.id;
            $scope.subject.display = patient.patient.name;
            observationService.getPatientObservation(patient.patient.id).then(function(observationResp) {
                $scope.observations = observationResp.data;
            });
        };

        $scope.selectAttachment = function(attachment) {
            $scope.currentAttachment = attachment;
            if ($scope.currentAttachment.title.indexOf('dcm') === -1 && !$scope.editing) {
                $scope.notIsDicom = true;
                $window.open($scope.currentAttachment.url);
            } else if ($scope.editing) {
                $scope.notIsDicom = true;
            }
        };

        $scope.observationDetail = function(observation) {
            if($scope.currentObservation._id === observation._id) {
                $scope.currentObservation = {};
            }else{
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
                $scope.notIsDicom = $scope.currentObservation.attachment[0].title.indexOf('dcm') === -1;
                if ($scope.notIsDicom === true) {
                    $scope.selectAttachment($scope.currentObservation.attachment[0]);
                }
            }
        };

        $scope.rejectProcedureRequest = function() {
            var data = {
                procedureId:    $scope._id,
                reason:         $scope.reason
            };

            callerService.rejectProcedureRequest(data)
            .then(function() {
                $state.go('procedure_request_abm');
            }).catch($log.error);
        };
        $scope.acceptCall = function() {
            var dataToSendInitCall = {
                procedureid:    $scope.procedureResquest._id,
                userid:         userData.get('user')._id
            };
            callerService.acceptCall(dataToSendInitCall).then(function(resp) {
                $window.location.href = resp.data.dataCall.callUrl + '&t=' + $auth.getToken();
            });
        };

        if (($scope.procedureResquest.status === 'requested' || $scope.procedureResquest.status === 'commented') && $scope.practitionerRole !== 'CLIENT' && userData.get('user').type !== 'Node Administrator') {
            $scope.enableRejected = true;
        }

        $scope.resendProcedure = function() {
          $scope.reasonData = {
            status: 'revision',
            reasonCode: [{
              coding: [{
                system: 'true'
              }],
              text: $scope.reasonResend
            }],
            reasonReference: [{
              reference: userData.get('user')._id,
              display: userData.get('user').username
            }]
          };


            procedureRequestService.putProcedureRequestById($scope.procedureResquest._id, $scope.reasonData).then(function() {
                return $state.go('procedure_request_add', {id: $scope.procedureResquest._id, resend: true});
            }).catch($log.info);
        };

    })
    .controller('printDiagnosticOrderController', function($scope, $http, $stateParams, procedureRequestService, diagnosticReportService,
        config, $state, utilities, $log, userData, organizationsService, practitionerService, patientsService, moment, $translate, $window) {
        var diagnosticOrderId = $stateParams.id;
        $scope._id = diagnosticOrderId;

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            procedureRequestService.getProcedureRequest($stateParams.id)
                .then(function(procedureRequest) {
                    $scope.events = {};
                    $scope.procedureRequest = procedureRequest.data;
                    $scope.procedureRequest.createdAt = moment($scope.procedureRequest.createdAt).format('DD/MM/YY, h:mm:ss a');
                    $scope.procedureRequest.status = $translate.instant($scope.procedureRequest.status);
                    $scope.procedureRequest.category[0].text = $translate.instant($scope.procedureRequest.category[0].text);

                    Object.keys($scope.procedureRequest.event).forEach(function(key) {
                        $scope.procedureRequest.event[key].dateTime = moment($scope.procedureRequest.event[key].dateTime).format('DD/MM/YY, h:mm:ss a');
                        $scope.procedureRequest.event[key].status = $translate.instant($scope.procedureRequest.event[key].status);
                        if ($scope.procedureRequest.event[key].status === 'unknown') {
                            $scope.procedureRequest.event[key].status = '';
                        }
                    });
                    return patientsService.getPatientById($scope.procedureRequest.subject.reference);
                }).then(function(patient) {
                    $scope.patient = patient.data;

                    var now = moment(new Date());
                    var age = now.diff(moment($scope.patient.birthDate), 'years');
                    $scope.patient.age = age;
                    return organizationsService.getOrganizationById($scope.procedureRequest.requester.onBehalfOf.reference);
                }).then(function(organization) {
                    $scope.organization = organization.data;
                }).catch(function(err) {
                    $log.error(err);
                });

        }
        $scope.printDiv = function() {
            var printContents = document.getElementById('divToPrint').innerHTML;
            var popupWin = $window.open('', '_blank', 'width=800,height=800');
            popupWin.document.open();
            popupWin.document.write('<html><head>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/materialize.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/printView.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/_constant.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/ie.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/style.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/print.css"/>' +
            '<link rel="stylesheet" type="text/css" href="stylesheets/responsive.css"/>' +
            '</head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };

    })
    .controller('diagnosticOrderTypeSelectCtrl', function($scope, $http, $stateParams,
        config, $state, userData, $log, $translate, $rootScope) {
        $rootScope.title = $translate.instant('NEW_DIAGNOSTIC_ORDER');
        $rootScope.description = $translate.instant('SELECT_THE_TYPE_OF_DIAGNOSTIC_REQUESTED');
        $scope.diagnosticTypeList = [{
            title: $translate.instant('ASYNCHRONOUS_CONSULTATION'),
            description: $translate.instant('NEW_ASYNCHRONOUS_CONSULTATION'),
            type: 'ASYNCHRONOUS_CONSULTATION',
            priority: 'ROUTINE',
            property: '',
            code: ''
        },
        {
            title: $translate.instant('SPONTANEOUS_SYNCHRONOUS_CONSULTATION'),
            description: $translate.instant('NEW_SPONTANEOUS_SYNCHRONOUS_CONSULTATION'),
            type: 'SPONTANEOUS_SYNCHRONOUS_CONSULTATION',
            priority: 'ROUTINE',
            property: '',
            code: ''
        }];
        $scope.newDiagnosticOrder = function(diagnosticInfo) {
            $state.go('diagnosticOrderByType.new', {
                type: {
                    text: diagnosticInfo.type
                },
                priority: diagnosticInfo.priority
            });
        };
    })
    .controller('procedureResquestListCtrl', function($scope, $http, config, $log, userData, $q, diagnosticOrderService, procedureRequestService, moment, $rootScope, $translate, utilities) {
        $scope.properties = [];
        $rootScope.title = $translate.instant('DIAGNOSTIC_ORDERS');
        $rootScope.description = $translate.instant('DIAGNOSTIC_ORDERS_ARE_MADE_FROM_PATIENTS') + $translate.instant('SEE_PATIENTS');
        $scope.miDiagnosticOrdersListView = [];
        $scope.userData = userData.get('user');
        $scope.type = userData.get('user').type;

        function defineProperties() {
            if($rootScope.isPractitionerLender() || $scope.userData.type === 'Node Administrator') {
                $scope.properties = ['Title', 'Reason', 'RequestedBy', 'Status', 'Created At'];
            }else {
                $scope.properties = ['Title', 'Patient', 'RequestedBy', 'Status', 'Created At'];
            }
        }


        function loadDiagnosticOrder(data, currentOrganizationId) {
            return $q(function(resolve) {
                if (data && currentOrganizationId) {
                    data = utilities.parseData(data);
                    return resolve(procedureRequestService.searchProcedureRequestsRoute(data, currentOrganizationId, userData.get('user').role.sub_role));
                } else if (data && !currentOrganizationId) {
                    data = utilities.parseData(data);
                    return resolve(procedureRequestService.searchProcedureRequestsRoute(data));
                } else if (!data && currentOrganizationId) {
                    return resolve(procedureRequestService.searchProcedureRequestsRoute(null, currentOrganizationId, userData.get('user').role.sub_role));
                }
                return resolve(procedureRequestService.searchProcedureRequestsRoute());
            })
                .then(function(procedurRequestResp) {
                    $scope.procedureRequestListView = procedurRequestResp.data.data.map(function(item) {
                        if(item.code.text && item.code.text.length > 20) {
                            var trimmedString = item.code.text.substring(0, 20);
                            item.code.text = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
                            item.code.text = item.code.text.concat(' ...');
                        }
                        return {
                            _id: item._id,
                            identifier: item._id,
                            patient: (item.identifier && item.identifier.length > 0) && item.identifier[0].value,
                            requestedBy: item.requester.agent.display,
                            orderer: item.requester.agent,
                            title: (typeof item.identifier[0] !== 'undefined' && typeof item.identifier[0].system !== 'undefined' ?
                                item.identifier[0].system :
                                '-'),
                            createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
                            status: $translate.instant(item.status),
                            reason: item.code.text,
                            sref: {
                                patient: {
                                    state: 'patient_view',
                                    params: {
                                        id: item.subject.reference
                                    }
                                },
                                requestedBy: {
                                    state: 'users-view',
                                    params: {
                                        id: item.requester.agent.reference
                                    }
                                }
                            }
                        };
                    });
                    return $scope.procedureRequestListView;
                }).catch($log.error);
        }
        if (userData.get('user') !== null && typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
            loadDiagnosticOrder(null, userData.get('currentOrganization').reference);
        } else {
            loadDiagnosticOrder();
        }

        $scope.searchData = function(data) {
            if (userData.get('currentOrganization')) {
                return loadDiagnosticOrder(data, userData.get('currentOrganization').reference);
            }
            return loadDiagnosticOrder(data);
        };

        $scope.currentUser = userData.get('user');

        $scope.confirmDelete = function(itemToDelete) {
            procedureRequestService.deleteProcedureRequestById(itemToDelete._id)
            .catch(function(deletePractitionerError) {
                $log.error('deletePractitionerError: ', deletePractitionerError);
            });
        };

        defineProperties();
    })
    .controller('newProcedureRequestCtrl', function($scope, $http, config, $q,
        $state, utilities, $log, userData, organizationsService, patientsService, appointmentService,
        diagnosticOrderService, observationService, diagnosticReportService, $translate,
        practitionerService, procedureRequestService, $window, moment, listService, $rootScope, $timeout, $document, $location, $anchorScroll) {
        function loadPatientData() {
            patientsService.getPatientById($state.params.patient_id)
                .then(function(resp) {
                    $scope.loading = false;
                    var now = moment(new Date());
                    var age = now.diff(moment(resp.data.birthDate), 'years');
                    $scope.currentPatient = resp.data;
                    $scope.identifier[0].value = $scope.currentPatient.identifier[0].value;
                    $scope.subject.reference = resp.data['_id'];
                    $scope.subject.display = resp.data.name[0].text;
                    $scope.subject.age = age;
                });
        }
        if ($state.params.patient_id) {
            loadPatientData();
            $scope.loading = true;
        } else {
            $scope.loading = false;
        }
        $scope.currentObservation = {};
        $scope.observationAttached = {};
        $scope.currentPatient = {};
        $scope.error_msg = '';
        $scope.placeHolderNote = $translate.instant('ADD_YOUR_NOTE_HERE');
        var diagnosticOrderId = $state.params.id;
        $scope.EnableEdit = true;
        $scope.exitAttachmentMsg = $translate.instant('EXIT_STUDY_UPLOAD');
        $scope.saveAttachmentMsg = $translate.instant('SAVE_STUDY');
        $scope.noPatientMessage = $translate.instant('YOU_MUST_SELECT_A_PATIENT_BEFORE_UPLOADING_A_STUDY');
        $scope.sendStr = $translate.instant('SEND');
        $scope.commentStr = $translate.instant('COMMENT');
        $scope.addStr = $translate.instant('ADD');
        $scope.titleAssignTo = $translate.instant('ASSIGN');
        $scope['_id'] = diagnosticOrderId;
        $scope.unsaved_notes = false;
        $scope.performer = {
            reference : ''
        };

        function getListValuesTranslates(optionsObj) {
            var optionsArray = [];
            Object.keys(optionsObj).forEach(function(key) {
                optionsArray.push(optionsObj[key]);
            });
            var listNormalize = optionsArray.filter(function(item) {
                return item.getAttribute('option-untranslate') && $translate.instant(item.getAttribute('option-untranslate'));
            }).map(function(option) {
                return $translate.instant(option.getAttribute('option-untranslate'));
            });
            return listNormalize;
        }

        $document.on('mouseover', '.select-type .dropdown-content li>span', function(event) {
            var optionsObj = $document.find('#type-request')[0].options;
            var defaultOptions = getListValuesTranslates(optionsObj);
            if (event.currentTarget.innerText.indexOf(defaultOptions[defaultOptions.indexOf('Asincrónica')]) >= 0) {
                $scope.sinchronousType = false;
                $scope.asinchronousType = true;
            }else if (event.currentTarget.innerText.indexOf(defaultOptions[defaultOptions.indexOf('Sincrónica')]) >= 0) {
                $scope.sinchronousType = true;
                $scope.asinchronousType = false;
            }
            $scope.$apply(function() {
                $rootScope.explicationText = false;
                $rootScope.enableExplication = true;
                $timeout(function() {
                    $rootScope.closeExplication();
                }, 4000);
            });
        });
        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.event = [{
            description: {
                coding: [{}]
            },
            actor: {}
        }];
        $scope.item = [{
            code: {
                coding: [{}]
            },
            specimen: {},
            bodySite: {
                coding: [{}]
            },
            event: [{
                description: {
                    coding: [{}]
                },
                actor: {}
            }]
        }];
        $document.find('#modal10').modal();
        $scope.physicalExam = ['GENERAL_INSPECTION', 'TEMPERATURE', 'FACE_AND_HEAD', 'EYES', 'EAR', 'NOSE', 'MOUTH', 'NECK', 'RESPIRATORY_SYSTEM', 'CARDIOVASCULAR_APPARATUS', 'CHEST', 'ABDOMEN_AND_PELVIS', 'APPARATUS_GENITO_URINARIO', 'NERVOUS_SYSTEM', 'SKIN_FANERAS_AND_SUBCUTANEOUS_CELLULAR_TISSUE', 'OSTEOMYOARTICULAR_SYSTEM'];
        $scope.toxicHabits = ['SMOKING', 'ALCOHOLISM', 'ILICIT_DRUGS'];
        $scope.psysiologicHabits = ['WEIGHT', 'FEEDING', 'DIET', 'THIRST', 'SLEEP', 'DIURESIS', 'CATHARSIS'];
        $scope.chillhoodDiseases = ['CHICKENPOX', 'PAROTITIS_CHILLHOOD', 'MEASLES', 'MUMPS', 'ASTHMA_CHILLHOOD', 'SCARLATIN_FEVER', 'RUBELLA', 'POLE', 'DIPHTERIA', 'SMALLPOX'];
        $scope.horizontalTransmitionDiseases = ['TUBERCULOSIS', 'MALARIA', 'PNEUMONIA', 'TYPHOID_FEVER', 'HEPATITIS_A', 'HEPATITIS_B', 'HEPATITIS_C', 'HEPATITIS_D', 'ETS'];
        $scope.adultDiseases = ['TONSILLITIS', 'SINUSITIS', 'REUMATHIC_FEVER', 'ANEMIA', 'BILLIAR_DISEASES', 'PALUDISM', 'PARASITISM', 'HTA', 'DIGESTIVE_HEMORRHAGE', 'EPILEPSY', 'ITU', 'OBESITY', 'DIABETES', 'CANCER', 'DROP', 'ASTHMA_ADULTHOOD', 'LUPUS', 'PEPTIC_ULCER', 'PANCREATITIS', 'PAROTITIS_ADULTHOOD'];
        $scope.listBackground = {
            code: {},
            subject: [],
            entry : []
        };
        $scope.listPhysicalExam = {
            source: {},
            code: {},
            subject: [],
            entry : []
        };
        $scope.entry = {};
        $scope.note = [];
        $scope.status = 'requested';
        $scope.statusTranslate = $translate.instant('requested');
        $scope.subject = {};
        $scope.requester = {};
        $scope.encounter = {};
        $scope.performerType = {};
        $scope.supportingInfo = [];
        $scope.specimen = [{}];
        $scope.reason = [{
            coding: [{}]
        }];
        $scope.code = {};
        $scope.assignTo = [];
        $scope.category = [];
        $scope.attachment = [];
        $scope.noteinfo = {};
        $scope.appointments = [{}];
        $scope.appointmentDate = '';
        $scope.observations = [];
        $scope.modalStatus = {
            open: false
        };
        $scope.asynchronous_button = true;
        $scope.searched = false;

        var currentDiagnosticId = null;
        var role = null;

        function loadReports(diagnosticId) {
            diagnosticReportService.getByRequest(diagnosticId)
                .then(function(reportsResp) {
                    $scope.reports = reportsResp.data;
                }).catch($log.error);
        }
        function loadAppointments(diagnosticId) {
            appointmentService.getAppointmentByRequestReference(diagnosticId)
                .then(function(appointmentResp) {
                    $scope.appointments = appointmentResp.data.length && appointmentResp.data || [{}];
                }).catch($log.error);
        }
        function updateOrganizations() {
            if (userData.get('user') !== null &&
                typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
                role = userData.get('user').role;
                practitionerService.getPractitionerById(role.practitioner)
                    .then(function(resp) {
                        $scope.organizations = resp.data.practitionerRole;
                    });
            }
            organizationsService.getAllOrganizations({'identifier.use': 'LENDER'}).then(function(orgResp) {
                $scope.organizationList = orgResp.data;
            }).catch($log.error);
        }

        updateOrganizations();

        $rootScope.openExplication();
        $timeout(function() {
            $rootScope.closeExplication();
        }, 4000);

        $scope.selectOrganization = function selectOrganization() {
            var organizationSelected = $scope.organizationList.find(function(organization) {
                return organization._id === $scope.performer.reference;
            });
            $scope.performer.display = organizationSelected.name;
            $scope.specialtyList = organizationSelected.specialties;
        };

        practitionerService.getSpeciality().then(function(speciality) {
            $scope.specialtyList = speciality.data;
        });

        if (typeof $state.params.id !== 'undefined' && $state.params.id !== '') {
            currentDiagnosticId = $state.params.id;
            diagnosticOrderService.getDiagnosticOrder(currentDiagnosticId).then(function(resp) {
                Object.keys(resp.data).forEach(function(key) {
                    $scope[key] = resp.data[key];
                });

                if (typeof $scope.supportingInfo[0].reference !== 'undefined') {
                    observationService.getObservation($scope.supportingInfo[0].reference)
                        .then(function(respFunction) {
                            var observation = respFunction.data;
                            $scope.studyName = observation.valueString;
                            $scope.attachment = observation.component.map(function(item) {
                                return {
                                    contentType: item.valueAttachment.contentType,
                                    hash: item.valueAttachment.hash,
                                    title: item.valueAttachment.title,
                                    url: config.api_url + '/' + item.valueAttachment.url
                                };
                            });
                        });
                }
                var formatCreatedAt = new Date($scope.createdAt);
                $scope.formatCreatedAt = formatCreatedAt.toDateString();
                loadReports(currentDiagnosticId);
                loadAppointments(currentDiagnosticId);
            }).catch($log.error);
        }
        $scope.openModal = function() {
            $scope.modalStatus.open = !$scope.modalStatus.open;
        };

        $scope.saveNewStudy = function saveNewStudy() {
            if ($scope.attachment && $scope.attachment.length) {
                var component = $scope.attachment.map(function(item) {
                    return {
                        valueAttachment: item
                    };
                });
                observationService.postObservation({
                    valueString: $scope.studyName,
                    component: component,
                    subject: $scope.subject
                }).then(function(observationResp) {
                    $scope.supportingInfo.push({
                        reference: observationResp.data._id
                    });
                    $scope.observations.push(observationResp.data);
                    $scope.attachment = [];
                    $scope.studyName = '';
                    $scope.modalStatus.open = false;
                }).catch($log.error);
            }
        };

        $scope.cancelStudy = function cancelStudy() {
            $scope.attachment = [];
            $scope.studyName = '';
            $scope.modalStatus.open = false;
        };

        $scope.setPriority = function() {
            if ($scope.category[0].text === 'SPONTANEOUS_SYNCHRONOUS_CONSULTATION' || $scope.category[0].text === 'ASYNCHRONOUS_CONSULTATION') {
                var text = 'N_ASYNCHRONOUS_REQUEST';
                if ($scope.category[0].text === 'SPONTANEOUS_SYNCHRONOUS_CONSULTATION') {
                    text = '_SYNCHRONOUS_REQUEST';
                    $scope.sinchronousType = true;
                    $scope.asinchronousType = false;
                } else {
                    $scope.sinchronousType = false;
                    $scope.asinchronousType = true;
                }
                $rootScope.explicationText = false;
                $rootScope.enableExplication = true;

                $rootScope.showDialog($translate.instant('YOU_SELECTED_A' + text));
                $scope.priority = 'ROUTINE';
            }
            $scope.category[0].coding = [{}];
        };

        $scope.saveDiagnosticOrder = function() {
            if ($scope.noteinfo.currentNote) {
                $scope.unsaved_notes = true;
                var setFocusInNotes = true;
                $scope.chevron({position: 5}, setFocusInNotes);
                $location.hash('sendNote');
                $anchorScroll();
                return true;
            }
            if(typeof $scope.performer.reference !== 'undefined' && $scope.performer.reference !== '') {
                $scope.msg = false;

                if (typeof $scope.identifier[0].system !== 'undefined' && $scope.identifier[0].system !== '') {
                    delete $scope.subject.age;
                    var newDiagnosticOrder = {
                        identifier: $scope.identifier,
                        event: $scope.event,
                        item: $scope.item,
                        note: $scope.note,
                        requester: $scope.requester,
                        subject: $scope.subject,
                        encounter: $scope.encounter,
                        specimen: $scope.specimen,
                        supportingInfo: $scope.supportingInfo,
                        category: $scope.category,
                        code: $scope.code,
                        status: $scope.status,
                        priority: $scope.priority,
                        performer: $scope.performer,
                        assignTo: $scope.assignTo,
                        performerType: $scope.performerType
                    };
                    var diagnosticId = '';
                    return $q(function(resolve) {
                        if (typeof $state.params.id !== 'undefined' && $state.params.id !== '') {
                            diagnosticId = $state.params.id;
                            return resolve(procedureRequestService.putProcedureRequestById(diagnosticId, utilities.stringToDateRecursive(newDiagnosticOrder)));
                        }
                        return resolve(procedureRequestService.postProcedureRequest(utilities.stringToDateRecursive(newDiagnosticOrder)));
                    })
              .then(function(respData) {
                  var diagnosticorder = respData.data;
                  diagnosticId = diagnosticId || diagnosticorder['_id'];
                  if ($scope.category[0].text && $scope.category[0].text !== 'ASYNCHRONOUS_CONSULTATION') {
                      $scope.appointments[0].request = {
                          reference: diagnosticorder['_id']
                      };

                      $scope.appointments[0].participant = [{
                          actor: {
                              reference: userData.get('user')._id,
                              display: userData.get('user').username
                          },
                          type: [{
                              text: userData.get('user').type,
                              coding: [{
                                  code: userData.get('user').role.sub_role
                              }]
                          }],
                          status: 'accepted'
                      }];
                      $scope.appointments[0].reason = [{text : diagnosticorder.code.text}];
                      $scope.appointments[0].status = 'pending';
                      $scope.appointments[0].specialty = [$scope.performerType];
                      if($scope.appointments.comment === 'EMERGENCY_SYNCHRONOUS_CONSULTATION') {
                          $scope.appointments[0].priority = 1;
                      } else {
                          $scope.appointments[0].priority = 2;
                      }
                      $scope.appointments[0].description = $scope.identifier[0].system;
                      $scope.appointments[0].created = new Date();
                      $scope.appointments[0].comment = $scope.category[0].text;
                      $rootScope.waitingVideoCall = true;
                      $rootScope.windowsVideoCall = true;
                      $rootScope.cancelVideoCall = true;
                      $rootScope.roomAvailable = false;
                      return $q(function(resolve) {
                          if ($scope.appointments[0]['_id']) {
                              var appointmentId = $scope.appointments[0]['_id'] || '';
                              return resolve(appointmentService.putAppointmentById(appointmentId, utilities.stringToDateRecursive($scope.appointments[0])));
                          }
                          return resolve(appointmentService.postAppointment(utilities.stringToDateRecursive($scope.appointments[0])));
                      });
                  }
                  return true;
              }).then(function() {
                  Object.keys($scope.entry).forEach(function(key) {
                      var value = '-';
                      var code = '-';
                      if ($scope.entry[key].value) {
                          value = $scope.entry[key].value.toString();
                      }
                      if ($scope.entry[key].code) {
                          code = $scope.entry[key].code.toString();
                      }
                      $scope.newEntry = {
                          flag: {
                              text: $scope.entry[key].text,
                              coding: [{
                                  'system': value || '-',
                                  'display': key || '-',
                                  'version': $scope.entry[key].version || '-',
                                  'code': code || '-'
                              }]
                          }
                      };
                      if ($scope.newEntry.flag.text === 'physicalExam') {
                          $scope.listPhysicalExam.entry.push($scope.newEntry);
                      } else {
                          $scope.listBackground.entry.push($scope.newEntry);
                      }
                  });
                  $scope.listPhysicalExam.subject.push($scope.subject);
                  $scope.listPhysicalExam.source.reference = diagnosticId;
                  $scope.listPhysicalExam.source.display = newDiagnosticOrder.identifier[0].system;
                  $scope.listPhysicalExam.code.text = 'physicalExam';
                  var myModalId = $document.find('#modal10');
                  myModalId.modal('open');
                  $rootScope.enable_exit = true;
                  listService.postList($scope.listPhysicalExam).then(function(postListResp) {
                      $log.info(postListResp);
                  }).catch($log.error);

                  $scope.listBackground.subject.push($scope.subject);
                  $scope.listBackground.code.text = 'background';
                  if (!$scope.listToPut) {
                      listService.postList($scope.listBackground).then(function(postListResp) {
                          $log.info(postListResp);
                      }).catch($log.error);
                  } else {
                      listService.putList($scope.listToPut, $scope.listBackground).then(function(postListResp) {
                          $log.info(postListResp);
                      }).catch($log.error);
                  }
              }).catch(function(err) {
                  $log.error(err);
              });
                }
                $scope.msg = true;
            } else {
                $scope.error_msg = $translate.instant('ORGANIZATION_IS_REQUIRED');
            }
            return 1;
        };

        $scope.sendNote = function() {

            $scope.currentDate = new Date();

            $scope.note.push({
                text: $scope.noteinfo.currentNote,
                authorString: $scope.username,
                authorReference: {
                    reference: userData.get('user')['_id'],
                    display: $scope.username
                }
            });
            $scope.noteinfo.currentNote = '';
            var procedureRequestOnlyNotes = {
                note: $scope.note
            };
            if ($state.params.id) {
                procedureRequestService.putProcedureRequestById($state.params.id, procedureRequestOnlyNotes);
            }
            $scope.unsaved_notes = false;
        };

        $scope.cancelDiagnosticOrder = function() {
            $state.go('procedure_request_abm');
        };

        $scope.searchPatient = function(patient) {
            if(patient.dni.length >= 3) {
                patientsService.searchPatient(patient.dni, 6).then(function(resp) {
                    $scope.thereAreMorePatients = resp.data.length > 5;
                    $scope.patients = resp.data.map(function(item) {
                        var now = moment(new Date());
                        item.birthDate = moment(item.birthDate);
                        var age = now.diff(item.birthDate, 'years');
                        return {
                            name: item.name[0].text,
                            identifier: item.identifier,
                            id: item._id,
                            _id: item._id,
                            gender: item.gender,
                            age: age
                        };
                    });
                    $scope.patient = {
                        name: '',
                        id: ''
                    };
                    $scope.searched = true;
                }).catch(function() {
                    $scope.loading = false;
                });
            }
        };

        $scope.cancelSearch = function() {
            delete $scope.patients;
            $scope.searched = false;
            $scope.identifier[0].value = '';
        };

        function stringToBoolean(stringToParse) {
            if (stringToParse === 'true') {
                return true;
            }
            return stringToParse;
        }

        function formatEntry(entry) {
            var value = stringToBoolean(entry.flag.coding[0].system);
            return {
                text: entry.flag.text,
                value: value,
                version: entry.flag.coding[0].version,
                code: parseInt(entry.flag.coding[0].code)
            };
        }

        $scope.selectPatient = function(patient) {
            $scope.loading = true;
            $scope.currentPatient = patient.patient;
            $scope.subject.reference = patient.patient.id;
            $scope.identifier[0].value = $scope.currentPatient.identifier[0].value;
            $scope.subject.display = patient.patient.name;
            $scope.subject.age = patient.patient.age;

            listService.getList($scope.subject.reference)
              .then(function(resp) {
                  if (resp.data.length > 0) {
                      $scope.listToPut = resp.data[0]._id;
                      var entry = resp.data[0].entry;
                      Object.keys(entry).forEach(function(key) {
                          var index = entry[key].flag.coding[0].display;
                          var type = entry[key].flag.text;
                          if ($scope[type].indexOf(index) === -1) {
                              $scope[type].push(index);
                          }
                          $scope.entry[index] = formatEntry(entry[key]);
                      });
                  }
                  $scope.loading = false;
              }).catch(function(resp) {
                  $log.error(resp);
              });
        };

        $scope.selectAttachment = function(attachment) {
            $scope.currentAttachment = attachment;
            if ($scope.currentAttachment.title.indexOf('dcm') === -1 && !$scope.editing) {
                $scope.notIsDicom = true;
                $window.open($scope.currentAttachment.url);
            } else if ($scope.editing) {
                $scope.notIsDicom = true;
            }
        };

        $scope.observationDetail = function(observation) {
            if($scope.currentObservation._id === observation._id) {
                $scope.currentObservation = {};
            }else{
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
                $scope.notIsDicom = $scope.currentObservation.attachment[0].title.indexOf('dcm') === -1;
                if ($scope.notIsDicom === true) {
                    $scope.selectAttachment($scope.currentObservation.attachment[0]);
                }
            }
        };
        $scope.removeObservation = function(observation) {
            $scope.currentObservation = {};
            var observationIndex = $scope.observations.indexOf(observation);
            $scope.observations.splice(observationIndex, 1);
            $scope.diagnosticOrder.supportingInfo.splice(observationIndex, 1);
        };
        $scope.removePatient = function() {
            $scope.subject = {};
            $scope.currentObservation = {};
            $scope.observationAttached = {};
            $scope.currentAttachment = {};
            $scope.currentPatient = {};
        };

        $scope.enableSaveButton = function() {
            if(typeof $scope.performerType.text !== 'undefined') {
                return $scope.subject.reference && $scope.identifier[0].system && $scope.category[0].text && $scope.performer.reference && $scope.performerType.text;
            }
            return false;
        };
        $scope.chevronOptions = ['generalLi', 'solicitudLi', 'examen_fisicoLi', 'estudiosLi', 'antecedentesLi', 'notasLi'];

        $scope.initPosition = 0;

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
    });
