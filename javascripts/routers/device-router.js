'use strict';
angular.module('deviceRouter', []).config(function($stateProvider) {
    $stateProvider
		.state('device', {
    url: '/device',
    cache: false,
    templateUrl: 'templates/device_list.html',
    controller: 'deviceListCtrl'
})
        .state('device.edit', {
            url: '/edit/:device_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editDeviceCtrl',
                    templateUrl: 'templates/roles/device.html'
                }
            }
        })
        .state('device.edit.status', {
            cache: false,
            url: '/status',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceStatusCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@device.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('device.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@device.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('device.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@device.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('device.edit.manufacturer', {
            cache: false,
            url: '/manufacturer',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceManufacturerCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.model', {
            cache: false,
            url: '/model',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceModelCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.version', {
            cache: false,
            url: '/version',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceVersionCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.manufactureDate', {
            cache: false,
            url: '/manufacturedate',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceManufactureDateCtrl',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('device.edit.expiry', {
            cache: false,
            url: '/expiry',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceExpiryCtrl',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('device.edit.udi', {
            cache: false,
            url: '/udi',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceUdiCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.lotNumber', {
            cache: false,
            url: '/lotNumber',
            views: {
                'forms@device.edit': {
                    controller: 'editDevicelotNumberCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.url', {
            cache: false,
            url: '/url',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceUrlCtrl',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('device.edit.type', {
            url: '/code',
            cache: false
        })
        .state('device.edit.type.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceType',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('device.edit.type.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceTypeCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('device.edit.owner', {
            cache: false,
            url: '/owner',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceOwner',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('device.edit.location', {
            cache: false,
            url: '/location',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceLocation',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('device.edit.patient', {
            cache: false,
            url: '/patient',
            views: {
                'forms@device.edit': {
                    controller: 'editDevicePatient',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('device.edit.contact', {
            cache: false,
            url: '/:index/contact',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceContact',
                    templateUrl: 'templates/edit_schemas/contact-point.html'
                }
            }
        })
        .state('device.edit.note', {
            cache: false,
            url: '/:note_index/note',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceNote',
                    templateUrl: 'templates/edit_schemas/diagnostic-order-annotation.html'
                }

            }
        })
        .state('device.edit.note.authorReference', {
            cache: false,
            url: '/author_reference',
            views: {
                'forms@device.edit': {
                    controller: 'editDeviceNoteAuthorReference',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        });
});
