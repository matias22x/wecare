'use strict';
angular.module('adistalApp')
    .controller('simpleEditOrganizationCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log, $translate, organizationsService, practitionerService, $rootScope, $q, $anchorScroll, $location, $timeout, $document) {
        $rootScope.description = '';
        if ($state.current.name === 'organization_view') {
            $rootScope.title = $translate.instant('VIEW_ORGANIZATION');
        } else if($state.current.name === 'organization_add') {
            $rootScope.title = $translate.instant('NEW_ORGANIZATION');
            if ($stateParams.id) {
                $rootScope.title = $translate.instant('EDIT') + ' ' + $translate.instant('ORGANIZATION');
            }
        }

        $document.find('#modal10').modal();
        var organizationId = $stateParams.id;
        $scope._id = organizationId;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.type = {
            coding: [{}]
        };
        $scope.address = [{
            use: 'Home'
        }, {
            use: 'Email'
        }];
        $scope.name = '';
        $scope.telecom = [{
            'use': 'phone'
        }, {
            'use': 'email'
        }];
        $scope.partOf = {};
        $scope.contact = [{
            name: '',
            telecom: [{
                'use': 'phone'
            }, {
                'use': 'email'
            }],
            purpose: {
                coding: [{}]
            },
            address: {}
        }];
        $scope.data = {
            active: true
        };
        $scope.organizations = [];
        var flagLimit = false;
        var organizationsToUse = [];
        var organizationsToDelete = [];

        function relationChild(parent, childList) {
            var auxArray = [];
            childList.forEach(function(item) {
                var referenceId = parent._id;
                if (item.partOf && referenceId === item.partOf.reference) {
                    if (!parent.childs) {
                        parent.childs = [];
                    }
                    parent.childs.push(item);
                } else {
                    auxArray.push(item);
                }
            });
            childList = auxArray;
            if (parent.childs) {
                parent.childs.forEach(function(item) {
                    relationChild(item, childList);
                });
            }
        }

        function makeTree(organizationList) {
            var parentList = [];
            var other = [];
            organizationList.forEach(function(organization) {
                if (typeof organization.partOf === 'undefined' || (typeof organization.partOf !== 'undefined' && !organization.partOf.reference)) {
                    parentList.push(organization);
                } else {
                    other.push(organization);
                }
            });

            parentList.forEach(function(item) {
                relationChild(item, other);
            });
            return parentList;
        }

        function getOrganizations() {
            organizationsService.getAllOrganizations()
          .then(function(resp) {
              $scope.organization_list = resp.data;
          }).catch(function(err) {
              $log.error(err);
          });
        }

        getOrganizations();

        $scope.selectSubOrganization = function() {
            var parentOrganizationId = $scope.partOf.reference;
            for (var j = 0; j < $scope.organizations.length; j++) {
                if ($scope.organizations[j]._id === parentOrganizationId) {
                    $scope.partOf.reference = parentOrganizationId;
                    $scope.partOf.display = $scope.organizations[j].name;
                } else {
                    $log.info($scope.organizations[j]._id, ' - ', parentOrganizationId);
                }
            }
        };

        function getAllSpecialties() {
            return practitionerService.getSpeciality().then(function(resp) {
                $scope.allSpecialities = resp.data;
                return;
            });
        }
        var getAllSpecialtiesPromesis = getAllSpecialties();

        function updateAllSpecialities() {
            getAllSpecialtiesPromesis.then(function() {
                $scope.allSpecialities = $scope.allSpecialities.filter(function(item) {
                    var id = $scope.specialties.find(function(specialty) {
                        return specialty._id === item._id;
                    });
                    return !id;
                });
            });
        }

        if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
            $scope.enableMisSpecialities = true;
            organizationsService.getOrganizationById($stateParams.id)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray($scope.data[key]) && $scope.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                    });
                    updateAllSpecialities();
                }).catch(function(err) {
                    $log.error(err);
                });
            organizationsService.getOrganizationNotChild($stateParams.id).then(function(orgResp) {
                $scope.organizations = orgResp.data;
            }).catch($log.error);
        } else {
            organizationsService.getAllOrganizations().then(function(orgResp) {
                $scope.organizations = orgResp.data;
            }).catch($log.error);
        }

        $scope.$watch('selectSpecialities', function(newData) {
            if (newData && newData.indexOf('NEW_SPECIALTY') !== -1) {
                $scope.selectSpecialities.splice(newData.indexOf('NEW_SPECIALTY'), 1);
                $scope.enableNewSpecialtyBox = true;
                var dropdownEspecialties = $document.find('.dropdown-content.select-dropdown.multiple-select-dropdown.active');
                dropdownEspecialties.removeClass('active');
                dropdownEspecialties.css({display: 'none'});
            }
        });

        function checkSpecialitiesFormat() {
            if ($scope.specialties && $scope.specialties.length) {
                var onlyIds = $scope.specialties.map(function(item) {
                    return item._id;
                });
                if ($scope.selectSpecialities && $scope.selectSpecialities.length) {
                    $scope.selectSpecialities = $scope.selectSpecialities.concat(onlyIds);
                }else {
                    $scope.selectSpecialities = onlyIds;
                }
            }
        }

        function checkErrors(organization) {

            if (!organization.name || !organization.identifier[0].value || !organization.telecom[0].value || !organization.telecom[1].value || !organization.specialties || !organization.identifier[0].use || !organization.partOf.reference) {
                return $translate.instant('ALL_FIELDS_ARE_REQUIRED');
            }

            return false;
        }

        function searchOrganizationsToDelete(father, son, tree) {
            if (tree.childs) {
                tree.childs.forEach(function(child) {
                    if (child.name === father) {
                        organizationsToUse.push(child.partOf.display);
                        searchOrganizationsToDelete(child.partOf.display, son, tree);
                        return;
                    }
                    searchOrganizationsToDelete(father, son, child);
                });
            }else if(tree.name !== son) {
                organizationsToDelete.push(tree.name);
            }
        }

        $scope.openModal = function() {

            getOrganizations();

            $scope.newOrganization = {
                identifier:   $scope.identifier,
                address:      $scope.address,
                telecom:      $scope.telecom,
                contact:      $scope.contact,
                type:         $scope.type,
                name:         $scope.name,
                partOf:       $scope.partOf,
                active:       $scope.active,
                specialties:  $scope.selectSpecialities
            };

            $scope.organization_list.push($scope.newOrganization);
            $scope.treeList = makeTree($scope.organization_list);

            organizationsToUse.push($scope.newOrganization.name);
            organizationsToUse.push($scope.newOrganization.partOf.display);

            searchOrganizationsToDelete(organizationsToUse[1], organizationsToUse[0], $scope.treeList[0]);

            $document.find('#modal10').modal('open');
        };


        $scope.cancelOrganizationSave = function() {
            $scope.organization_list.pop();
        };

        $scope.saveOrganization = function() {
            var errorMsg = checkErrors($scope.newOrganization);

            if (errorMsg) {
                $scope.error_msg = errorMsg;
                $location.hash('bottom');
                $anchorScroll();
                return;
            }

            checkSpecialitiesFormat();


            Object.keys($scope.data).forEach(function(key) {
                $scope.newOrganization[key] = $scope.data[key];
            });
            if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '') {
                organizationsService.putOrganizationById($stateParams.id,
                utilities.stringToDateRecursive($scope.newOrganization))
                .then(function() {
                    $state.go('organization_abm');
                }).catch(function(err) {
                    $log.error(err);
                });
            } else {
                organizationsService.postOrganization(utilities.stringToDateRecursive($scope.newOrganization))
                .then(function() {
                    $state.go('organization_abm');
                }).catch(function(err) {
                    $log.error(err);
                });

            }
        };

        $scope.cancelOrganization = function() {
            $state.go('organization_abm');
        };

        $scope.removeSpecialtiy = function removeSpecialtiy(index) {
            $scope.specialties.splice(index, 1);
        };

        $scope.addSpecialty = function addSpecialty() {
            var newData = {
                title: 'speciality',
                value: {
                    text: $scope.newSpecialty
                }
            };
            practitionerService.saveSpeciality('post', newData).then(function(resp) {
                $scope.allSpecialities.push(resp.data);
                $scope.newSpecialty = '';
                $scope.enableNewSpecialtyBox = false;
            });
        };

    });
