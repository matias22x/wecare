'use strict';
angular.module('wecareRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('admin_home', {
            cache: false,
            url: '/admin_home', // url que va arriba
            templateUrl: 'templates/views/admin/home.html', //ubicacion del html
            controller: 'homeAdminController' //nombre controller
        })
        .state('admin_listado_especialistas', {
            cache: false,
            url: '/admin_listado_especialistas', // url que va arriba
            templateUrl: 'templates/views/admin/especialistas/listado.html', //ubicacion del html
            controller: 'listadoEspecialistasController' //nombre controller
        })
        .state('admin_agregar_especialista', {
            cache: false,
            url: '/admin_agregar_especialista', // url que va arriba
            templateUrl: 'templates/views/admin/especialistas/agregar.html', //ubicacion del html
            controller: 'agregarEspecialistasController' //nombre controller
        })
        .state('admin_editar_especialista', {
            cache: false,
            url: '/admin_editar_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/especialistas/editar.html', //ubicacion del html
            controller: 'editarEspecialistasController' //nombre controller
        })
        .state('admin_ver_especialista', {
            cache: false,
            url: '/admin_ver_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/especialistas/ver.html', //ubicacion del html
            controller: 'verEspecialistasController' //nombre controller
        })
        .state('admin_borrar_especialista', {
            cache: false,
            url: '/borrar_especialista/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/especialistas/borrar.html', //ubicacion del html
            controller: 'borrarEspecialistasController' //nombre controller
        })
        .state('admin_listado_alumnos', {
            cache: false,
            url: '/admin_listado_alumnos', // url que va arriba
            templateUrl: 'templates/views/admin/alumnos/listado.html', //ubicacion del html
            controller: 'listadoAlumnosController' //nombre controller
        })
        .state('admin_agregar_alumno', {
            cache: false,
            url: '/admin_agregar_alumno', // url que va arriba
            templateUrl: 'templates/views/admin/alumnos/agregar.html', //ubicacion del html
            controller: 'agregarAlumnosController' //nombre controller
        })
        .state('admin_editar_alumno', {
            cache: false,
            url: '/admin_editar_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/alumnos/editar.html', //ubicacion del html
            controller: 'editarAlumnosController' //nombre controller
        })
        .state('admin_ver_alumno', {
            cache: false,
            url: '/admin_ver_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/alumnos/ver.html', //ubicacion del html
            controller: 'verAlumnosController' //nombre controller
        })
        .state('admin_borrar_alumno', {
            cache: false,
            url: '/admin_borrar_alumno/:id?', // url que va arriba
            templateUrl: 'templates/views/admin/alumnos/borrar.html', //ubicacion del html
            controller: 'borrarAlumnosController' //nombre controller
        })
        .state('bot_prueba', {
            cache: false,
            url: '/bot', // url que va arriba
            templateUrl: 'templates/views/bot/comunicacion.html', //ubicacion del html
            controller: 'botController' //nombre controller
        })
        .state('alumno_home', {
            cache: false,
            url: '/alumno_home', // url que va arriba
            templateUrl: 'templates/views/alumnos/home.html', //ubicacion del html
            controller: 'homeAlumnoController' //nombre controller
        })
        .state('alumno_actividades', {
            cache: false,
            url: '/alumno_actividades', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/actividades.html', //ubicacion del html
            controller: 'actividadesController' //nombre controller
        })
        .state('especialista_home', {
            cache: false,
            url: '/especialista_home', // url que va arriba
            templateUrl: 'templates/views/especialistas/home.html', //ubicacion del html
            controller: 'homeEspecialistaController' //nombre controller
        });
});
