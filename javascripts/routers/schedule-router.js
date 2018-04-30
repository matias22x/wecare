'use strict';
angular.module('scheduleRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('schedule', {
    url: '/schedule',
    cache: false,
    templateUrl: 'templates/schedule-list.html',
    controller: 'scheduleListCtrl'
})
        .state('schedule.edit', {
            url: '/edit/:schedule_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editScheduleCtrl',
                    templateUrl: 'templates/roles/schedule.html'
                }
            }
        })
        .state('schedule.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@schedule.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('schedule.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@schedule.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('schedule.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@appointment.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('schedule.edit.comment', {
            cache: false,
            url: '/comment',
            views: {
                'forms@schedule.edit': {
                    controller: 'editScheduleComment',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('schedule.edit.type', {
            cache: false,
            url: '/type/:codeable_index'
        })
        .state('schedule.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@schedule.edit': {
                    controller: 'editScheduleTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('schedule.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@schedule.edit': {
                    controller: 'editScheduleTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('schedule.edit.planninghorizont', {
            cache: false,
            url: '/planninghorizont',
            views: {
                'forms@schedule.edit': {
                    controller: 'editSchedulePlaningHorizont',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        }).state('schedule.edit.actor', {
            cache: false,
            url: '/actor',
            views: {
                'forms@schedule.edit': {
                    controller: 'editScheduleActor',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        });
});
