'use strict';
angular.module('adistalApp')
    .controller('simpleDiagnosticOrderCtrl', function($scope, $http, $stateParams,
        config, $state, utilities, $log, userData, organizationsService, $window,
        observationService, patientsService, $q, $translate, moment, diagnosticOrderService) {
        var diagnosticOrderId = $stateParams.id;
        $scope.noteError = false;
        $scope.exitAttachmentMsg = $translate.instant('EXIT_STUDY_UPLOAD');
        $scope.saveAttachmentMsg = $translate.instant('SAVE_STUDY');
        $scope.placeHolderNote = $translate.instant('WRITE_YOUR_COMENT_HERE');
        $scope.sendStr = $translate.instant('SEND');
        $scope.commentStr = $translate.instant('COMMENT');
        $scope.addStr = $translate.instant('ADD');
        $scope._id = diagnosticOrderId;
        $scope.currentObservation = {};
        $scope.observationAttached = {};
        $scope.diagnosticOrder = {
            '_id': diagnosticOrderId,
            'identifier': [{
                type: {
                    coding: [{}]
                }
            }],
            event: [{
                description: {
                    coding: [{}]
                },
                actor: {}
            }],
            item: [{
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
            }],
            note: [],
            status: 'requested',
            priority: '',
            managingOrganization: {},
            subject: {},
            orderer: {},
            encounter: {},
            supportingInformation: [{}],
            specimen: [{}],
            type: {
                coding: [{}]
            },
            reason: {
                coding: [{}]
            },
            assignTo: []
        };
        $scope.attachment = [];
        $scope.noteinfo = {};
        $scope.appointments = [{}];
        $scope.appointmentDate = '';
        $scope.observations = [];
        $scope.modalStatus = {
            open: false
        };
        var currentDiagnosticId = null;
        var role = null;
        if (userData.get('user') !== null &&
            typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
            role = userData.get('user').role;
            $http.get(config.api_url + '/api/practitioners/' + role.practitioner)
                .then(function(resp) {
                    $scope.organizations = resp.data.practitionerRole;
                });
        }

        organizationsService.getAllOrganizations().then(function(orgResp) {
            $scope.organizationList = orgResp.data;
        }).catch($log.error);

        if (typeof $stateParams.patient_id !== 'undefined' && $stateParams.patient_id !== '') {
            $http.get(config.api_url + '/api/patients/' + $stateParams.patient_id)
                .then(function(resp) {
                    $scope.diagnosticOrder.subject.reference = resp.data._id;
                    $scope.diagnosticOrder.subject.display = resp.data.name[0].text;
                    observationService.getPatientObservation(resp.data._id)
                        .then(function(observationResp) {
                            $scope.observations = observationResp.data;
                        }).catch($log.error);
                });
        }

        function enablePatientInfo(reference) {
            if ((userData.get('user').type === 'Practitioner' && userData.get('user')._id === reference) || userData.get('user').type === 'Node Administrator') {
                return true;
            }
            return false;
        }

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            currentDiagnosticId = $stateParams.id;
            var component = {};
            diagnosticOrderService.getDiagnosticOrder(currentDiagnosticId)
                .then(function(resp) {
                    resp.data.createdAt = moment(resp.data.createdAt).format('DD/ MM/ YYYY');
                    resp.data.updatedAt = moment(resp.data.updatedAt).format('DD/ MM/ YYYY');
                    Object.keys(resp.data).forEach(function(key) {
                        $scope.diagnosticOrder[key] = resp.data[key];
                    });
                    $scope.diagnosticOrder.type_text = $translate.instant($scope.diagnosticOrder.type.text);

                    if (enablePatientInfo(resp.data.orderer.reference)) {
                        $scope.subjectEnable = true;
                        if ($scope.diagnosticOrder.subject.reference) {
                            patientsService.getPatientById($scope.diagnosticOrder.subject.reference).then(function(userResp) {
                                $scope.currentPatient = userResp.data;
                                if (userResp.data.name.length && userResp.data.name[0].text) {
                                    $scope.diagnosticOrder.subject.display = userResp.data.name[0].text;
                                }
                            }).catch($log.error);
                        }
                    }
                    $scope.attachedObservations = [];
                    if ($scope.diagnosticOrder.supportingInformation.length > 0 && typeof $scope.diagnosticOrder.supportingInformation[0].reference !== 'undefined') {
                        var attachedObservations = $scope.diagnosticOrder.supportingInformation.map(function(infoItem) {
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

                    if (typeof $scope.diagnosticOrder.managingOrganization.reference !== 'undefined') {
                        organizationsService.getOrganizationById($scope.diagnosticOrder.managingOrganization.reference)
                            .then(function(response) {
                                $log.info('currentOrganization: ', response.data);
                                $scope.currentOrganization = response.data;
                            }).catch($log.error);
                    }

                    $http.get(config.api_url + '/api/diagnosticreports/?conditions={"request.reference":"' + currentDiagnosticId + '"}')
                        .then(function(reportsResp) {
                            $scope.reports = reportsResp.data;
                        }).catch($log.error);

                    $http.get(config.api_url + '/api/appointments?conditions={"request.reference":"' + currentDiagnosticId + '"}')
                        .then(function(appointmentResp) {
                            $scope.appointments = appointmentResp.data.length && appointmentResp.data || [{}];
                        }).catch($log.error);
                }).catch($log.error);
        }

        $scope.saveNewStudy = function saveNewStudy() {
            if (typeof $scope._id === 'undefined' || !$scope.currentObservation._id) {
                if ($scope.attachment && $scope.attachment.length) {
                    component = $scope.attachment.map(function(item) {
                        return {
                            valueAttachment: item
                        };
                    });
                    observationService.postObservation({
                        valueString: $scope.currentObservation.studyName,
                        component: component,
                        subject: $scope.diagnosticOrder.subject
                    }).then(function(observationResp) {
                        $scope.diagnosticOrder.supportingInformation.push({
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
                $scope.datos.subject = $scope.diagnosticOrder.subject;
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

        $scope.saveDiagnosticOrder = function() {
            if ($scope.noteinfo.currentNote) {
                $scope.noteError = true;
                return;
            }

            var method = 'post';
            var diagnosticId = '';

            if (typeof $scope.diagnosticOrder['_id'] !== 'undefined' && $scope.diagnosticOrder['_id'] !== '') {
                method = 'put';
                diagnosticId = $stateParams.id;
                $log.info('update D.O.: ', $scope.diagnosticOrder);
            }
            $scope.diagnosticOrder.supportingInformation = [];
            $scope.diagnosticOrder.supportingInformation = $scope.observations.map(function(observation) {
                return {
                    reference: observation._id
                };
            });
            var cleanData = utilities.stringToDateRecursive($scope.diagnosticOrder);
            if (!cleanData.supportingInformation || cleanData.supportingInformation.length < 1) {
                cleanData.supportingInformation = [];
            }

            $http[method](config.api_url + '/api/diagnosticorders/' + diagnosticId, cleanData)
                .then(function(respData) {
                    var diagnosticorder = respData.data;
                    diagnosticId = diagnosticId || $scope.diagnosticOrder._id;

                    if ($scope.diagnosticOrder.type.text && $scope.diagnosticOrder.type.text !== 'ASYNCHRONOUS_CONSULTATION') {
                        $log.info('DiagnosticType: ', $scope.diagnosticOrder.type.text);
                        $scope.appointments[0].basedOn = {
                            reference: diagnosticorder._id
                        };
                        $scope.appointments[0].serviceCategory = diagnosticorder.type;
                        $scope.appointments[0].reason = diagnosticorder.reason;
                        $log.info('appointmentData', $scope.appointments);
                        var appointmentMethod = $scope.appointments[0]._id && 'put' || 'post';
                        var appointmentId = $scope.appointments[0]._id || '';
                        $http[appointmentMethod](config.api_url + '/api/appointments/' + appointmentId, utilities.stringToDateRecursive($scope.appointments[0]))
                            .then(function() {
                                $state.go('diagnostic_order_abm');

                            }).catch($log.error);
                    } else {
                        $state.go('diagnostic_order_abm');
                    }


                }).catch(function(err) {
                    $log.error(err);
                });

        };

        $scope.sendNote = function() {
            $log.info('noteinfo: ', $scope.noteinfo.currentNote, $scope.username);
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
        };

        $scope.cancelDiagnosticOrder = function() {
            $state.go('diagnostic_order_abm');
        };

        $scope.selectOrganization = function() {
            var parentOrganizationId = $scope.diagnosticOrder.managingOrganization.reference;
            $scope.diagnosticOrder.organizationList.forEach(function(organization) {
                if (organization._id === parentOrganizationId) {
                    $scope.diagnosticOrder.managingOrganization.reference = parentOrganizationId;
                    $scope.diagnosticOrder.managingOrganization.display = organization.name;
                }

            });
        };

        $scope.removeObservation = function(observation) {
            $log.info('remove observation: ', observation);
            var observationIndex = $scope.observations.indexOf(observation);
            $scope.observations.splice(observationIndex, 1);
            $scope.observationAttached[observation._id] = false;
            $scope.diagnosticOrder.supportingInformation.splice(observationIndex, 1);
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
            if ($scope.currentAttachment.title.indexOf('dcm') === -1 && $scope.currentAttachment.title.indexOf('png') === -1 && !$scope.editing) {
                $scope.notIsDicom = true;
                $window.open($scope.currentAttachment.url);
            } else if ($scope.editing) {
                $scope.notIsDicom = true;
            }
        };
        $scope.observationDetail = function(observation) {
            $scope.editing = false;
            $scope.notIsDicom = false;
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
        };

    })
    .controller('printDiagnosticOrderController', function($scope, $http, $stateParams,
        config, $state, utilities, $log, userData, organizationsService) {
        var diagnosticOrderId = $stateParams.id;
        $scope._id = diagnosticOrderId;

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
        $scope.borrador = '';
        $scope.status = 'requested';
        $scope.priority = '';
        $scope.managingOrganization = {};
        $scope.subject = {};
        $scope.orderer = {};
        $scope.encounter = {};
        $scope.supportingInformation = [{}];
        $scope.specimen = [{}];

        $scope.type = {
            coding: [{}]
        };
        $scope.reason = [{
            coding: [{}]
        }];
        $scope.noteinfo = {};
        $scope.attachment = [];
        $scope.properties = ['Author', 'Text', 'Date'];
        $scope.noteList = [{}];

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

        if (typeof $stateParams.patient_id !== 'undefined' && $stateParams.patient_id !== '') {
            $http.get(config.api_url + '/api/patients/' + $stateParams.patient_id)
                .then(function(resp) {
                    $scope.subject.reference = resp.data._id;
                    $scope.subject.display = resp.data.name[0].text;
                });
        }

        var notesPerPage = 8;
        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $http.get(config.api_url + '/api/diagnosticorders/' + $stateParams.id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        $scope[key] = resp.data[key];
                    });
                    $scope.note = $scope.note.filter(function(note) {
                        return note.authorString && note.text;
                    });
                    $scope.noteList = $scope.note.map(function(note) {
                        var formatDate = new Date(note.time.type);
                        return {
                            author: note.authorString,
                            text: note.text,
                            date: formatDate.toDateString()
                        };
                    });
                    if (typeof $scope.supportingInformation[0].reference !== 'undefined') {
                        $http.get(config.api_url + '/api/observations/' + $scope.supportingInformation[0].reference)
                            .then(function(respObservations) {
                                var observation = respObservations.data;
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
                    organizationsService.getOrganizationById($scope.managingOrganization.reference)
                        .then(function(response) {
                            $scope.currentOrganization = response.data;
                        }).catch($log.error);
                    $http.get(config.api_url + '/api/diagnosticreports/?conditions={"request.reference":"' + $stateParams.id + '"}')
                        .then(function(response) {
                            $scope.reports = response.data;
                        });
                    $scope.pages = Math.ceil($scope.note.length / notesPerPage);
                }).catch(function(err) {
                    $log.error(err);
                });
        }
        $scope.selectAttachment = function(attachment) {
            $log.info('selectAttachment: ', attachment);
            $scope.currentAttachment = [attachment];
            $scope.loadAttachment(attachment);
        };
    })
    .controller('diagnosticOrderTypeSelectCtrl', function($scope, $http, $stateParams,
        config, $state, userData, $log, $translate) {
        $scope.diagnosticTypeList = [{
            title: $translate.instant('ASYNCHRONOUS_CONSULTATION'),
            description: $translate.instant('NEW_ASYNCHRONOUS_CONSULTATION'),
            type: 'ASYNCHRONOUS_CONSULTATION',
            priority: 'ROUTINE',
            property: '',
            code: ''
        }];
        $log.info('diagnosticTypeList: ', $scope.diagnosticTypeList);

        $scope.newDiagnosticOrder = function(diagnosticInfo) {
            $log.info('new diagnostic order: ', diagnosticInfo);
            $state.go('diagnosticOrderByType.new', {
                type: {
                    text: diagnosticInfo.type
                },
                priority: diagnosticInfo.priority
            });
        };
    });
