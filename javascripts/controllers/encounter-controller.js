'use strict';
angular.module('adistalApp')
    .controller('encounterListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/encounters')
            .then(function(resp) {
                $scope.encounter_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteEncounter = function(encounterIndex) {
            var id = $scope.encounter_list[encounterIndex]._id;
            $http.delete(config.api_url + '/api/encounters/' + id);
            $scope.encounter_list.splice(encounterIndex, 1);
        };
    })
    .controller('editEncounterCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];

        $scope.statusHistory = [{
            period: {}
        }];

        $scope.patient = {};
        $scope.status = '';
        $scope['class'] = '';

        $scope.hospitalization = [{
            'origin': {},
            'admitSource': {
                coding: [{}]
            },
            'admittingDiagnosis': [{}],
            'specialArrangement': [{
                coding: [{}]
            }],
            'dietPreference': [{
                coding: [{}]
            }],
            'reAdmission': {
                coding: [{}]
            },
            'preAdmissionIdentifier': {
                type: {
                    coding: [{}]
                },
                assigner: {},
                period: {}
            },
            'specialCourtesy': [{
                coding: [{}]
            }],
            'destination': {},
            'dischargeDisposition': {},
            'dischargeDiagnosis': [{}]
        }];

        $scope.serviceProvider = {};

        $scope.participant = [{
            'individual': {},
            'type': [{
                coding: [{}]
            }],
            'period': {}
        }];

        $scope.period = {};

        $scope.priority = {
            coding: [{}]
        };
        $scope.length = {};
        $scope.indication = [{}];
        $scope.location = [{
            'location': {},
            'period': {}
        }];
        $scope.reason = [{
            coding: [{}]
        }];
        $scope.appointment = {};
        $scope.episodeOfCare = [{}];
        $scope.type = [{
            coding: [{}]
        }];
        $scope.partOf = {};
        $scope.incomingReferral = [{}];

        if (typeof $stateParams.encounter_id !== 'undefined' && $stateParams.encounter_id !== '') {
            $http.get(config.api_url + '/api/encounters/' + $stateParams.encounter_id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                    });
                }).catch(function(err) {
                    $log.error(err);
                });
        }
        $scope.addLocation = function() {
            $scope.location.push({
                'location': {},
                'period': {}
            });
        };

        $scope.deleteLocation = function(index) {
            if ($scope.location.length > 1) {
                $scope.location.splice(index, 1);
            }
        };


        $scope.addParticipant = function() {
            $scope.participant.push({
                'individual': {},
                'type': [{
                    coding: [{}]
                }],
                'period': {}
            });
        };

        $scope.deleteParticipant = function(index) {
            if ($scope.participant.length > 1) {
                $scope.participant.splice(index, 1);
            }
        };

        $scope.addStatusHistory = function() {
            $scope.statusHistory.push({
                period: {}
            });
        };

        $scope.deleteStatusHistory = function(index) {
            if ($scope.statusHistory.length > 1) {
                $scope.statusHistory.splice(index, 1);
            }
        };

        $scope.addHospitalization = function() {
            $scope.hospitalization.push({
                'origin': {},
                'admitSource': {
                    coding: [{}]
                },
                'admittingDiagnosis': [{}],
                'specialArrangement': [{
                    coding: [{}]
                }],
                'dietPreference': [{
                    coding: [{}]
                }],
                'reAdmission': {
                    coding: [{}]
                },
                'preAdmissionIdentifier': {
                    type: {
                        coding: [{}]
                    },
                    assigner: {},
                    period: {}
                },
                'specialCourtesy': [{
                    coding: [{}]
                }],
                'destination': {},
                'dischargeDisposition': {},
                'dischargeDiagnosis': [{}]
            });
        };

        $scope.deleteHospitalization = function(index) {
            if ($scope.hospitalization.length > 1) {
                $scope.hospitalization.splice(index, 1);
            }
        };

        $scope.saveEncounter = function() {
            var newEncounter = {
                identifier: $scope.identifier,
                statusHistory: $scope.statusHistory,
                patient: $scope.patient,
                hospitalization: $scope.hospitalization,
                serviceProvider: $scope.serviceProvider,
                participant: $scope.participant,
                period: $scope.period,
                priority: $scope.priority,
                length: $scope.length,
                indication: $scope.indication,
                location: $scope.location,
                reason: $scope.reason,
                appointment: $scope.appointment,
                episodeOfCare: $scope.episodeOfCare,
                type: $scope.type,
                partOf: $scope.partOf,
                incomingReferral: $scope.incomingReferral,
                status: $scope.status,
                class: $scope['class']
            };

            if (typeof $stateParams.encounter_id !== 'undefined' && $stateParams.encounter_id !== '') {
                $http.put(config.api_url + '/api/encounters/' + $stateParams.encounter_id, utilities.stringToDateRecursive(newEncounter))
                    .then(function() {
                        $state.go('encounter');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/encounters', utilities.stringToDateRecursive(newEncounter))
                    .then(function() {
                        $state.go('encounter');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editEncounterStatusHistory', function($scope, $stateParams) {
        var statusHistoryIndex = $stateParams.status_history_index;
        $scope.title = 'Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent.statusHistory[statusHistoryIndex];
    })
    .controller('editEncounterStatusHistoryPeriod', function($scope, $stateParams) {
        var statusHistoryIndex = $stateParams.status_history_index;
        $scope.period = $scope.$parent.statusHistory[statusHistoryIndex].period;
    })
    .controller('editEncounterPatient', function($scope) {
        $scope.reference = $scope.$parent.patient;
    })


/*****************
 * HOSPITALIZATION
 *****************/

/*

**'origin': ReferenceSchema,
**'admitSource': CodeableConceptSchema,
**'admittingDiagnosis': [ReferenceSchema],
**'specialArrangement': [CodeableConceptSchema],
**'dietPreference': [CodeableConceptSchema],
**'reAdmission': CodeableConceptSchema,
**'preAdmissionIdentifier': IdentifierSchema,
**'specialCourtesy': [CodeableConceptSchema],
**'destination': ReferenceSchema,
**'dischargeDisposition': ReferenceSchema,
**'dischargeDiagnosis': [ReferenceSchema]

*/
.controller('editEncounterHospitalization', function() {})
    .controller('editEncounterHospitalizationOrigin', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.reference = $scope.$parent.hospitalization[hospitalizationIndex].origin;
    })
    .controller('editEncounterHospitalizationAdmitSource', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].admitSource;
    })
    .controller('editEncounterHospitalizationAdmitSourceCoding', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].admitSource.coding[codingIndex];
    })
    .controller('editEncounterHospitalizationAdmittingDiagnosis', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var admittingDiagnosisIndex = $stateParams.index;
        $scope.reference = $scope.$parent.hospitalization[hospitalizationIndex].admittingDiagnosis[admittingDiagnosisIndex];
    })
    .controller('editEncounterHospitalizationSpecialArrangement', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var specialArramgementIndex = $stateParams.codeable_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].specialArrangement[specialArramgementIndex];
    })
    .controller('editEncounterHospitalizationSpecialArrangementCoding', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var specialArramgementIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].specialArrangement[specialArramgementIndex].coding[codingIndex];
    })
    .controller('editEncounterHospitalizationDietPreference', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var dietPreferenceIndex = $stateParams.codeable_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].dietPreference[dietPreferenceIndex];
    })
    .controller('editEncounterHospitalizationDietPreferenceCoding', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var dietPreferenceIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].dietPreference[dietPreferenceIndex].coding[codingIndex];
    })
    .controller('editEncounterHospitalizationReAdmission', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].reAdmission;
    })
    .controller('editEncounterHospitalizationReAdmissionCoding', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].reAdmission.coding[codingIndex];
    })
    .controller('editEncounterHospitalizationPreAdmissionIdentifier', function($scope) {
        $scope.identifier = $scope.$parent.identifier;
    })
    .controller('editEncounterHospitalizationPreAdmissionIdentifierType', function($scope, $state, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].preAdmissionIdentifier.type;
    })
    .controller('editEncounterHospitalizationPreAdmissionIdentifierTypeCoding', function($scope, $state, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].preAdmissionIdentifier.type.coding[codingIndex];
    })
    .controller('editEncounterHospitalizationSpecialCourtesy', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var specialCourtesyIndex = $stateParams.codeable_index;
        $scope.codeableConcept = $scope.$parent.hospitalization[hospitalizationIndex].specialCourtesy[specialCourtesyIndex];
    })
    .controller('editEncounterHospitalizationSpecialCourtesyCoding', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var specialCourtesyIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.hospitalization[hospitalizationIndex].specialCourtesy[specialCourtesyIndex].coding[codingIndex];
    })
    .controller('editEncounterHospitalizationDestination', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.reference = $scope.$parent.hospitalization[hospitalizationIndex].destination;
    })
    .controller('editEncounterHospitalizationDischargeDisposition', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        $scope.reference = $scope.$parent.hospitalization[hospitalizationIndex].dischargeDisposition;
    })
    .controller('editEncounterHospitalizationDischargeDiagnosis', function($scope, $stateParams) {
        var hospitalizationIndex = $stateParams.hospitalization_index;
        var dischargeDiagnosisIndex = $stateParams.index;
        $scope.reference = $scope.$parent.hospitalization[hospitalizationIndex].dischargeDiagnosis[dischargeDiagnosisIndex];
    })
    /********************
     * END HOSPITALIZATION
     ********************/

