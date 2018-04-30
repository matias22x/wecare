'use strict';
angular.module('slotRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('slot', {
    url: '/slot',
    cache: false,
    templateUrl: 'templates/slot-list.html',
    controller: 'slotListCtrl'
})
        .state('slot.edit', {
            url: '/edit/:slot_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editSlotCtrl',
                    templateUrl: 'templates/roles/slot.html'
                }
            }
        })
        .state('slot.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@slot.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('slot.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@slot.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('slot.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@appointment.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('slot.edit.comment', {
            cache: false,
            url: '/comment',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotComment',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('slot.edit.freebusytype', {
            cache: false,
            url: '/freebusytype',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotFreeBusyType',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('slot.edit.type', {
            cache: false,
            url: '/type/:codeable_index'
        })
        .state('slot.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('slot.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('slot.edit.schedule', {
            cache: false,
            url: '/schedule',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotSchedule',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('slot.edit.start', {
            cache: false,
            url: '/start',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotStart',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('slot.edit.end', {
            cache: false,
            url: '/end',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotEnd',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('slot.edit.overbooked', {
            cache: false,
            url: '/overbooked',
            views: {
                'forms@slot.edit': {
                    controller: 'editSlotOverBookead',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        });
});
