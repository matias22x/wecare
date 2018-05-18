'use strict';
angular.module('wecareRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('listado_especialistas', {
            cache: false,
            url: '/listado_especialistas', // url que va arriba
            templateUrl: 'templates/views/especialistas/listado.html', //ubicacion del html
            controller: 'listadoEspecialistasController' //nombre controller
        })
        .state('agregar_especialista', {
            cache: false,
            url: '/agregar_especialista', // url que va arriba
            templateUrl: 'templates/views/especialistas/agregar.html', //ubicacion del html
            controller: 'agregarEspecialistasController' //nombre controller
        })
        .state('editar_especialista', {
            cache: false,
            url: '/editar_especialista/:ID', // url que va arriba
            templateUrl: 'templates/views/especialistas/editar.html', //ubicacion del html
            controller: 'editarEspecialistasController' //nombre controller
        });
});
