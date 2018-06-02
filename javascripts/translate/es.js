'use strict';
angular.module('enTranslation', []).config(function($translateProvider) {
    $translateProvider
        .translations('es', {
            'THIS_IS_BOT': 'Este es el bot',
            'THIS_IS_THE_LAST_REGISTER': 'Este es el ultimo registro'
        });
});
