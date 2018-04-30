'use strict';
angular.module('adistalApp')
    .controller('practitionerListCtrl', function($scope, $http, userData, config, $log, practitionerService, $q, moment, $translate, $rootScope) {
        $scope.properties = ['Name', 'Role', 'Organization', 'Created At'];
        $rootScope.title = $translate.instant('PRACTITIONERS');
        $rootScope.description = '';
        practitionerService.getAllPractitioner()
            .then(function(resp) {
                $scope.practitioner_list = resp.data;
                var practitionerListData = $scope.practitioner_list.map(function(item) {
                    var role = item.qualification.length > 0 && typeof item.qualification[0].code.text !== 'undefined' ? item.qualification[0].code.text : '-';
                    role = $translate.instant(role);
                    return practitionerService.getPractitionerRoleByIdPractitioner(item._id)
                        .then(function(practitionerRol) {
                            var organization = practitionerRol.data.length > 0 && typeof practitionerRol.data[0].organization !== 'undefined' ? practitionerRol.data[0].organization.display : '-';
                            return {
                                _id: item._id,
                                identifier: item._id,
                                role: role,
                                name: item.name.text,
                                organization: organization,
                                createdAt: moment(item.createdAt).format('DD/ MM/ YYYY')
                            };
                        });
                });
                $q.all(practitionerListData).then(function(practitionerList) {
                    $scope.practitionerListView = practitionerList;
                });
            }).catch(function(err) {
                $log.error(err);
            });

        $scope.userType = userData.get('user').type;

        $scope.confirmDelete = function(itemToDelete) {
            practitionerService.deletePractitionerById(itemToDelete._id)
                .then(function() {
                    return practitionerService.deleteUserByPractitioner(itemToDelete._id);
                }).then(function() {
                    $scope.practitionerListView.splice($scope.practitionerListView.indexOf(itemToDelete), 1);
                }).catch(function(deletePractitionerError) {
                    $log.error('deletePractitionerError: ', deletePractitionerError);
                });
            $log.info(itemToDelete);
        };
    });
