'use strict';
angular.module('organizationRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('organization', {
            url: '/organization',
            cache: false,
            templateUrl: 'templates/organization_list.html',
            controller: 'organizationListCtrl'
        })
        .state('organization.edit', {
            url: '/edit/:organization_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editOrganizationCtrl',
                    templateUrl: 'templates/roles/organization.html'
                }
            }
        })
        .state('organization.edit.address', {
            cache: false,
            url: '/address/:address_index',
            views: {
                'forms@organization.edit': {
                    controller: 'addressEditCtrl',
                    templateUrl: 'templates/edit_schemas/address.html'

                }
            }
        })
        .state('organization.edit.partOf', {
            cache: false,
            url: '/part_of/:part_of_index',
            views: {
                'forms@organization.edit': {
                    controller: 'partOfEditCtrl',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'

                }
            }
        })
        .state('organization.edit.name', {
            cache: false,
            url: '/name',
            views: {
                'forms@organization.edit': {
                    controller: 'organizationNameCtrl',
                    templateUrl: 'templates/edit_schemas/contact-name.html'

                }
            }
        })
        .state('organization.edit.type', {
            cache: false,
            url: '/type'
        })
        .state('organization.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@organization.edit': {
                    controller: 'typeTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('organization.edit.type.coding', {
            cache: false,
            url: '/type/coding/:coding_index',
            views: {
                'forms@organization.edit': {
                    controller: 'typeCodingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('organization.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@organization.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('organization.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@organization.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('organization.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@organization.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('organization.edit.telecom', {
            cache: false,
            url: '/:index/telecom',
            views: {
                'forms@organization.edit': {
                    controller: 'organizationTelecomEditCtrl',
                    templateUrl: 'templates/edit_schemas/contact-point.html'
                }
            }
        })
        .state('organization.edit.active', {
            cache: false,
            url: '/active',
            views: {
                'forms@organization.edit': {
                    controller: 'activeEditCtrl',
                    templateUrl: 'templates/edit_schemas/active.html'
                }
            }
        })
        .state('organization.edit.contact', {
            cache: false,
            url: '/contact/:contact_index'

        })
        .state('organization.edit.contact.telecom', {
            cache: false,
            url: '/telecom/:telecom_index',
            views: {
                'forms@organization.edit': {
                    controller: 'contactTelecomCtrl',
                    templateUrl: 'templates/edit_schemas/contact-point.html'
                }
            }
        })
        .state('organization.edit.contact.name', {
            cache: false,
            url: '/name',
            views: {
                'forms@organization.edit': {
                    controller: 'contactNameCtrl',
                    templateUrl: 'templates/edit_schemas/human-name.html'

                }
            }
        })
        .state('organization.edit.contact.address', {
            cache: false,
            url: '/address',
            views: {
                'forms@organization.edit': {
                    controller: 'contactAddressCtrl',
                    templateUrl: 'templates/edit_schemas/address.html'
                }
            }
        })
        .state('organization.edit.contact.purpose', {
            cache: false,
            url: '/purpose'
        })
        .state('organization.edit.contact.purpose.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@organization.edit': {
                    controller: 'contactPurposeCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('organization.edit.contact.purpose.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@organization.edit': {
                    controller: 'contactPurposeCodingCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        });
});
