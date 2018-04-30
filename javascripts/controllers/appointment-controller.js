'use strict';
angular.module('adistalApp')
    .controller('appointmentListCtrl', function($scope, $http, config, $log) {
        $scope.properties = ['Type', 'Start', 'Created At'];
        $http.get(config.api_url + '/api/appointments')
            .then(function(resp) {
                $scope.appointment_list = resp.data;
                $scope.appointmentsListView = $scope.appointment_list.map(function(item) {
                    return {
                        _id: item._id,
                        identifier: item._id,
                        createdAt: new Date(item.createdAt).toDateString(),
                        type: item.type && item.type.text || '-',
                        start: new Date(item.start).toDateString()
                    };
                });
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteAppointment = function(appointmentIndex) {
            var id = $scope.appointment_list[appointmentIndex]._id;
            $http.delete(config.api_url + '/api/appointments/' + id);
            $scope.appointment_list.splice(appointmentIndex, 1);
        };
    })
    .controller('editAppointmentCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {
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

        $scope.addParticipant = function() {
            $scope.participant.push({
                type: [{
                    coding: [{}]
                }],
                status: '',
                required: '',
                actor: {}
            });
        };

        $scope.removeParticipant = function(index) {
            if ($scope.participant.length > 1) {
                $scope.participant.splice(index, 1);
            }
        };

        if (typeof $stateParams.appointment_id !== 'undefined') {
            $http.get(config.api_url + '/api/appointments/' + $stateParams.appointment_id)
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

            if (typeof $stateParams.appointment_id !== 'undefined' && $stateParams.appointment_id !== '') {
                $http.put(config.api_url + '/api/appointments/' + $stateParams.appointment_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('appointment');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/appointments', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('appointment');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editAppointmentStatus', function($scope) {
        $scope.title = 'Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentPriority', function($scope) {
        $scope.title = 'Number';
        $scope.model_name = 'number';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentDescription', function($scope) {
        $scope.title = 'Description';
        $scope.subtitle = 'Text';
        $scope.model_name = 'Text';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentStart', function($scope) {
        $scope.title = 'Start';
        $scope.subtitle = 'Date';
        $scope.model_name = 'start';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentEnd', function($scope) {
        $scope.title = 'End';
        $scope.subtitle = 'Date';
        $scope.model_name = 'end';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentMinutesDuration', function($scope) {
        $scope.title = 'Minutes Duration';
        $scope.subtitle = 'Number';
        $scope.model_name = 'minutesDuration';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentComment', function($scope) {
        $scope.title = 'Comment';
        $scope.subtitle = 'Text';
        $scope.model_name = 'comment';
        $scope.data = $scope.$parent;
    })
    .controller('editAppointmentTypeText', function($scope) {
        $scope.title = 'Type Text';
        $scope.codeableConcept = $scope.$parent.type;
    })
    .controller('editAppointmentTypeCoding', function($scope, $stateParams) {
        $scope.title = 'Type Coding';
        $scope.coding = $scope.$parent.type.coding[$stateParams.coding_index];
    })
    .controller('editAppointmentReasonText', function($scope) {
        $scope.title = 'Reason Text';
        $scope.codeableConcept = $scope.$parent.reason;
    })
    .controller('editAppointmentReasonCoding', function($scope, $stateParams) {
        $scope.title = 'Reason Coding';
        $scope.coding = $scope.$parent.reason.coding[$stateParams.coding_index];
    })
    .controller('editAppointmentSlotText', function($scope, $stateParams) {
        $scope.title = 'Slot Text';
        $scope.codeableConcept = $scope.$parent.slot[$stateParams.codeable_index];
    })
    .controller('editAppointmentSlotCoding', function($scope, $stateParams) {
        $scope.title = 'Slot Coding';
        $scope.coding = $scope.$parent.slot[$stateParams.codeable_index].coding[$stateParams.coding_index];
    })
    .controller('editAppointmentParticipantTypeText', function($scope, $stateParams) {
        $scope.title = 'Participant Type Text';
        $scope.codeableConcept = $scope.$parent.participant[$stateParams.participant_index].type[$stateParams.codeable_index];
    })
    .controller('editAppointmentParticipantTypeCoding', function($scope, $stateParams) {
        $scope.title = 'Participant Type Coding';
        $scope.coding = $scope.$parent.participant[$stateParams.participant_index].type[$stateParams.codeable_index].coding[$stateParams.coding_index];
    })
    .controller('editAppointmentParticipantStatus', function($scope, $stateParams) {
        $scope.title = 'Participant Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent.participant[$stateParams.participant_index];
    })
    .controller('editAppointmentParticipantRequired', function($scope, $stateParams) {
        $scope.title = 'Participant Required';
        $scope.subtitle = 'Text';
        $scope.model_name = 'required';
        $scope.data = $scope.$parent.participant[$stateParams.participant_index];
    })
    .controller('editAppointmentParticipantActor', function($scope, $stateParams) {
        $scope.title = 'Participant Actor';
        $scope.reference = $scope.$parent.participant[$stateParams.participant_index].actor;
    });
