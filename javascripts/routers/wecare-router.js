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
        })
        .state('ver_especialista', {
            cache: false,
            url: '/ver_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/ver.html', //ubicacion del html
            controller: 'verEspecialistasController' //nombre controller
        })
        .state('borrar_especialista', {
            cache: false,
            url: '/borrar_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/borrar.html', //ubicacion del html
            controller: 'borrarEspecialistasController' //nombre controller
        })
        .state('listado_alumnos', {
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
        })
        .state('ver_alumno', {
            cache: false,
            url: '/ver_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/alumnos/ver.html', //ubicacion del html
            controller: 'verAlumnosController' //nombre controller
        })
        .state('borrar_alumno', {
            cache: false,
            url: '/borrar_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/alumnos/borrar.html', //ubicacion del html
            controller: 'borrarAlumnosController' //nombre controller
        })
        .state('actividades', {
            cache: false,
            url: '/actividades', // url que va arriba
            templateUrl: 'templates/views/seguimiento/actividades.html', //ubicacion del html
            controller: 'actividadesController' //nombre controller
        })
        .state('bot_prueba', {
            cache: false,
            url: '/bot', // url que va arriba
            templateUrl: 'templates/views/bot/comunicacion.html', //ubicacion del html
            controller: 'botController' //nombre controller
        });
});
