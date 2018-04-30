'use strict';

angular.module('adistalApp')
    .controller('setPassword', function($scope, $log, $rootScope, $translate, $stateParams, $state, utilities, $interval, userService, $document) {
        $scope.user = {};
        $document.find('#confirmUpdateModal').modal();
        function showAndHiddenMjs(mjs) {
            $scope.error_msg = mjs;
            $interval(function() {
                delete $scope.error_msg;
            }, 3000);
        }
        if(!$stateParams.token) {
            $state.go('home');
        }
        $scope.updatePass = function updatePass() {
            if ($scope.user.password_repeat !== 'undefined' && $scope.user.password !== 'undefined') {
                if (!userService.validPassword($scope.user.password) || !userService.validPassword($scope.user.password_repeat)) {
                    showAndHiddenMjs($translate.instant('MINIMUM_LENGTH_8_CHARACTERS'));
                    return;
                }
                if ($scope.user.password_repeat !== $scope.user.password) {
                    showAndHiddenMjs($translate.instant('ERROR_PASS_REPEAT_PASS'));
                    return;
                }
                userService.updatePassword({pass: $scope.user.password, token: $stateParams.token})
                .then(function() {
                    $document.find('#confirmUpdateModal').modal('open');
                    $interval(function() {
                        $document.find('#confirmUpdateModal').modal('close');
                        $state.go('home');
                    }, 5000);
                }).catch(function(err) {
                    showAndHiddenMjs(err);
                });
            }
        };
    })
    .controller('selectRoleController', function($scope, userData, $rootScope, $stateParams, $state) {
        $scope.userRolesList = userData.get('myOrganizationList');
        var roleIndex = '';

        $scope.selectRol = function(rol) {
            $rootScope.selectRolEnable = false;
            userData.get('myOrganizationList').map(function(item) {
                return item.reference;
            }).find(function(orgId, index) {
                if (orgId === rol.reference) {
                    roleIndex = index;
                    return true;
                }
                return false;
            });
            $rootScope.currentOrganization = {};
            $rootScope.currentOrganization.display = userData.get('myOrganizationList')[roleIndex].display;
            $rootScope.currentOrganization.reference = userData.get('myOrganizationList')[roleIndex].reference;
            userData.set('currentOrganization', $rootScope.currentOrganization);
            var user = userData.get('user');
            user.role.sub_role = rol.rol;
            userData.set('user', user);
            if ($rootScope.isPractitionerCallcenter()) {
                return $state.go('loggedhomecallcenter');
            }
            return $state.go('loggedhome');
        };
    });
