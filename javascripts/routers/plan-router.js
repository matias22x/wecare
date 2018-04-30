'use strict';
angular.module('planRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('plan', {
    url: '/plan',
    cache: false,
    templateUrl: 'templates/plan-list.html',
    controller: 'planListCtrl'
})
        .state('plan.edit', {
            url: '/edit/:plan_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editPlanCtrl',
                    templateUrl: 'templates/roles/plan.html'
                }
            }
        })
        .state('plan.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@plan.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('plan.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@plan.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('plan.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@plan.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('plan.edit.buycredit', {
            cache: false,
            url: '/buycredit',
            views: {
                'forms@plan.edit': {
                    controller: 'editPlanBuyCreditCtrl',
                    templateUrl: 'templates/edit_schemas/boolean.html'
                }
            }
        })
        .state('plan.edit.servicetype', {
            cache: false,
            url: '/servicetype/:index',
            views: {
                'forms@plan.edit': {
                    controller: 'editPlanServiceTypeCtrl',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('plan.edit.providerorganization', {
            cache: false,
            url: '/providerorganization/:index',
            views: {
                'forms@plan.edit': {
                    controller: 'editPlanProviderOrganizationCtrl',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('plan.edit.clientorganization', {
            cache: false,
            url: '/clientorganization',
            views: {
                'forms@plan.edit': {
                    controller: 'editPlanClientOrganizationCtrl',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        });
});
