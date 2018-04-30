'use strict';
angular.module('locationRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('location', {
    url: '/location',
    cache: false,
    templateUrl: 'templates/location-list.html',
    controller: 'locationListCtrl'
})
        .state('location.edit', {

            url: '/edit/:location_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editLocationCtrl',
                    templateUrl: 'templates/roles/location.html'
                }
            }
        })
        .state('location.edit.identifier', {
            cache: false,
            url: '/identifier/:identifier_index',
            views: {
                'forms@location.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('location.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@location.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('location.edit.identifier.coding', {
            cache: false,
            url: '/type/coding/:index',
            views: {
                'forms@location.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('location.edit.status', {
            cache: false,
            url: '/status',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationStatus',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('location.edit.managingorganization', {
            cache: false,
            url: '/managingorganization',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationManagingOrganization',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('location.edit.physicaltype', {
            cache: false,
            url: '/physicaltype/:codeable_index'
        })
        .state('location.edit.physicaltype.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationPhysicalTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('location.edit.physicaltype.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationPhysicalTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('location.edit.description', {
            cache: false,
            url: '/description',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationDescription',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('location.edit.telecom', {
            cache: false,
            url: '/telecom/:index',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationTelecom',
                    templateUrl: 'templates/edit_schemas/contact-point.html'
                }
            }
        })
        .state('location.edit.mode', {
            cache: false,
            url: '/mode',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationMode',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('location.edit.address', {
            cache: false,
            url: '/address',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationAddress',
                    templateUrl: 'templates/edit_schemas/address.html'
                }
            }
        })
        .state('location.edit.position', {
            cache: false,
            url: '/position',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationPosition',
                    templateUrl: 'templates/edit_schemas/location-position.html'
                }
            }
        })
        .state('location.edit.type', {
            cache: false,
            url: '/type/:codeable_index'
        })
        .state('location.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationTypeText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('location.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('location.edit.partof', {
            cache: false,
            url: '/partof',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationPartOf',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('location.edit.name', {
            cache: false,
            url: '/name',
            views: {
                'forms@location.edit': {
                    controller: 'editLocationName',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        });
});