.controller('editEncounterServiceProvider', function($scope) {
    $scope.reference = $scope.$parent.serviceProvider;
})


/********************
 * PARTICIPANT
 ********************/

/*
'individual': ReferenceSchema,
'type': [CodeableConceptSchema],
'period': PeriodSchema
*/

.controller('editEncounterParticipant', function() {

})
    .controller('editEncounterParticipantIndividual', function($scope, $stateParams) {
        var participantIndex = $stateParams.participant_index;
        $scope.reference = $scope.$parent.participant[participantIndex].individual;
    })

.controller('editEncounterParticipantType', function($scope, $stateParams) {
    var participantIndex = $stateParams.participant_index;
    var typeIndex = $stateParams.codeable_index;
    $scope.codeableConcept = $scope.$parent.participant[participantIndex].type[typeIndex];
})
    .controller('editEncounterParticipantTypeCoding', function($scope, $stateParams) {
        var participantIndex = $stateParams.participant_index;
        var typeIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.participant[participantIndex].type[typeIndex].coding[codingIndex];
    })
    .controller('editEncounterParticipantPeriod', function($scope, $stateParams) {
        var participantIndex = $stateParams.participant_index;
        $scope.period = $scope.$parent.participant[participantIndex].period;
    })

/********************
 * END PARTICIPANT
 ********************/

