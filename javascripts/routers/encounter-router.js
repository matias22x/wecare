'use strict';
angular.module('encounterRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('encounter', {
            url: '/encounter',
            cache: false,
            templateUrl: 'templates/encounter_list.html',
            controller: 'encounterListCtrl'
        })
        .state('encounter.edit', {
            url: '/edit/:encounter_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editEncounterCtrl',
                    templateUrl: 'templates/roles/encounter.html'
                }
            }
        })
        .state('encounter.edit.statushistory', {
            url: '/:status_history_index/statushistory',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterStatusHistory',
                    templateUrl: 'templates/edit_schemas/text.html' // GENERAR status text
                }
            }
        })
        .state('encounter.edit.statushistory.period', {
            url: '/period',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterStatusHistoryPeriod',
                    templateUrl: 'templates/edit_schemas/period.html' // GENERAR status text
                }
            }
        })
        .state('encounter.edit.patient', {
            url: '/patient',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPatient',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.hospitalization', {
            url: '/:hospitalization_index/hospitalization',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalization',
                    templateUrl: 'templates/edit_schemas/text.html' // CHEQUEAR
                }
            }
        })
        .state('encounter.edit.hospitalization.origin', {
            url: '/origin',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationOrigin',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.admitsource', {
            url: '/admitsource',
            cache: false
        })
        .state('encounter.edit.hospitalization.admitsource.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationAdmitSource',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.admitsource.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationAdmitSourceCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.admittingdiagnosis', {
            url: '/:index/admittingdiagnosis',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationAdmittingDiagnosis',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.specialarrangement', {
            url: '/:codeable_index/specialarrangement',
            cache: false
        })
        .state('encounter.edit.hospitalization.specialarrangement.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationSpecialArrangement',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.specialarrangement.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationSpecialArrangementCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.dietpreference', {
            url: '/:codeable_index/dietpreference',
            cache: false
        })
        .state('encounter.edit.hospitalization.dietpreference.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationDietPreference',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.dietpreference.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationDietPreferenceCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.readmission', {
            url: '/readmission',
            cache: false
        })
        .state('encounter.edit.hospitalization.readmission.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationReAdmission',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.readmission.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationReAdmissionCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.preadmissionidentifier', {
            url: '/preadmissionidentifier',
            cache: false
        })
        .state('encounter.edit.hospitalization.preadmissionidentifier.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationPreAdmissionIdentifier',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.preadmissionidentifier.type', {
            url: '/type',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationPreAdmissionIdentifierType',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.preadmissionidentifier.type.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationPreAdmissionIdentifierTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.specialcourtesy', {
            url: '/:codeable_index/specialcourtesy',
            cache: false
        })
        .state('encounter.edit.hospitalization.specialcourtesy.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationSpecialCourtesy',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.specialcourtesy.coding', {
            url: '/:coding_index/coding_index',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationSpecialCourtesyCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.destination', {
            url: '/destination',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationDestination',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.dischargedisposition', {
            url: '/dischargedisposition',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationDischargeDisposition',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.hospitalization.dischargediagnosis', {
            url: '/:index/dischargediagnosis',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterHospitalizationDischargeDiagnosis',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.serviceprovider', {
            url: '/serviceprovider',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterServiceProvider',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.participant', {
            url: '/:participant_index/participant',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterParticipant',
                    templateUrl: 'templates/edit_schemas/text.html' //Chequear
                }
            }
        })
        .state('encounter.edit.participant.individual', {
            url: '/individual',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterParticipantIndividual',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.participant.type', {
            url: '/:codeable_index/type',
            cache: false
        })
        .state('encounter.edit.participant.type.text', {
            url: 'text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterParticipantType',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.participant.type.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterParticipantTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.participant.period', {
            url: '/period',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterParticipantPeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('encounter.edit.period', {
            url: '/period',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('encounter.edit.priority', {
            url: '/priority',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPriority',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.priority.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPriorityCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.priority.text', {
            url: '/text',
            cache: false,
            view: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPriorityText',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.indication', {
            url: '/:index/indication',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterIndication',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.length', {
            url: '/length',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterLength',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('encounter.edit.location', {
            url: '/:location_index/location',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterLocation',
                    templateUrl: 'templates/edit_schemas/text.html' //Chequear
                }
            }
        })
        .state('encounter.edit.location.location_reference', {
            url: '/reference',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterLocationLocation',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.location.period', {
            url: '/period',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterLocationPeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('encounter.edit.reason', {
            url: '/:codeable_index/reason',
            cache: false
        })
        .state('encounter.edit.reason.text', {
            url: 'text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterReason',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.reason.coding', {
            url: '/:coding_index/coding',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterReasonCoding',

                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.appointment', {
            url: '/appointment',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterAppointment',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.episodeofcare', {
            url: '/:index/episodeofcare',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterEpisodeOfCare',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.type', {
            url: '/:codeable_index/type',
            cache: false
        })
        .state('encounter.edit.type.text', {
            url: '/:text',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterType',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.type.coding', {
            url: '/:coding_index/type',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.partof', {
            url: '/partof',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterPartOf',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.incomingreferral', {
            url: '/:index/incomingreferral',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterIncomingReferral',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('encounter.edit.identifier', {
            url: '/:identifier_index/identifier',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('encounter.edit.identifier.type', {
            url: '/type',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('encounter.edit.identifier.type.coding', {
            url: '/coding/:index',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('encounter.edit.status', {
            url: '/status',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterStatus',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('encounter.edit.class', {
            url: '/class',
            cache: false,
            views: {
                'forms@encounter.edit': {
                    controller: 'editEncounterClass',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        });
});
