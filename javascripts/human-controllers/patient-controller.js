'use strict';
angular.module('adistalApp')
    .controller('simplePatientCtrl', function($scope, $http,
        $stateParams, config, $state, utilities,
        $log, userData, observationService, $translate, patientsService, $rootScope, moment) {
        $rootScope.title = $translate.instant('VIEW_PATIENT');
        $rootScope.description = '';
        var patientId = $stateParams.id;
        $scope.missing_fields = false;
        $scope.exitAttachmentMsg = $translate.instant('EXIT_STUDY_UPLOAD');
        $scope.saveAttachmentMsg = $translate.instant('SAVE_STUDY');
        $scope.patient = {
            _id: patientId,
            deceasedDateTime: '',
            gender: 'O',
            multipleBirthInteger: '',
            birthDate: '',
            deceasedBoolean: false,
            multipleBirthBoolean: true,
            managingOrganization: {},
            maritalStatus: {
                coding: [{}]
            },
            careProvider: [{}],
            accordance: {
                coding: [{}]
            },
            telecom: [{
                period: {}
            }],
            communication: [{
                language: {
                    coding: [{}]
                }
            }],
            contact: [{
                name: {},
                telecom: [{
                    period: {}
                }],
                period: {},
                purpose: {
                    coding: [{}]
                },
                address: [{
                    period: {}
                }],
                organization: {}
            }],
            link: [{
                other: {}
            }],
            animal: {
                species: {
                    coding: [{}]
                },
                breed: {
                    coding: [{}]
                },
                genderStatus: {
                    coding: [{}]
                }
            },
            address: [{
                line: [],
                period: {}
            }],
            identifier: [{
                type: {
                    coding: [{}]
                },
                assigner: {},
                period: {}
            }],
            photo: [{}],
            name: [{
                period: {},
                suffix: [],
                family: [],
                given: [],
                prefix: []
            }]
        };
        $scope.currentObservation = {};
        $scope.attachment = [];
        $scope.observations = [];
        $scope.currentAttachment = {
            test: false
        };

        var max = new Date(Date.now());
        $scope.maxDate = max.toDateString();
        if (typeof patientId !== 'undefined' && patientId !== '') {
            $http.get(config.api_url + '/api/patients/' + patientId)
                .then(function(resp) {
                    var addressData = resp.data.address[0];
                    if (addressData.line.length && Object.keys(addressData.line[0]).length) {
                        $scope.voidLength = 'false';
                    }
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope.patient[key] = resp.data[key];
                        }
                    });
                    if (typeof $scope.patient.birthDate !== 'undefined') {
                        $scope.patient.birthDate = new Date($scope.patient.birthDate);
                        $scope.patient.birthDateFormat = moment($scope.patient.birthDate).format('DD/ MM/ YYYY');
                    }
                }).catch(function(err) {
                    $log.error(err);
                });
        }

        function validationPatientBirthDateGender() {
            return ($scope.patient.gender);
        }

        function validationPatientName() {
            if($scope.patient.name.length > 0) {
                return ($scope.patient.name[0].text);
            }
            return false;
        }
        function validationPatientIdentifier() {
            if($scope.patient.identifier.length > 0) {
                return ($scope.patient.identifier[0].value);
            }
            return false;
        }

        $scope.savePatient = function(isNewProcedure) {

            if(!validationPatientBirthDateGender()) {
                $scope.missing_fields = true;
                return;
            }

            if(!validationPatientIdentifier()) {
                $scope.missing_fields = true;
                return;
            }

            if(!validationPatientName()) {
                $scope.missing_fields = true;
                return;
            }

            if ($stateParams.id) {

                patientsService.putPatientByIdDateRecursive($stateParams.id, utilities.stringToDateRecursive($scope.patient))
                .then(function() {
                    if(isNewProcedure) {
                        $scope.newDiagnosticOrder($stateParams.id);
                    }else {
                        $state.go('patient_abm');
                    }
                }).catch(function(err) {
                    $log.error(err);
                });
            } else {
                patientsService.postPatient(utilities.stringToDateRecursive($scope.patient))
                .then(function(response) {
                    $scope.patient = response.data;
                    if(isNewProcedure) {
                        $scope.newDiagnosticOrder($scope.patient._id);
                    }else {
                        $state.go('patient_abm');
                    }
                }).catch(function(err) {
                    $log.error(err);
                });
            }
        };

        $scope.newDiagnosticOrder = function(id) {
            if (userData.get('user').type === 'Practitioner') {
                $state.go('procedure_new', {
                    patient_id: id
                });
            } else {
                $state.go('patient_order', {
                    patient_id: id
                });
            }
        };

        $scope.getGender = function getGender(genderStr) {
            if (genderStr === 'M') {
                return $translate.instant('MALE');
            } else if (genderStr === 'F') {
                return $translate.instant('FEMALE');
            } else if (genderStr === 'O') {
                return $translate.instant('OTHER');
            }
            return '';
        };

        $scope.blurAge = function() {
            if($scope.patient.birthDate) {
                var hoy = new Date();
                var fecha = new Date($scope.patient.birthDate);
                var ed = parseInt((hoy - fecha) / 365 / 24 / 60 / 60 / 1000);
                $scope.patient.name[0].use = ed.toString();
            }
        };

    });