.controller('editEncounterPeriod', function($scope) {
    $scope.period = $scope.$parent.period;
})
    .controller('editEncounterPriority', function($scope) {
        $scope.codeableConcept = $scope.$parent.priority;
    })
    .controller('editEncounterPriorityCoding', function($scope, $stateParams) {
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.priority.coding[codingIndex];
    })
    .controller('editEncounterLength', function($scope) {
        $scope.quantity = $scope.$parent.length;
    })
    .controller('editEncounterIndication', function($scope, $stateParams) {
        var indicationIndex = $stateParams.index;
        $scope.reference = $scope.$parent.indication[indicationIndex];
    })

/**********
 * LOCATION
 **********/

/*
    'status': String,
    'location': ReferenceSchema,
    'period': PeriodSchema
*/

.controller('editEncounterLocation', function($scope, $stateParams) {
    var locationIndex = $stateParams.location_index;
    $scope.title = 'Status';
    $scope.subtitle = 'Text';
    $scope.model_name = 'status';
    $scope.data = $scope.$parent.location[locationIndex];
})
    .controller('editEncounterLocationLocation', function($scope, $stateParams) {
        var locationIndex = $stateParams.location_index;
        $scope.reference = $scope.$parent.location[locationIndex].location;
    })
    .controller('editEncounterLocationPeriod', function($scope, $stateParams) {
        var locationIndex = $stateParams.location_index;
        $scope.period = $scope.$parent.location[locationIndex].period;
    })

/**********
 * END LOCATION
 **********/

.controller('editEncounterReason', function($scope, $stateParams) {
    var reasonIndex = $stateParams.codeable_index;
    $scope.codeableConcept = $scope.$parent.reason[reasonIndex];
})
    .controller('editEncounterReasonCoding', function($scope, $stateParams) {
        var reasonIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.reason[reasonIndex].coding[codingIndex];
    })
    .controller('editEncounterAppointment', function($scope) {
        $scope.reference = $scope.$parent.appointment;
    })
    .controller('editEncounterEpisodeOfCare', function($scope, $stateParams) {
        var episodeofcareIndex = $stateParams.index;
        $scope.reference = $scope.$parent.episodeOfCare[episodeofcareIndex];
    })
    .controller('editEncounterType', function($scope, $stateParams) {
        var typeIndex = $stateParams.codeable_index;
        $scope.codeableConcept = $scope.$parent.type[typeIndex];
    })
    .controller('editEncounterTypeCoding', function($scope, $stateParams) {
        var typeIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.type[typeIndex].coding[codingIndex];
    })
    .controller('editEncounterPartOf', function($scope) {
        $scope.reference = $scope.$parent.partOf;
    })
    .controller('editEncounterIncomingReferral', function($scope, $stateParams) {
        var incomingreferralIndex = $stateParams.index;
        $scope.reference = $scope.$parent.incomingReferral[incomingreferralIndex];
    })
    .controller('editEncounterStatus', function($scope) {
        $scope.title = 'Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent;
    })
    .controller('editEncounterClass', function($scope) {
        $scope.title = 'Class';
        $scope.subtitle = 'Text';
        $scope.model_name = 'class';
        $scope.data = $scope.$parent;
    });
