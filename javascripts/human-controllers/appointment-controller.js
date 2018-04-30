'use strict';
angular.module('adistalApp')
    .controller('simpleAppointmentCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {
        var appointmentId = $stateParams.id;

        $scope._id = appointmentId;

        $scope.status = '';
        $scope.priority = 0;
        $scope.description = '';
        $scope.start = '';
        $scope.end = '';
        $scope.minutesDuration = 0;
        $scope.comment = '';

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.participant = [{
            type: [{
                coding: [{}]
            }],
            status: '',
            required: '',
            actor: {}
        }];

        $scope.type = {
            coding: [{}]
        };

        $scope.reason = {
            coding: [{}]
        };

        $scope.slot = [{
            coding: [{}]
        }];
        if (typeof appointmentId !== 'undefined') {
            $http.get(config.api_url + '/api/appointments/' + appointmentId)
                .then(function(resp) {
                    Object.keys(resp.data).forEach(function(key) {
                        if (!(Array.isArray(resp.data[key]) && resp.data[key].length === 0)) {
                            $scope[key] = resp.data[key];
                        }
                    });
                }).catch(function(err) {
                    $log.error(err);
                });
        }

        $scope.saveAppointment = function() {
            var newItem = {
                identifier: $scope.identifier,
                type: $scope.type,
                reason: $scope.reason,
                slot: $scope.slot,
                participant: $scope.participant,
                status: $scope.status,
                priority: $scope.priority,
                description: $scope.description,
                start: $scope.start,
                end: $scope.end,
                comment: $scope.comment,
                minutesDuration: $scope.minutesDuration
            };

            if (typeof appointmentId !== 'undefined' && appointmentId !== '') {
                $http.put(config.api_url + '/api/appointments/' + appointmentId, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('appointment_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/appointments', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('appointment_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };

        $scope.cancelAppointment = function() {
            $state.go('appointment_abm');
        };

    });
