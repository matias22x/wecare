'use strict';
var adistalApp = angular.module('adistalApp', ['satellizer', 'ui.router', 'ui.materialize',
    'naif.base64', 'angular-storage',
    'pascalprecht.translate',
    'angularMoment',
    'usersRouter',
    'auxiliarRouter',
    'appointmentRouter',
    'coordinatorRouter',
    'creditRouter',
    'deviceRouter',
    'encounterRouter',
    'nodeAdministratorRouter',
    'observationRouter',
    'planRouter',
    'scheduleRouter',
    'serviceTypeRouter',
    'slotRouter',
    'humanRouter',
    'locationRouter',
    'notificationRouter',
    'utilities',
    'dwv',
    'socket',
    'angularFileUpload',
    'printRouter',
    'LoggedHomeRouter',
    'setPasswordRouter',
    'esTranslation',
    'enTranslation',
    'practitionersService',
    'statisticsService',
    'usersService',
    'organizationsService',
    'diagnosticOrderService',
    'observationService',
    'nodeAdministratorService',
    'diagnosticReportService',
    'nodeAdministratorService',
    'patientsService',
    'procedureRequestService',
    'appointmentService',
    'notificationService',
    'listService',
    'Materialize',
    'ngSanitize',
    'callerService',
    'auxiliarService',
    'angular-web-notification'
]);
adistalApp.constant('config', {
    api_url: 'https://api.url',
    front_url: '/',
    webrtc_url: 'https://exo-webrtc.exoservices.com.ar',
    user_validation: new RegExp('^(([A-z0-9]){4,20})$'),
    pass_validation: new RegExp('^(([A-z0-9@]){8,20})$')
});
adistalApp.factory('userData', function(store) {
    return store.getNamespacedStore('userData');
});
adistalApp.config(function(config, $stateProvider, $authProvider, $urlRouterProvider, $translateProvider) {
    $authProvider.loginUrl = config.api_url + '/api/login';
    $authProvider.signupUrl = config.api_url + '/api/signup';
    $authProvider.tokenName = 'token';

    $stateProvider
        .state('home', {
            url: '/',
            noLoginRequired: true,
            views: {
                'login': {
                    templateUrl: 'templates/login.html',
                    controller: 'loginController'
                }
            }
        })
        .state('logout', {
            url: '/logout',
            views: {
                'login': {
                    templateUrl: 'templates/login.html',
                    controller: 'logoutController'
                }
            }
        });
    $urlRouterProvider.otherwise('/');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('es');
});

