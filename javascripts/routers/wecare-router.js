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
        .state('bot_inicio', {
            cache: false,
            url: '/bot_inicio', // url que va arriba
            templateUrl: 'templates/views/bot/inicio.html', //ubicacion del html
            controller: 'botInicioController' //nombre controller
        })
        .state('bot', {
            cache: false,
            url: '/bot', // url que va arriba
            templateUrl: 'templates/views/bot/comunicacion.html', //ubicacion del html
            controller: 'botController' //nombre controller
        })
        .state('bot_final', {
            cache: false,
            url: '/bot_final', // url que va arriba
            templateUrl: 'templates/views/bot/fin.html', //ubicacion del html
            controller: 'botFinalController' //nombre controller
        })
        .state('alumno_home', {
            cache: false,
            url: '/alumno_home', // url que va arriba
            templateUrl: 'templates/views/alumnos/home.html', //ubicacion del html
            controller: 'alumnoHomeController' //nombre controller
        })
        .state('alumno_actividades', {
            cache: false,
            url: '/alumno_actividades', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/actividades.html', //ubicacion del html
            controller: 'alumnoActividadesController' //nombre controller
        })
        .state('alumno_actividades_copia', {
            cache: false,
            url: '/alumno_actividades_copia', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/actividadescopia.html', //ubicacion del html
            controller: 'alumnoActividadesController' //nombre controller
        })

        .state('alumno_estados', {
            cache: false,
            url: '/alumno_estados', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/estados.html', //ubicacion del html
            controller: 'alumnoEstadosController' //nombre controller
        })
        .state('alumno_lugares', {
            cache: false,
            url: '/alumno_lugares', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/lugares.html', //ubicacion del html
            controller: 'alumnoLugaresController' //nombre controller
        })
        .state('alumno_contar', {
            cache: false,
            url: '/alumno_contar', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/contar.html', //ubicacion del html
            controller: 'alumnoContarController' //nombre controller
        })
        .state('alumno_sumario', {
            cache: false,
            url: '/alumno_sumario', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/sumario.html', //ubicacion del html
            controller: 'alumnoSumarioController' //nombre controller
        })
        .state('alumno_finalizacion', {
            cache: false,
            url: '/alumno_finalizacion', // url que va arriba
            templateUrl: 'templates/views/alumnos/seguimiento/finalizacion.html', //ubicacion del html
            controller: 'alumnoFinalizacionController' //nombre controller
        })
        .state('alumno_agenda', {
            cache: false,
            url: '/alumno_agenda', // url que va arriba
            templateUrl: 'templates/views/alumnos/agenda.html', //ubicacion del html
            controller: 'alumnoAgendaController' //nombre controller
        })
        .state('alumno_historial', {
            cache: false,
            url: '/alumno_historial', // url que va arriba
            templateUrl: 'templates/views/alumnos/historial.html', //ubicacion del html
            controller: 'alumnoHistorialController' //nombre controller
        })
        .state('alumno_informacion', {
            cache: false,
            url: '/alumno_informacion', // url que va arriba
            templateUrl: 'templates/views/alumnos/informacion.html', //ubicacion del html
            controller: 'alumnoInformacionController' //nombre controller
        })
        .state('especialista_home', {
            cache: false,
            url: '/especialista_home', // url que va arriba
            templateUrl: 'templates/views/especialistas/home.html', //ubicacion del html
            controller: 'especialistaHomeController' //nombre controller
        })
        .state('especialista_agenda', {
            cache: false,
            url: '/especialista_agenda', // url que va arriba
            templateUrl: 'templates/views/especialistas/agenda.html', //ubicacion del html
            controller: 'especialistaAgendaController' //nombre controller
        })
        .state('especialista_diagnosticos', {
            cache: false,
            url: '/especialista_diagnosticos', // url que va arriba
            templateUrl: 'templates/views/especialistas/diagnosticos.html', //ubicacion del html
            controller: 'especialistaDiagnosticosController' //nombre controller
        })
        .state('especialista_diagnosticoVer', {
            cache: false,
            url: '/especialista_diagnosticoVer', // url que va arriba
            templateUrl: 'templates/views/especialistas/diagnosticoVer.html', //ubicacion del html
            controller: 'especialistaDiagnosticoVerController' //nombre controller
        })
        .state('especialista_historial', {
            cache: false,
            url: '/especialista_historial/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/historial.html', //ubicacion del html
            controller: 'especialistaHistorialController' //nombre controller
        })
        .state('especialista_observaciones', {
            cache: false,
            url: '/especialista_observaciones/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/observaciones.html', //ubicacion del html
            controller: 'especialistaObservacionesController' //nombre controller
        })
        .state('especialista_pacientes', {
            cache: false,
            url: '/especialista_pacientes', // url que va arriba
            templateUrl: 'templates/views/especialistas/pacientes.html', //ubicacion del html
            controller: 'especialistaPacientesController' //nombre controller
        })
        .state('especialista_sesion', {
            cache: false,
            url: '/especialista_sesion', // url que va arriba
            templateUrl: 'templates/views/especialistas/sesion.html', //ubicacion del html
            controller: 'especialistaSesionController' //nombre controller
        })
        .state('especialista_turno', {
            cache: false,
            url: '/especialista_turno/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/turno.html', //ubicacion del html
            controller: 'especialistaTurnoController' //nombre controller
        })
        .state('especialista_historialTmp', {
            cache: false,
            url: '/especialista_historialTmp/:id?', // url que va arriba
            templateUrl: 'templates/views/especialistas/historialTmp.html', //ubicacion del html
            controller: 'especialistaHistorialController' //nombre controller
        })
        .state('especialista_diagnosticosTmp', {
            cache: false,
            url: '/especialista_diagnosticosTmp', // url que va arriba
            templateUrl: 'templates/views/especialistas/diagnosticosTmp.html', //ubicacion del html
            controller: 'especialistaDiagnosticosController' //nombre controller
        });
});
