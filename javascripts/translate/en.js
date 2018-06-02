'use strict';
angular.module('esTranslation', []).config(function($translateProvider) {
    $translateProvider
        .translations('es', {
            'USERNAME':'Username',
            'PASSWORD':'Password',
            'LOGIN':'Login',
            'SIGNUP':'Signup',
            'SEND':'Send'
        });
});
