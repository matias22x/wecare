'use strict';
angular.module('adistalApp')
    .controller('organizationListCtrl', function($scope, $http, config, $log, organizationsService, userData, $rootScope, $translate) {
        $scope.properties = ['Name', 'Type', 'Description'];
        $scope.organizationListView = [];
        $rootScope.title = $translate.instant('ORGANIZATIONS');
        $rootScope.description = '';
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
        
        organizationsService.getAllOrganizations()
            .then(function(resp) {
                $scope.organization_list = resp.data;
                $scope.treeList = makeTree($scope.organization_list);
                $scope.organizationListView = $scope.organization_list.map(function(item) {
                    return {
                        _id: item._id,
                        identifier: item._id,
                        name: item.name,
                        type: $translate.instant(item.identifier[0].use),
                        createdAt: new Date(item.createdAt).toDateString(),
                        description: (item.identifier.length > 0 ? item.identifier[0].value : '-')
                    };
                });
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteOrganization = function(organizationIndex) {
            var id = $scope.organization_list[organizationIndex]._id;
            organizationsService.deleteOrganizationById(id);
            $scope.organization_list.splice(organizationIndex, 1);
        };
        $scope.isPractitioner = false;
        if (userData.get('user') !== null &&
            typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
            $scope.isPractitioner = true;
        }
    })
