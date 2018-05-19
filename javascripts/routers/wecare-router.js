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
        })
        .state('eliminar_especialista', {
            cache: false,
            url: '/eliminar_especialista/:ID', // url que va arriba
            templateUrl: 'templates/views/especialistas/eliminar.html', //ubicacion del html
            controller: 'eliminarEspecialistasController' //nombre controller
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
            url: '/editar_alumno/:ID', // url que va arriba
            templateUrl: 'templates/views/alumnos/editar.html', //ubicacion del html
            controller: 'editarAlumnosController' //nombre controller
        })
        .state('eliminar_alumno', {
            cache: false,
            url: '/eliminar_alumno/:ID', // url que va arriba
            templateUrl: 'templates/views/alumnos/eliminar.html', //ubicacion del html
            controller: 'eliminarAlumnosController' //nombre controller
        });
});
