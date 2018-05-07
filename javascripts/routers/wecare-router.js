'use strict';
angular.module('wecareRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('listado_especialistas', {
            cache: false,
            url: '/listado_especialistas',
            templateUrl: 'templates/views/especialistas/listado.html',
            controller: 'listadoEspecialistasController'
        });
});
