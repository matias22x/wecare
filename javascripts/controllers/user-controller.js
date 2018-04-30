'use strict';
angular.module('adistalApp')
    .controller('loginController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, practitionerService, socket, utilities) {
        $scope.login_data = {};
        if ($rootScope.isAuthenticated()) {
            $state.go('users');
        }

        function redirectHomePractitioner(role) {
            practitionerService.getPractitionerRoleByIdPractitioner(role.practitioner)
            .then(function(resp) {
                if (resp.data.length) {
                    var currentOrganization = {
                        reference: resp.data[0].organization.reference,
                        display: resp.data[0].organization.display
                    };
                    userData.set('currentOrganization', currentOrganization);
                    $rootScope.currentOrganization = currentOrganization;
                    var myOrganizationList = [];
                    Object.keys(resp.data).forEach(function(key) {
                        myOrganizationList[key] = resp.data[key].organization;
                        myOrganizationList[key].rol = resp.data[key].code[0].text;
                    });
                    userData.set('myOrganizationList', myOrganizationList);
                    if (resp.data.length > 1) {
                        $rootScope.selectRolEnable = true;
                        return $state.go('select-role');
                    }
                }
                if (role.sub_role === 'CALLCENTER') {
                    return $state.go('loggedhomecallcenter');
                }
                return $state.go('loggedhome');
            });
        }

        function redirectHomeByUserType(userType) {
            if(userType === 'Node Administrator' || userType === 'General Administrator') {
                $state.go('loggedhomeadministrator');
            } else if(userType === 'Practitioner') {
                $rootScope.isPractitioner = true;
                redirectHomePractitioner(userData.get('user').role);
            } else {
                $state.go('users');
            }
        }

        $scope.login = function() {
            var userType = '';
            if (!(config.user_validation.test($scope.login_data.username)) || !(config.pass_validation.test($scope.login_data.password))) {
                $scope.error_msg = $translate.instant('ERROR_USER_PASS');
                return;
            }
            $auth.login($scope.login_data).then(function(response) {
                if (response.data && response.data.user) {
                    userData.set('user', response.data.user);
                    var token = $auth.getToken();
                    socket.emit('login', token);
                    userType = response.data.user.type;
                    redirectHomeByUserType(userType);
                }
            })
            .catch(function(err) {
                $log.error('Error: ', err);
                $scope.error_msg = $translate.instant(utilities.parseToTranslateKey(err.data.message));
            });
        };
    })
    .controller('signUpController', function($auth, $scope, $location, $log) {
        $scope.login_data = {};
        $scope.signup = function() {
            var userdata = $scope.login_data;
            delete userdata.password_repeat;
            $auth.signup(userdata).then(function() {
                $location.path('/');
            }).catch(function(err) {
                $log.error(err.data);
                $scope.error_msg = err.data.errmsg || err.data.message;
            });
        };
    }).controller('logoutController', function($auth, $state, userData, $rootScope, socket) {
        socket.emit('logout');
        $auth.logout();
        userData.remove('user');
        $rootScope.username = '';
        $rootScope.videoCallWindows = false;
        $rootScope.isPractitioner = false;
        $rootScope.currentOrganization = null;
        $rootScope._id = '';
        $rootScope.title = '';
        $rootScope.description = '';
        $state.go('home');
    })
    .controller('userListController', function(config, $http, $state, $scope, $log, userData, userService, $translate, practitionerService, nodeAdministratorService, $rootScope) {
        $scope.userlist = [];
        $scope.selectedUser = {};
        $rootScope.title = $translate.instant('USERS');
        $rootScope.description = '';

        function getUserPromise() {
            userService.getAllUser().then(function(resp) {
                $scope.userlist = resp.data;
                var typeTranslates = {
                    'Node Administrator': $translate.instant('NODE_ADMINISTRATOR'),
                    'Practitioner': $translate.instant('PRACTITIONER'),
                    'Admin': $translate.instant('ADMIN'),
                    'Coordinator': $translate.instant('COORDINATOR'),
                    'Auxiliar': $translate.instant('AUXILIAR'),
                    'Organization Administrator': $translate.instant('ORGANIZATION_ADMINISTRATOR'),
                    'General Administrator': $translate.instant('GENERAL_ADMINISTRATOR')
                };
                $scope.userlist.forEach(function(user) {
                    if (user._id === userData.get('user')._id) {
                        user.noDelete = true;
                    }
                    var currentType = user.type;
                    if (Object.keys(typeTranslates).indexOf(currentType) !== -1) {
                        user.type = typeTranslates[currentType];
                    } else {
                        user.type = typeTranslates['DEFAULT_TYPE'];
                    }
                });
                return $scope.userlist;
            }).catch($log.error);
        }
        getUserPromise();

        $scope.propertyName = 'username';
        $scope.reverse = false;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ?
                !$scope.reverse :
                false;
            $scope.propertyName = propertyName;
        };

        $scope.selectUser = function(user) {
            $scope.selectedUser = user;
        };

        $scope.confirmDeleteUser = function() {
            userService.deleteUserById($scope.selectedUser._id).then(function() {
                $scope.userlist.splice($scope.userlist.indexOf($scope.selectedUser), 1);
                return true;
            }).then(function() {
                if ($scope.selectedUser.role.node_administrator) {
                    return nodeAdministratorService.deleteNodeAdministratorById($scope.selectedUser.role.node_administrator);
                }
                return true;
            }).then(function() {
                if ($scope.selectedUser.role.practitioner) {
                    return practitionerService.deletePractitionerById($scope.selectedUser.role.practitioner);
                }
                return true;
            }).then(function() {
                $state.reload();
            }).catch(function(deleteUserError) {
                $log.error('deleteUserError: ', deleteUserError);
            });
        };
    })
    .controller('userEditController', function($scope, $http, $state, $stateParams, config, $log, utilities, $translate, $location, organizationsService, userService, userData, practitionerService, $rootScope) {
        if ($state.current.name === 'users-edit') {
            $rootScope.title = $translate.instant('EDIT_USER');
            $rootScope.description = '';
        } else {
            $rootScope.title = $translate.instant('VIEW_USER');
            $rootScope.description = '';
        }
        $scope.state = $state.current.name;
        var type = userData.get('user').type;
        var currentId = userData.get('user')._id;
        $scope.type = '';
        var id = $stateParams.id;
        $scope.acknowledgment = false;
        if (currentId === id || type === 'Admin') {
            $scope.acknowledgment = true;
        }
        $scope.error_invalid_email = $translate.instant('ERROR_INVALID_EMAIL');
        $scope.user_data = {};
        $scope.userid = id;
        $scope.referenceOrganization = {};
        $scope.user_data.roles = [{
            title: 'Coordinator'
        }];
        $scope.practitionerRole = [];
        userService.getUserById(id).then(function(resp) {
            var user = resp.data;
            $scope.user_data = user;
            $scope.subRolTranslate = $translate.instant(user.role.sub_role);
            return user;
        }).then(function(user) {
            if (user.type === 'Practitioner') {
                return practitionerService.getPractitionerRoleByIdPractitioner(user.role.practitioner);
            }
            return false;
        }).then(function(resp) {
            if (resp) {
                $scope.practitionerRole = [];
                $scope.practitionerRole = resp.data;
            }
        }).catch(function(err) {
            $log.error(err);
        });

        organizationsService.getOrganizationWithReference().then(function(orgResp) {
            $scope.organizations = orgResp.data;
            $scope.allOrganizations = orgResp.data;
        }).catch($log.error);

        $scope.selectOrganization = function() {
            var organizationId = $scope.user_data.reference;
            for (var j = 0; j < $scope.organizations.length; j++) {
                if ($scope.organizations[j]._id === organizationId) {
                    $scope.referenceOrganization.reference = organizationId;
                    $scope.referenceOrganization.display = $scope.organizations[j].name;
                }
            }
        };

        $scope.filterTypesOrganizations = function filterTypesOrganizations(practitionerType) {
            $scope.type = practitionerType;
            if (practitionerType === 'BOTH' || practitionerType === 'NONE' || practitionerType === 'CALLCENTER') {
                $scope.organizations = $scope.allOrganizations;
            } else if (practitionerType !== 'BOTH') {
                $scope.organizations = $scope.organizations.filter(function(item) {
                    return (item.identifier.length > 0 && item.identifier[0].use === practitionerType);
                });
            }
        };

        function validateUpdate(passFlag) {
            if ($scope.user_data.type === 'Practitioner' && $scope.organizations && $scope.organizations.length < 1) {
                $scope.practitionerErrorMsg = $translate.instant('IT_IS_NECESSARY_TO_CREATE_AN_ORGANIZATION_FIRST');
                return false;
            }
            if (passFlag && !(userService.validUsername($scope.user_data.username) && userService.validPassword($scope.user_data.password))) {
                $scope.error_msg = $translate.instant('ERROR_USER_PASS');
                return false;
            }
            if (!utilities.validEmail($scope.user_data.email)) {
                $scope.error_msg = $translate.instant('ERROR_INVALID_EMAIL');
                return false;
            }
            return true;
        }

        $scope.updateUser = function(passFlag) {
            if(!$scope.user_data.username) {
                $scope.error_msg = $translate.instant('YOU_MUST_ENTER_A_NAME');
                return;
            }

            var userdata = $scope.user_data;

            if (!validateUpdate(passFlag)) {
                return;
            }

            if (typeof passFlag !== 'undefined' && typeof userdata.password_repeat !== 'undefined' && typeof userdata.password !== 'undefined') {
                if (userdata.password_repeat !== userdata.password) {
                    $scope.error_msg = $translate.instant('ERROR_PASS_REPEAT_PASS');
                    return;
                }
            } else if (typeof passFlag === 'undefined') {
                delete userdata.password_repeat;
                delete userdata.password;
            }
            userService.putUserById(id, utilities.stringToDateRecursive(userdata)).then(function(resp) {
                if (userdata.type === 'Practitioner' && resp.data.role.practitioner) {
                    Object.keys($scope.practitionerRole).forEach(function(key) {
                        if (!$scope.practitionerRole[key]._id) {
                            var data = {
                                practitioner: {
                                    display: resp.data.username,
                                    reference: resp.data.role.practitioner
                                },
                                code: [{
                                    text: $scope.type
                                }],
                                organization: $scope.practitionerRole[key].organization,
                                specialty: $scope.practitionerRole[key].specialty
                            };
                            practitionerService.savePractitionerRole(data).then(function() {
                                $state.go('users');
                            });
                        }
                    });
                }
                $state.go('users');
            }).catch(function(err) {
                $log.error(err);
                $scope.error_msg = err.data;
            });
        };
    })
    .controller('createUserController', function(config, $state, $http, $scope, $location, $log, $stateParams, utilities, practitionerService, $translate, userService, organizationsService, $rootScope, $q, $anchorScroll, auxiliarService) {
        $rootScope.title = $translate.instant('NEW_USER');
        $rootScope.description = '';
        $scope.user_data = {};
        $scope.referenceOrganization = {
            reference: '',
            display: ''
        };
        $scope.practitionerRole = [];
        $scope.nameButton = 'SAVE';
        $scope.type = '';
        $scope.error_invalid_email = $translate.instant('ERROR_INVALID_EMAIL');
        var typeDictionary = {
            'coordinator': {
                type: 'Coordinator',
                state: 'coordinator_add',
                stateList: 'coordinator_abm'
            },
            'auxiliar': {
                type: 'Auxiliar',
                state: 'auxiliar_add',
                stateList: 'users'
            },
            'node_administrator': {
                type: 'Node Administrator',
                state: 'node_admin_add',
                stateList: 'node_admin_abm'
            },
            'organization_administrator': {
                type: 'Organization Administrator',
                state: 'organization_administrator_add',
                stateList: 'users'
            },
            'practitioner': {
                type: 'Practitioner',
                state: 'practitioner_add',
                stateList: 'practitioner_abm'
            }
        };

        var redirectStateList = '';
        $scope.enableInputRol = false;
        if (typeof $stateParams.type !== 'undefined' && $stateParams.type !== '') {
            $scope.user_data.type = typeDictionary[$stateParams.type].type;
            $scope.nameButton = 'SAVE';
            $log.info('NEW_' + $stateParams.type.toUpperCase());
            $scope.title = $translate.instant('NEW_' + $stateParams.type.toUpperCase());
            redirectStateList = typeDictionary[$stateParams.type].stateList;
            $scope.multilangRol = $translate.instant($stateParams.type.toUpperCase());
            $scope.enableInputRol = true;
        }
        organizationsService.getOrganizationWithReference('specialties').then(function(orgResp) {
            $scope.organizations = orgResp.data;
            $scope.allOrganizations = orgResp.data;
        }).catch($log.error);

        $scope.selectOrganization = function() {
            var organizationId = $scope.user_data.reference;
            for (var j = 0; j < $scope.organizations.length; j++) {
                if ($scope.organizations[j]._id === organizationId) {
                    $scope.referenceOrganization.reference = organizationId;
                    $scope.referenceOrganization.display = $scope.organizations[j].name;
                }
            }
        };

        function checkErrors(data) {
            if (!userService.validUsername(data.username) || !userService.validPassword(data.password)) {
                return $translate.instant('ERROR_USER_PASS');
            }
            if (data.password !== data.password_repeat) {
                return $translate.instant('ERROR_PASS_REPEAT_PASS');
            }
            if (!utilities.validEmail(data.email)) {
                return $translate.instant('ERROR_INVALID_EMAIL');
            }

            if (data.type === 'Practitioner' && (!$scope.practitionerRole.organization || !$scope.practitionerRole.specialty)) {
                return $translate.instant('IT_IS_NECESSARY_THAT_THE_PRACTITIONER_HAVE_SPECIALTY_AND_ORGANIZATION');
            }

            return false;
        }

        function createAuxiliarRole(user) {
            var newAuxiliarRole = {
                auxiliarRole: [{
                    managingOrganization: $scope.referenceOrganization
                }]
            };
            return auxiliarService.putAuxiliar(user.role.auxiliar, newAuxiliarRole);
        }

        function createOrganizationAdministrator(user) {
            var newOrganizationAdministrator = {
                partOf: [$scope.referenceOrganization]
            };

            return organizationsService.putOrganizationAdministrator(user.role.organization_administrator, newOrganizationAdministrator);
        }


        $scope.filterTypesOrganizations = function filterTypesOrganizations(type) {
            $scope.type = type;
            if (type === 'BOTH' || type === 'NONE' || type === 'CALLCENTER') {
                $scope.organizations = $scope.allOrganizations;
            } else if (type !== 'BOTH') {
                $scope.organizations = $scope.organizations.filter(function(item) {
                    return (item.identifier.length > 0 && (item.identifier[0].use === type || item.identifier[0].use === 'BOTH'));
                });
            }
        };
        $scope.signup = function() {

            var userdata = $scope.user_data;

            if (userdata.type === 'Practitioner' && $scope.organizations && $scope.organizations.length < 1) {
                $scope.practitionerErrorMsg = $translate.instant('IT_IS_NECESSARY_TO_CREATE_AN_ORGANIZATION_FIRST');
                return;
            }

            var errorMsg = checkErrors($scope.user_data);
            if (errorMsg) {
                $scope.error_msg = errorMsg;
                $location.hash('bottom');
                $anchorScroll();
                return;
            }
            if(!$scope.user_data.type) {
                $scope.error_msg = $translate.instant('SELECT_A_ROLE');
                return;
            }else if (($scope.user_data.type === 'Auxiliar' || $scope.user_data.type === 'Organization Administrator') && !$scope.user_data.reference) {

                $scope.error_msg = $translate.instant('SELECT') + ' ' + $translate.instant('ORGANIZATION');
                return;
            }

            var idType;
            userService.postUser(utilities.stringToDateRecursive(userdata)).then(function(resp) {
                if (typeof resp.data.role !== 'undefined' && resp.data.role !== '') {
                    var typeKey = resp.data.type.replace(' ', '_').toLowerCase();
                    idType = resp.data.role[typeKey];
                }
                if (userdata.type === 'Practitioner') {
                    var practitionerId = resp.data.role.practitioner;
                    var allPromesis = Object.keys($scope.practitionerRole).map(function(item, key) {
                        var data = {
                            practitioner: {
                                display: userdata.username,
                                reference: practitionerId
                            },
                            code: [{
                                text: $scope.type
                            }],
                            organization: $scope.practitionerRole[key].organization,
                            specialty: $scope.practitionerRole[key].specialty
                        };
                        return practitionerService.savePractitionerRole(data);
                    });
                    return $q.all(allPromesis);
                }

                if(userdata.type === 'Auxiliar') {
                    return createAuxiliarRole(resp.data);
                }

                if(userdata.type === 'Organization Administrator') {
                    return createOrganizationAdministrator(resp.data);
                }
                return null;
            }).then(function(roleResp) {
                if (Array.isArray(roleResp)) {
                    $state.go('practitioner_abm');
                    return;
                }
                $state.go('users');
                return;
            }).catch(function(err) {
                if(err.data[0].originalMessage.indexOf('email') !== -1) {
                    $scope.error_msg = $translate.instant('EMAIL_ALREADY_EXISTS');
                } else {
                    $scope.error_msg = $translate.instant('USER_ALREADY_EXISTS');
                }
            });
        };

        $scope.cancel = function() {
            $state.go(redirectStateList);
        };
    })
    .controller('loggedHomeController', function(diagnosticOrderService, diagnosticReportService, procedureRequestService, userData, $log, $scope, $translate, moment, $rootScope) {
        $rootScope.title = $translate.instant('HOME');
        $rootScope.description = '';
        $scope.countPages = 1;
        var page = 0;
        $scope.arrayPages = [];
        $scope.errorOrderMsg = '';
        $scope.errorReportMsg = '';
        $scope.diagnosticOrders = [];
        $rootScope.currentUserId = userData.get('currentOrganization')._id;
        $scope.getDiagnosticPerPage = function() {
            procedureRequestService.getProceduresCount()
            .then(function() {
                if ($rootScope.isPractitionerLender()) {
                    return diagnosticReportService.getSkippedReportLender(userData.get('currentOrganization').reference);
                }
                if ($rootScope.isPractitionerClient()) {
                    return procedureRequestService.getSkippedProceduresClient(userData.get('currentOrganization').reference);
                }

                return procedureRequestService.getSkippedProcedures();
            })
            .then(function(orders) {
                if ($rootScope.isPractitionerLender()) {
                    Object.keys(orders.data).forEach(function(key) {
                        procedureRequestService.getProcedureRequest(orders.data[key].basedOn[0].reference)
                        .then(function(procedure) {
                            $scope.diagnosticOrders[key] = {
                                _id: orders.data[key].basedOn[0].reference,
                                status: procedure.data.status,
                                identifier:[{
                                    system: orders.data[key].identifier[0].value
                                }]
                            };
                            $scope.diagnosticOrders[key].createdAt = orders.data[key].createdAt;
                        });
                    });
                } else {
                    $scope.diagnosticOrders = orders.data;
                }
            })
            .catch(function(error) {
                $log.info(error);
            });
        };

        $scope.getDiagnosticPerPage(page);

        $scope.determinateClass = function(status) {
            var requestHome = ['requested', 'commented', 'revision', 'received'];
            var finishHome = ['completed'];
            var answered = ['answered'];
            var cancelHome = ['suspended', 'cancelled', 'rejected'];

            if (requestHome.indexOf(status) !== -1) {
                return 'request_home';

            } else if (finishHome.indexOf(status) !== -1) {
                return 'finish_home';

            } else if (answered.indexOf(status) !== -1) {
                return 'answered';

            } else if (cancelHome.indexOf(status) !== -1) {
                return 'cancel_home';
            }
            return false;
        };

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === $scope.propertyName) ?
          !$scope.reverse :
          false;
            $scope.propertyName = propertyName;
        };
    })
    .controller('loggedHomeAdministratorController', function(diagnosticOrderService, diagnosticReportService, procedureRequestService, userData, $log, $scope, $translate, moment, $rootScope, $q, statisticsService) {
        $rootScope.title = $translate.instant('HOME');
        statisticsService.getstatisticsByOrganization().then(function(resp) {
            $scope.organizationsData = resp.data.info;
        }).catch(function(err) {
            $log.error('ERROR', err);
        });

    });