adistalApp.run(function($rootScope, $state, $log, $auth, userData, Materialize, socket, $window, appointmentService, userService, config, $document, moment) {
    var currentToState = {};
    $rootScope.enable_exit = false;
    $rootScope.version = '06/04/2018 Adistal R2 - v2.35';
    function disableChangeState(state) {
        if (state.restricted) {
            return !$rootScope.isEnabled(state.name);
        }
        return false;
    }

    function enablePractitionerOrganizations() {
        if (userData.get('user') !== null && typeof userData.get('user').username !== 'undefined') {
            $rootScope.username = userData.get('user').username;
            $rootScope.userId = userData.get('user')._id;
            if (userData.get('user').type === 'Practitioner') {
                $rootScope.isPractitioner = true;
                $rootScope.myOrganizationList = userData.get('myOrganizationList');
                $rootScope.currentOrganization = userData.get('currentOrganization');
            }
        }
    }

    function callState() {
        appointmentService.callState(userData.get('user')._id).then(function(appointments) {
            if (appointments.data.length === 1) {
                $rootScope.appointmentToCancel = appointments.data[0]._id;
            }
            if(appointments.data.length > 0) {
                $rootScope.windowsVideoCall = true;
                $rootScope.waitingVideoCall = true;
                $rootScope.cancelVideoCall = true;
                $rootScope.roomAvailable = false;
            } else {
                $rootScope.windowsVideoCall = false;
                $rootScope.waitingVideoCall = false;
                $rootScope.cancelVideoCall = false;
                $rootScope.roomAvailable = false;
            }
        }).catch($log.error);
    }

    function checkDiscarProcedure(toState) {
        currentToState = toState;
        var discardModal = $document.find('#modal-discard');
        discardModal.modal();
        discardModal.modal('open');
    }

    $rootScope.gotoMenu = function() {
        var discardModal = $document.find('#modal-discard');
        discardModal.modal();
        discardModal.modal('close');
        $rootScope.enable_exit = true;
        return $state.go(currentToState.name);
    };

    $rootScope.returntoForm = function() {
        var discardModal = $document.find('#modal-discard');
        discardModal.modal();
        discardModal.modal('close');
    };

    $rootScope.checkRoom = function() {
        appointmentService.checkRooms(userData.get('user')._id).then(function(appointments) {
            if (appointments.data.length === 1) {
                $rootScope.appointmentToCancel = appointments.data[0]._id;
            }
            if(appointments.data.length > 0) {
                $rootScope.windowsVideoCall = true;
                $rootScope.waitingVideoCall = false;
                $rootScope.cancelVideoCall = true;
                $rootScope.roomAvailable = true;
                $rootScope.roomId = appointments.data[0].slot[0].reference;
            } else {
                $rootScope.windowsVideoCall = false;
                $rootScope.waitingVideoCall = false;
                $rootScope.cancelVideoCall = false;
                $rootScope.roomAvailable = false;
            }
        }).catch($log.error);
    };

    $rootScope.goToRoom = function() {
        $rootScope.windowsVideoCall = false;
        $window.location.href = config.webrtc_url + '/room?r=' + $rootScope.roomId + '&t=' + $auth.getToken();
    };

    function changeOldToken() {
        var payload = $auth.getPayload();
        var expirationParsed = moment(new Date(payload.exp * 1000)).format('DD MMM YYYY hh:mm a'); //parse string
        var expirationParsedToMoment = moment(expirationParsed);
        var momentActualDate = moment(new Date());
        var datesDifference = expirationParsedToMoment.diff(momentActualDate, 'minutes');
        if($auth.getToken()) {
            if (datesDifference < 5) {
                userService.checkTokenToRefresh()
                .then(function(resp) {
                    $auth.setToken(resp.data.data.token);
                });
            }
        }
    }

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState) {
            $rootScope.currentState = toState.name;
            if ((toState.noLoginRequired !== true && !$auth.isAuthenticated()) || disableChangeState(toState)) {
                event.preventDefault();
                if (!$auth.isAuthenticated()) {
                    $state.go('home');
                }
            }
            if ($auth.isAuthenticated()) {
                changeOldToken();
                enablePractitionerOrganizations();
                $rootScope.checkRoom();
                callState();

                if((fromState.name === 'procedure_new' || fromState.name === 'diagnostic_report_order') && !$rootScope.enable_exit) {
                    event.preventDefault();
                    checkDiscarProcedure(toState);
                }else if ($rootScope.enable_exit) {
                    $rootScope.enable_exit = false;
                }
            }
            return;
        });
    $rootScope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    if ($rootScope.isAuthenticated()) {
        $rootScope.checkRoom();
        callState();
    }

    function checkSubRolCallcenter(modelName) {
        if ($rootScope.isPractitionerCallcenter() && (modelName === 'loggedhome' || modelName === 'resend_procedure' || modelName === 'new_request')) {
            return false;
        }
        return true;
    }

    function checkSubRolPractitioner(modelName) {
        if(userData.get('user').type === 'Practitioner' && userData.get('user').role.sub_role) {
            if($rootScope.isPractitionerClient() && (modelName === 'practitioner_report' || modelName === 'my_reports' || modelName === 'home_callcenter')) {
                return false;
            }else if ($rootScope.isPractitionerLender() && (modelName === 'new_request' || modelName === 'home_callcenter' || modelName === 'resend_procedure')) {
                return false;
            }
            return checkSubRolCallcenter(modelName);
        }
        return true;
    }

    function checkEnableHome(state) {
        return state !== 'loggedhome' && state !== 'home_callcenter';
    }

    $rootScope.isEnabled = function(modelName) {
        $rootScope.headerIcon = 'admin activo';
        if (userData.get('user') && userData.get('user').type === 'Practitioner') {
            $rootScope.headerIcon = 'profesionalact';
        }
        var accessibleModels = {
            'Coordinator': ['users', 'coordinator_abm', 'node_admin_abm', 'organization_abm', 'practitioner_abm', 'usersEdit', 'my_reports', 'new_report'],
            'Node Administrator': ['users', 'diagnostic_report_abm', 'diagnostic_order_abm', 'users-view', 'structure', 'procedure_request_abm',
                'practitioner_abm', 'patient_abm', 'organization_abm', 'practitioner_add',
                'diagnostic_report_details', 'changePriority', 'node_adm_detail', 'usersEdit', 'create_user', 'delete_user', 'notification', 'home_node_administrator'
            ],
            'Organization Administrator': ['organization_abm', 'practitioner_abm', 'usersEdit', 'new_report'],
            'Practitioner': ['organization_abm', 'practitioner_abm', 'patient_abm', 'diagnostic_report_abm', 'procedure_request_abm', 'users-view',
                'diagnostic_order_abm', 'practitioner_report', 'notification', 'my_reports', 'new_request', 'new_report', 'structure', 'loggedhome',
                'home_callcenter', 'resend_procedure'
            ],
            'Admin': ['*'],
            'General Administrator': ['*'],
            'Auxiliar': ['patient_abm', 'diagnostic_report_abm', 'procedure_request_abm', 'users-view',
                'diagnostic_order_abm', 'practitioner_report', 'notification', 'my_reports', 'new_report', 'loggedhome',
                'resend_procedure'
            ]
        };
        if (userData.get('user') !== null && typeof userData.get('user').type !== 'undefined') {
            if (typeof accessibleModels[userData.get('user').type] !== 'undefined') {
                if ((accessibleModels[userData.get('user').type].indexOf(modelName) !== -1 ||
                    (accessibleModels[userData.get('user').type].indexOf('*') !== -1 && checkEnableHome(modelName))) && checkSubRolPractitioner(modelName)) {
                    return true;
                }
                return false;
            }
            return false;
        }
        return true;
    };
    $rootScope.isPractitionerClient = function isPractitionerClient() {
        return (userData.get('user').role && userData.get('user').role.practitioner && userData.get('user').role.sub_role && userData.get('user').role.sub_role === 'CLIENT');
    };

    $rootScope.isPractitionerLender = function isPractitionerLender() {
        return (userData.get('user').role && userData.get('user').role.practitioner && userData.get('user').role.sub_role && userData.get('user').role.sub_role === 'LENDER');
    };

    $rootScope.isPractitionerCallcenter = function isPractitionerCallcenter() {
        return (userData.get('user').role && userData.get('user').role.practitioner && userData.get('user').role.sub_role && userData.get('user').role.sub_role === 'CALLCENTER');
    };

    $rootScope.deleteFromArray = function(array, index) {
        if (array.length > 1) {
            array.splice(index, 1);
        }
    };

    $rootScope.acceptCall = function() {
        $rootScope.enableAcceptCall = false;
        $window.location.href = $rootScope.dataUrlClient.callUrl + '&t=' + $auth.getToken();
    };

    $rootScope.finishCallClient = function() {
        var dataAppointment = {
            appointmentId: $rootScope.appointmentToCancel
        };
        appointmentService.cancelCall(dataAppointment).then(function() {
            $rootScope.windowsVideoCall = false;
        }).catch($log.error);
    };

    $rootScope.selectOrganization = function(reference) {
        userData.get('myOrganizationList').forEach(function(roleItem) {
            if (roleItem.reference === reference) {
                $rootScope.currentOrganization = {};
                $rootScope.currentOrganization.display = roleItem.display;
                $rootScope.currentOrganization.reference = roleItem.reference;
                userData.set('currentOrganization', $rootScope.currentOrganization);
            }
        });
        $state.go('patient_abm');
    };

    $rootScope.showDialog = function(msg, time) {
        var timeout = time || 4000;
        Materialize.toast(msg, timeout);
    };
    if ($rootScope.isAuthenticated()) {
        var token = $auth.getToken();
        socket.emit('login', token);
    }

    $rootScope.closeExplication = function closeExplication() {
        $rootScope.enableExplication = false;
        $rootScope.explicationText = false;
    };

    $rootScope.openExplication = function openExplication() {
        $rootScope.enableExplication = true;
        $rootScope.explicationText = true;
    };
});
adistalApp.filter('getRootState', function() {
    return function(val) {
        var rootState;
        var values = ['-', '_', '.'];
        var flag = false;
        Object.keys(values).forEach(function(key) {
            if(flag === false && val) {
                if(val.indexOf(values[key]) !== -1) {
                    rootState = val.substring(0, val.indexOf(values[key]));
                    flag = true;
                } else {
                    rootState = val;
                }
            }
        });
        if (rootState === 'diagnosticOrderByType') {
            rootState = 'procedure';
        }
        return rootState;
    };
});

adistalApp.filter('setViewDate', ['moment', function(moment) {
    return function(data) {
        var dateParsed = moment(data.date).format('DD/MM/YY');
        if (data.type) {
            dateParsed = moment(data.date).format('DD/MM/YY, h:mm:ss a');
        }
        return dateParsed;
    };
}]);
