'use strict';
angular.module('enTranslation', []).config(function($translateProvider) {
    $translateProvider
        .translations('es', {
            'ADISTAL_NOTIFICATION': 'Notificación de ADISTAL',
            'ONE_OF_THE_REQUIRED_FIELDS_IS_MISSING': 'Falta uno de los campos obligatorios'
        });
});
