'use strict';
angular.module('creditRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('credit', {
    url: '/credit',
    cache: false,
    templateUrl: 'templates/credit_list.html',
    controller: 'creditListCtrl'
})
        .state('credit.edit', {
            url: '/edit/:credit_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editCreditCtrl',
                    templateUrl: 'templates/roles/credit.html'
                }
            }
        })
        .state('credit.edit.managingorganization', {
            cache: false,
            url: '/managingorgianzation',
            views: {
                'forms@credit.edit': {
                    controller: 'editCreditManagingOrganization',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('credit.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@credit.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('credit.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@credit.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }

            }
        })
        .state('credit.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@credit.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('credit.edit.value', {
            cache: false,
            url: '/value',
            views: {
                'forms@credit.edit': {
                    controller: 'editCreditValueCtrl',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        });
});
