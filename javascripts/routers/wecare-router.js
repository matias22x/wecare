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
            url: '/editar_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/editar.html', //ubicacion del html
            controller: 'editarEspecialistasController' //nombre controller
        }).state('listado_alumnos', {
            cache: false,
            url: '/listado_alumnos', // url que va arriba
            templateUrl: 'templates/views/alumnos/listado.html', //ubicacion del html
            controller: 'listadoAlumnosController' //nombre controller
        })
        .state('agregar_alumno', {
            cache: false,
            url: '/agregar_alumno', // url que va arriba
            templateUrl: 'templates/views/alumnos/agregar.html', //ubicacion del html
            controller: 'agregarAlumnosController' //nombre controller
        })
        .state('editar_alumno', {
            cache: false,
            url: '/editar_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/alumnos/editar.html', //ubicacion del html
            controller: 'editarAlumnosController' //nombre controller
        });
});
