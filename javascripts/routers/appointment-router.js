'use strict';
angular.module('appointmentRouter', []).config(function($stateProvider) {
    $stateProvider
	.state('appointment', {
    url: '/appointment',
    cache: false,
    templateUrl: 'templates/appointment-list.html',
    controller: 'appointmentListCtrl'
})
        .state('appointment.edit', {
            url: '/edit/:appointment_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editAppointmentCtrl',
                    templateUrl: 'templates/roles/appointment.html'
                }
            }
        })
        .state('appointment.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@appointment.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('appointment.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@appointment.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('appointment.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@appointment.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('appointment.edit.priority', {
            cache: false,
            url: '/priority',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentPriority',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        })
        .state('appointment.edit.description', {
            cache: false,
            url: '/description',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentDescription',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('appointment.edit.start', {
            cache: false,
            url: '/start',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentStart',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('appointment.edit.end', {
            cache: false,
            url: '/end',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentEnd',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('appointment.edit.minutesduration', {
            cache: false,
            url: '/minutesduration',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentMinutesDuration',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        })
        .state('appointment.edit.comment', {
            cache: false,
            url: '/comment',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentComment',
                    templateUrl: 'templates/edit_schemas/string.html'
                }
            }
        })
        .state('appointment.edit.type', {
            cache: false,
            url: '/appointment'
        })
        .state('appointment.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('appointment.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('appointment.edit.reason', {
            cache: false,
            url: '/reason'
        })
        .state('appointment.edit.reason.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentReasonText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('appointment.edit.reason.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentReasonCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('appointment.edit.slot', {
            cache: false,
            url: '/slot/:codeable_index'
        })
        .state('appointment.edit.slot.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentSlotText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('appointment.edit.slot.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentSlotCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('appointment.edit.participant', {
            cache: false,
            url: '/participant/:participant_index'
        })
        .state('appointment.edit.participant.type', {
            cache: false,
            url: '/type/:codeable_index'
        })
        .state('appointment.edit.participant.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentPartipantTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('appointment.edit.participant.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentParticipantTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('appointment.edit.participant.status', {
            cache: false,
            url: '/status',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentParticipantStatus',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('appointment.edit.participant.required', {
            cache: false,
            url: '/required',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentParticipantRequired',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('appointment.edit.participant.actor', {
            cache: false,
            url: '/actor',
            views: {
                'forms@appointment.edit': {
                    controller: 'editAppointmentParticipantActor',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        });
});
