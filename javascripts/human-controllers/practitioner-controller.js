'use strict';
angular.module('adistalApp')

    .controller('simpleEditPractitionerCtrl', function($scope, $http, $stateParams, config, $q, $state, utilities, $log, organizationsService, practitionerService, $translate, $rootScope) {
        $rootScope.title = $translate.instant('PRACTITIONER');
        $rootScope.description = '';
        var practitionerId = $stateParams.id;
        $scope['_id'] = practitionerId;
        $scope.error_msg = '';
        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.qualification = [{
            code: [{
                coding: [{}],
                text: 'NONE'
            }]
        }];
        $scope.address = [{}];
        $scope.name = {};
        $scope.type = '';
        $scope.telecom = [{
            'system': 'phone home'
        }, {
            'system': 'phone'
        }, {
            'system': 'email'
        }];
        $scope.photo = [];
        $scope.data = {
            active: true
        };
        $scope.practitionerRole = [];
        organizationsService.getAllOrganizations().then(function(orgResp) {
            $scope.organizations = orgResp.data;
        }).catch($log.error);

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            practitionerService.getPractitionerById($stateParams.id)
                .then(function(practitioner) {
                    Object.keys(practitioner.data).forEach(function(key) {
                        if (!(Array.isArray(practitioner.data[key]) && practitioner.data[key].length === 0)) {
                            $scope[key] = practitioner.data[key];
                        }
                        if (Object.keys($scope.address).length === 0) {
                            $scope.voidLength = 'false';
                        }
                    });
                    if($scope.qualification && $scope.qualification.length > 0 && $scope.qualification[0].code && $scope.qualification[0].code.text) {
                        $scope.typePractitionerTranslate = $translate.instant($scope.qualification[0].code.text);
                    }
                    if (practitioner.data.photo) {
                        $scope.file_upload = practitioner.data.photo[0];
                    }
                    return $scope;
                }).then(function(practitioner) {
                    return practitionerService.getPractitionerRoleByIdPractitioner(practitioner._id);
                }).then(function(practitionerRole) {
                    $scope.practitionerRole = practitionerRole.data;
                    $log.info($scope.practitionerRole);
                }).catch(function(err) {
                    $log.error(err);
                });
        }

        $scope.savePractitioner = function() {
            if($scope.name.text) {
                var newPractitioner = {
                    identifier: $scope.identifier,
                    gender: $scope.gender,
                    address: $scope.address,
                    telecom: $scope.telecom,
                    name: $scope.name,
                    photo: $scope.photo,
                    active: $scope.active,
                    qualification: $scope.qualification
                };
                Object.keys($scope.data).forEach(function(key) {
                    newPractitioner[key] = $scope.data[key];
                });
                $q(function(resolve) {
                    if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                        return resolve(practitionerService.putPractitionerById($stateParams.id, newPractitioner));
                    }
                    return resolve(practitionerService.postPractitioner(newPractitioner));
                })
            .then(function() {
                Object.keys($scope.practitionerRole).forEach(function(key) {
                    if (!$scope.practitionerRole[key]._id) {
                        var data = {
                            practitioner: {
                                display: $scope.name.text,
                                reference: practitionerId
                            },
                            code: [{
                                text: $scope.type
                            }],
                            organization: $scope.practitionerRole[key].organization,
                            specialty: $scope.practitionerRole[key].specialty
                        };
                        practitionerService.savePractitionerRole(data).then(function() {
                            return;
                        }).catch(function(error) {
                            $log.error('postPractitionerRole: ', error);
                            $scope.error_msg = error.data.error.message;
                        });
                    }
                    return;
                });
            }).then(function() {
                $state.go('practitioner_abm');
            }).catch(function(err) {
                $log.error(err);
            });
            } else {
                $scope.error_msg = $translate.instant('NAME_IS_REQUIRED');
            }
        };

        $scope.cancelPractitioner = function() {
            $state.go('practitioner_abm');
        };

        $scope.filterTypesOrganizations = function filterTypesOrganizations(practitionerType) {
            if (practitionerType === 'BOTH' || practitionerType === 'NONE') {
                $scope.organizations = $scope.allOrganizations;
            } else if (practitionerType !== 'BOTH') {
                $scope.organizations = $scope.organizations.filter(function(item) {
                    return (item.identifier.length > 0 && item.identifier[0].use === practitionerType);
                });
            }
        };
    })
    .controller('selectOrganizationCtrl', function($scope, $rootScope, $log, $state) {
        $scope.doneOrganization = function() {
            $state.go('patient_abm');
        };

    });
