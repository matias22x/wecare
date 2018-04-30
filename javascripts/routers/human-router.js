'use strict';
angular.module('humanRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('appointment_abm', {
            cache: false,
            url: '/appointment_abm',
            templateUrl: 'templates/views/appointment/list.html',
            controller: 'appointmentListCtrl'
        })
        .state('appointment_add', {
            cache: false,
            url: '/appointment_edit/:id',
            templateUrl: 'templates/views/appointment/form.html',
            controller: 'simpleAppointmentCtrl'
        })
        .state('auxiliar_abm', {
            cache: false,
            url: '/auxiliar_abm',
            templateUrl: 'templates/views/auxiliar/list.html',
            controller: 'auxiliarListCtrl'
        })
        .state('auxiliar_add', {
            cache: false,
            url: '/auxiliar_add/:id?',
            templateUrl: 'templates/views/auxiliar/formulario.html',
            controller: 'simpleAuxiliarCtrl'
        })
        .state('auxiliar_view', {
            cache: false,
            url: '/auxiliar_view/:id?',
            templateUrl: 'templates/views/auxiliar/view.html',
            controller: 'simpleAuxiliarCtrl'
        })
        .state('coordinator_abm', {
            cache: false,
            url: '/coordinator_abm',
            templateUrl: 'templates/views/coordinator/list.html',
            controller: 'coordinatorListCtrl'
        })
        .state('coordinator_add', {
            cache: false,
            url: '/coordinator_add/:id?',
            templateUrl: 'templates/views/coordinator/formulario.html',
            controller: 'simpleEditCoordinatorCtrl'
        })
        .state('coordinator_view', {
            cache: false,
            url: '/coordinator_view/:id?',
            templateUrl: 'templates/views/coordinator/view.html',
            controller: 'simpleEditCoordinatorCtrl'
        })
        .state('diagnostic_order_abm', {
            cache: false,
            url: '/diagnostic_order_abm/:id?',
            templateUrl: 'templates/views/diagnostic-order/list.html',
            controller: 'diagnosticOrderListCtrl'
        })
        .state('diagnosticOrderByType', {
            cache: false,
            url: '/diagnostic/:patient_id',
            templateUrl: 'templates/views/diagnostic-order/type.html',
            controller: 'diagnosticOrderTypeSelectCtrl'
        })
        .state('diagnosticOrderByType.new', {
            cache: false,
            url: '/new',
            params: {
                type: null,
                priority: null
            },
            views: {
                '@': {
                    templateUrl: 'templates/views/diagnostic-order/simple-form.html',
                    controller: 'newProcedureRequestCtrl'
                }
            }
        })
        .state('diagnostic_order_add', {
            cache: false,
            url: '/diagnostic_order_add/:id?',
            templateUrl: 'templates/views/diagnostic-order/formulario.html',
            controller: 'simpleDiagnosticOrderCtrl'
        })
        .state('diagnostic_order_view', {
            cache: false,
            url: '/diagnostic_order_view/:id?',
            templateUrl: 'templates/views/diagnostic-order/view.html',
            controller: 'simpleDiagnosticOrderCtrl'
        })
        .state('diagnostic_order_print', {
            url: '/print_diagnosticorder/:id',
            cache: false,
            views: {
                '@': {
                    templateUrl: 'templates/views/diagnostic-order/print.html',
                    controller: 'printDiagnosticOrderController'
                }
            }
        })
        .state('diagnostic_report_abm', {
            cache: false,
            url: '/diagnostic_report_abm/:end_call?',
            templateUrl: 'templates/views/diagnostic-report/list.html',
            controller: 'diagnosticReportListCtrl'
        })
        .state('diagnostic_report_add', {
            cache: false,
            url: '/report_edit/:id?',
            templateUrl: 'templates/views/diagnostic-report/new-form.html',
            controller: 'simpleEditDiagnosticReportCtrl'
        })
        .state('diagnostic_report_view', {
            cache: false,
            url: '/report_view/:id?',
            templateUrl: 'templates/views/diagnostic-report/new-form.html',
            controller: 'simpleEditDiagnosticReportCtrl'
        })
        .state('diagnostic_report_order', {
            cache: false,
            url: '/report/:diagnostic_order_id',
            templateUrl: 'templates/views/diagnostic-report/new-form.html',
            controller: 'simpleEditDiagnosticReportCtrl'
        })
        .state('diagnostic_report_print', {
            url: '/print_diagnosticreport/:id',
            cache: false,
            views: {
                '@': {
                    templateUrl: 'templates/views/diagnostic-report/print.html',
                    controller: 'printDiagnosticReportController'
                }
            }
        })
        .state('procedure_request_add', {
            cache: false,
            url: '/diagnostic-request-edit/:id?',
            templateUrl: 'templates/views/diagnostic-order/formulario-diagnostic-request.html',
            controller: 'simpleDiagnosticRequestCtrl',
            params: {
                edit: true,
                resend: false
            }
        })
        .state('procedure_request_view', {
            cache: false,
            url: '/diagnostic-request-view/:id?tab',
            templateUrl: 'templates/views/diagnostic-order/formulario-diagnostic-request.html',
            controller: 'simpleDiagnosticRequestCtrl'
        })
        .state('procedure_request_abm', {
            cache: false,
            url: '/diagnostic_request/',
            templateUrl: 'templates/views/diagnostic-order/list.html',
            controller: 'procedureResquestListCtrl'
        })
        .state('procedure_new', {
            cache: false,
            url: '/diagnostic_new/:patient_id?',
            templateUrl: 'templates/views/diagnostic-order/simple-form.html',
            controller: 'newProcedureRequestCtrl'
        })
        .state('node_admin_abm', {
            cache: false,
            url: '/node_admin_abm',
            templateUrl: 'templates/views/node-administrator/list.html',
            controller: 'nodeAdministratorListCtrl'
        })
        .state('node_admin_add', {
            cache: false,
            url: '/node_admin_add/:id?',
            templateUrl: 'templates/views/node-administrator/formulario.html',
            controller: 'simpleEditNodeAdministratorCtrl'
        })
        .state('node_admin_view', {
            cache: false,
            url: '/node_admin_view/:id?',
            templateUrl: 'templates/views/node-administrator/view.html',
            controller: 'simpleEditNodeAdministratorCtrl'
        })
        .state('organization_abm', {
            cache: false,
            url: '/organization_abm',
            templateUrl: 'templates/views/organization/list.html',
            controller: 'organizationListCtrl'
        })
        .state('organization_add', {
            cache: false,
            url: '/organization_add/:id?',
            templateUrl: 'templates/views/organization/formulario.html',
            controller: 'simpleEditOrganizationCtrl'
        })
        .state('organization_view', {
            cache: false,
            url: '/organization_view/:id?',
            templateUrl: 'templates/views/organization/view.html',
            controller: 'simpleEditOrganizationCtrl'
        })
        .state('patient_abm', {
            cache: false,
            url: '/patients/:search?',
            templateUrl: 'templates/views/patient/list.html',
            controller: 'patientListCtrl'
        })
        .state('patient_add', {
            cache: false,
            url: '/patient_add/:id?',
            templateUrl: 'templates/views/patient/form.html',
            controller: 'simplePatientCtrl'
        })
        .state('patient_view', {
            cache: false,
            url: '/patient_view/:id?',
            templateUrl: 'templates/views/patient/view.html',
            controller: 'simplePatientCtrl'
        })
        .state('patient_order', {
            cache: false,
            url: '/patient_order/:patient_id?',
            templateUrl: 'templates/views/diagnostic-order/formulario.html',
            controller: 'simpleDiagnosticOrderCtrl'
        })
        .state('practitioner_abm', {
            cache: false,
            url: '/practitioner_abm',
            templateUrl: 'templates/views/practitioner/list.html',
            controller: 'practitionerListCtrl'
        })
        .state('practitioner_add', {
            cache: false,
            url: '/practitioner_add/:id?',
            templateUrl: 'templates/views/practitioner/formulario.html',
            controller: 'simpleEditPractitionerCtrl'
        })
        .state('practitioner_view', {
            cache: false,
            url: '/practitioner_view/:id?',
            templateUrl: 'templates/views/practitioner/view.html',
            controller: 'simpleEditPractitionerCtrl'
        })
        .state('practitioner_home', {
            url: '/select-organization',
            templateUrl: 'templates/views/practitioner/home.html',
            controller: 'selectOrganizationCtrl'
        })
        .state('organizationadministrator_abm', {
            cache: false,
            url: '/organization_administrator_abm',
            templateUrl: 'templates/views/organization-administrator/list.html',
            controller: 'organizationAdministratorListCtrl'
        })
        .state('organization_administrator_add', {
            cache: false,
            url: '/organization_administrator_add/:id?',
            templateUrl: 'templates/views/organization-administrator/formulario.html',
            controller: 'simpleEditOrganizationAdministratorCtrl'
        })
        .state('organization_administrator_view', {
            cache: false,
            url: '/organization_administrator_view/:id?',
            templateUrl: 'templates/views/organization-administrator/view.html',
            controller: 'simpleEditOrganizationAdministratorCtrl'
        })
        .state('observation_file', {
            cache: false,
            url: '/observation_file/:file_id?',
            templateUrl: 'templates/views/observation/file.html',
            controller: 'observationDecomViewer'
        })
        .state('observation_abm', {
            cache: false,
            url: '/observation_add/',
            templateUrl: 'templates/views/observation/list.html',
            controller: 'observationListCtrl'
        })
        .state('observation_add', {
            cache: false,
            url: '/observation_add/:id?',
            templateUrl: 'templates/views/observation/form.html',
            controller: 'simpleObservationCtrl'
        })
        .state('observation_view', {
            cache: false,
            url: '/observation_view/:id?',
            templateUrl: 'templates/views/observation/view.html',
            controller: 'simpleObservationCtrl'
        })
        .state('structure', {
            cache: false,
            url: '/structure',
            templateUrl: 'templates/views/structure/view-structures.html',
            controller: 'structureCtrl'
        })
        .state('structure.practitioner', {
            cache: false,
            url: '/practitioner',
            views: {
                '@': {
                    templateUrl: 'templates/views/structure/view-practitioner.html'
                }
            }
        })
        .state('structure.diagnostic_order', {
            cache: false,
            url: '/diagnostic_order',
            views: {
                '@': {
                    templateUrl: 'templates/views/structure/view-diagnostic-order.html'
                }
            }
        })
        .state('structure.diagnostic_report', {
            cache: false,
            url: '/diagnostic_report',
            views: {
                '@': {
                    templateUrl: 'templates/views/structure/view-diagnostic-report.html'
                }
            }
        })
        .state('structure.extension', {
            cache: false,
            url: '/info_call_share',
            views: {
                '@': {
                    templateUrl: 'templates/views/structure/share_screen.html'
                }
            }
        });
});
