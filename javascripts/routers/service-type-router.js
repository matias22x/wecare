'use strict';
angular.module('serviceTypeRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('servicetype', {
    url: '/serviceType',
    cache: false,
    templateUrl: 'templates/service_type_list.html',
    controller: 'serviceTypeListCtrl'
})
        .state('servicetype.edit', {
            url: '/edit/:servicetype_id',
            cache: false,
            controllerAs: 'editServiceTypeCtrl',
            views: {
                '@': {
                    controller: 'editServiceTypeCtrl',
                    templateUrl: 'templates/roles/service-type.html'
                }
            }
        })
        .state('servicetype.edit.diagnosticService', {
            cache: false,
            url: '/diagnosticService/:codeable_index',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeDiagnosticServiceCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }
            }
        })
        .state('servicetype.edit.diagnosticService.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeDiagnosticServiceCodingCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'

                }
            }
        })
        .state('servicetype.edit.name', {
            cache: false,
            url: '/name',
            views: {
                'forms@servicetype.edit': {
                    controller: 'humanNameEditCtrl',
                    templateUrl: 'templates/edit_schemas/human-name.html'

                }
            }
        })
        .state('servicetype.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@servicetype.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('servicetype.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@servicetype.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('servicetype.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@servicetype.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('servicetype.edit.creditcost', {
            cache: false,
            url: '/creditcost',
            views: {
                'forms@servicetype.edit': {
                    controller: 'serviceTypeNumberEditCtrl',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        })
        .state('servicetype.edit.type', {
            cache: false,
            url: '/type'
        })
        .state('servicetype.edit.type.type', {
            cache: false,
            url: '/text',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeTypeCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('servicetype.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeTypeCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('servicetype.edit.speciality', {
            cache: false,
            url: '/speciality'
        })
        .state('servicetype.edit.speciality.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeSpecialityCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('servicetype.edit.speciality.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@servicetype.edit': {
                    controller: 'editServiceTypeSpecialityCodingCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        });
});
