'use strict';
angular.module('adistalApp')
    .controller('patientListCtrl', function($scope, $http, config, $log, moment, $rootScope, $translate, patientsService, $state, userData, $q) {
        $rootScope.title = $translate.instant('PATIENTS');
        $rootScope.description = $translate.instant('PATIENT_LIST');
        $scope.properties = ['Name', 'Age', 'Gender', 'Created At'];
        $scope.type = userData.get('user').type;
        function prepareList(patients) {
            $scope.patientListView = patients.map(function(item) {
                var itemGender = '';
                if (item.gender === 'M') {
                    itemGender = 'MALE';
                } else if (item.gender === 'F') {
                    itemGender = 'FEMALE';
                } else {
                    itemGender = 'OTHER';
                }
                var now = moment(new Date());
                item.birthDate = moment(item.birthDate);
                var age = now.diff(item.birthDate, 'years');
                return {
                    _id: item._id,
                    identifier: item._id,
                    active: item.active,
                    name: item.name[0].text,
                    age:  age,
                    gender: $translate.instant(itemGender),
                    createdAt: moment(item.createdAt).format('DD/ MM/ YYYY')
                };
            });

            return $q.resolve($scope.patientListView);
        }

        $scope.deletePatient = function(patientIndex) {
            var id = patientIndex._id;
            $http.delete(config.api_url + '/api/patients/' + id);
            $scope.patientListView.splice(patientIndex, 1);
        };
        $scope.validaPatient = function(patient) {
            var newPatient = {
                active: !patient.active
            };
            patient.active = !patient.active;
            patientsService.putPatientById(patient._id, newPatient).catch(function(er) {
                $log.error('Error: ', er);
            });
        };

        $scope.searchPatient = function(word) {
            var promiseToGet;
            if(word) {
                promiseToGet = patientsService.searchPatient(word).then(function(resp) {
                    var listPrepared = prepareList(resp.data);
                    return listPrepared;
                });
            } else {
                promiseToGet = patientsService.getAllPatient().then(function(resp) {
                    var listPrepared = prepareList(resp.data);
                    return listPrepared;
                });
            }
            return promiseToGet;
        };

        if ($state.params.search) {
            $scope.searchWord = $state.params.search;
            $scope.searchPatient($state.params.search);
        }else {
            $scope.searchPatient();
        }

    });
