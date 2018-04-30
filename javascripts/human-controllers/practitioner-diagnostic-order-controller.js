'use strict';
angular.module('adistalApp')
    .controller('newDiagnosticOrderCtrl', function($scope, $http, config,
        $state, utilities, $log, userData, organizationsService, patientsService,
        diagnosticOrderService, observationService, diagnosticReportService, $translate,
        practitionerService) {
        $scope.currentObservation = {};
        $scope.observationAttached = {};
        $scope.currentPatient = {};
        $scope.placeHolderNote = $translate.instant('WRITE_YOUR_COMENT') + $translate.instant('ENTER');
        var diagnosticOrderId = $state.params.id;
        $scope.exitAttachmentMsg = $translate.instant('EXIT_STUDY_UPLOAD');
        $scope.saveAttachmentMsg = $translate.instant('SAVE_STUDY');
        $scope.noPatientMessage = $translate.instant('YOU_MUST_SELECT_A_PATIENT_BEFORE_UPLOADING_A_STUDY');
        $scope.sendStr = $translate.instant('SEND');
        $scope.commentStr = $translate.instant('COMMENT');
        $scope.addStr = $translate.instant('ADD');
        $scope.titleAssignTo = $translate.instant('ASSIGN');
        $scope['_id'] = diagnosticOrderId;
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

        $scope.note = [];
        $scope.status = 'requested';
        $scope.subject = {};
        $scope.orderer = {
            display: userData.get('user').username,
            reference: userData.get('user')._id
        };
        $scope.encounter = {};
        $scope.supportingInformation = [];
        $scope.specimen = [{}];
        $scope.managingOrganization = userData.get('currentOrganization') || {};
        $scope.reason = [{
            coding: [{}]
        }];
        $scope.assignTo = [];

        $scope.attachment = [];
        $scope.noteinfo = {};
        $scope.appointments = [{}];
        $scope.appointmentDate = '';
        $scope.observations = [];
        $scope.modalStatus = {
            open: false
        };

        $log.info('first scope-open: ', $scope.open);
        var currentDiagnosticId = null;
        var role = null;

        function loadStateParamsData() {
            if ($state.params.type && $state.params.priority) {
                $scope.priority = $state.params.priority;
                $scope.type = $state.params.type;
                if (!$scope.type.coding) {
                    $scope.type.coding = [{}];
                }
            } else {
                $state.go('diagnosticOrderByType', $state.params);
            }
        }

        function loadReports(diagnosticId) {
            diagnosticReportService.getByRequest(diagnosticId)
                .then(function(reportsResp) {
                    $scope.reports = reportsResp.data;
                }).catch($log.error);
        }

        function loadAppointments(diagnosticId) {
            $http.get(config.api_url + '/api/appointments?conditions={"request.reference":"' + diagnosticId + '"}')
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

            organizationsService.getAllOrganizations().then(function(orgResp) {
                $scope.organizationList = orgResp.data;
            }).catch($log.error);
        }

        function loadPatientData() {
            if (!$state.params.patient_id) {
                return;
            }
            patientsService.getPatientById($state.params.patient_id)
                .then(function(resp) {
                    $scope.currentPatient = resp.data;
                    $scope.identifier[0].value = $scope.currentPatient.identifier[0].value;
                    $scope.subject.reference = resp.data['_id'];
                    $scope.subject.display = resp.data.name[0].text;
                    $scope.subject.age = resp.data.name[0].use;
                });
        }

        loadStateParamsData();

        updateOrganizations();

        loadPatientData();

        if (typeof $state.params.id !== 'undefined' && $state.params.id !== '') {
            currentDiagnosticId = $state.params.id;
            $log.info('currentDiagnosticId: ', currentDiagnosticId);
            diagnosticOrderService.getDiagnosticOrder(currentDiagnosticId).then(function(resp) {
                Object.keys(resp.data).forEach(function(key) {
                    $scope[key] = resp.data[key];
                });

                if (typeof $scope.supportingInformation[0].reference !== 'undefined') {
                    observationService.getObservation($scope.supportingInformation[0].reference)
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
            $log.log('uploadFiles', $scope.attachment, ' length:', $scope.attachment.length);
            if ($scope.attachment && $scope.attachment.length) {
                var component = $scope.attachment.map(function(item) {
                    return {
                        valueAttachment: item
                    };
                });
                $log.info('uploadAttachments component:', component);
                observationService.postObservation({
                    valueString: $scope.studyName,
                    component: component,
                    subject: $scope.subject
                }).then(function(observationResp) {
                    $scope.supportingInformation.push({
                        reference: observationResp.data._id
                    });
                    $log.info('supportingInformation post saveNewStudy: ', $scope.supportingInformation);
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

        $scope.saveDiagnosticOrder = function() {
            $scope.msg = false;
            if (typeof $scope.identifier[0].system !== 'undefined' && $scope.identifier[0].system !== '' && !$scope.noteinfo.currentNote) {
                var newDiagnosticOrder = {
                    identifier: $scope.identifier,
                    event: $scope.event,
                    item: $scope.item,
                    note: $scope.note,
                    managingOrganization: $scope.managingOrganization,
                    subject: $scope.subject,
                    orderer: $scope.orderer,
                    encounter: $scope.encounter,
                    specimen: $scope.specimen,
                    supportingInformation: $scope.supportingInformation,
                    type: $scope.type,
                    reason: $scope.reason,
                    status: $scope.status,
                    priority: $scope.priority,
                    assignTo: $scope.assignTo
                };

                var method = 'post';
                var diagnosticId = '';
                if (typeof $state.params.id !== 'undefined' && $state.params.id !== '') {
                    method = 'put';
                    diagnosticId = $state.params.id;
                    $log.info('update D.O.: ', newDiagnosticOrder);
                }

                $log.info('currentDiagnosticId: ', currentDiagnosticId);
                $log.info('diagnosticId: ', diagnosticId);

                $http[method](config.api_url + '/api/diagnosticorders/' +
                        diagnosticId, utilities.stringToDateRecursive(newDiagnosticOrder))
                    .then(function(respData) {
                        var diagnosticorder = respData.data;
                        diagnosticId = diagnosticId || diagnosticorder['_id'];
                        if ($scope.type.text && $scope.type.text !== 'ASYNCHRONOUS_CONSULTATION') {
                            $scope.appointments[0].request = {
                                reference: diagnosticorder['_id']
                            };
                            $scope.appointments[0].type = diagnosticorder.type;
                            $scope.appointments[0].reason = diagnosticorder.reason;
                            $log.info('appointmentData', $scope.appointments);
                            var appointmentMethod = $scope.appointments[0]['_id'] && 'put' || 'post';
                            var appointmentId = $scope.appointments[0]['_id'] || '';
                            $http[appointmentMethod](config.api_url + '/api/appointments/' +
                                    appointmentId, utilities.stringToDateRecursive($scope.appointments[0]))
                                .then(function() {
                                    $state.go('diagnostic_order_abm');
                                }).catch($log.error);
                        } else {
                            $state.go('diagnostic_order_abm');
                        }
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else if ($scope.noteinfo.currentNote) {
                $scope.noteError = true;
                return;
            } else {
                $scope.msg = true;
                return;
            }
        };

        $scope.sendNote = function() {
            $log.info('noteinfo: ', $scope.noteinfo.currentNote, $scope.username);
            $scope.note.push({
                text: $scope.noteinfo.currentNote,
                authorString: $scope.username,
                authorReference: {
                    reference: userData.get('user')['_id'],
                    display: $scope.username
                }
            });
            $scope.noteinfo.currentNote = '';
            $scope.noteError = false;
        };

        $scope.cancelDiagnosticOrder = function() {
            $state.go('diagnostic_order_abm');
        };

        $scope.selectAttachment = function(attachment) {
            $scope.loadAttachment(attachment);
        };

        $scope.searchPatient = function(patient) {
            $scope.loading = true;
            patientsService.searchPatient(patient.dni).then(function(resp) {
                $log.info(resp.data);
                $scope.patients = resp.data.map(function(item) {
                    return {
                        name: item.name[0].text,
                        identifier: item.identifier,
                        id: item._id,
                        gender: item.gender,
                        weight: item.name[0].use
                    };
                });
                $log.warn('$scope.patients', $scope.patients);
                $scope.patient = {
                    name: '',
                    id: ''
                };
                $scope.loading = false;

            }).catch(function() {
                $scope.loading = false;
            });

        };

        $scope.selectPatient = function(patient) {
            $scope.currentPatient = patient.patient;
            $log.info('patient: ', patient);
            $scope.subject.reference = patient.patient.id;
            $scope.identifier[0].value = $scope.currentPatient.identifier[0].value;
            $scope.subject.display = patient.patient.name;
            $scope.subject.age = patient.patient.weight;
        };

        $scope.selectAttachment = function(attachment) {
            $scope.currentAttachment = attachment;
            $log.info('currentAttachment: ', $scope.currentAttachment);
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
            $log.info('currentObservation: ', $scope.currentObservation);
        };
        $scope.removeObservation = function(observation) {
            $log.info('remove observation: ', observation);
            var observationIndex = $scope.observations.indexOf(observation);
            $scope.observations.splice(observationIndex, 1);
            $scope.diagnosticOrder.supportingInformation.splice(observationIndex, 1);
        };
        $scope.removePatient = function() {
            $scope.subject = {};
            $scope.currentObservation = {};
            $scope.observationAttached = {};
            $scope.currentAttachment = {};
            $scope.currentPatient = {};

            $log.info($scope.subject);
        };
    });
