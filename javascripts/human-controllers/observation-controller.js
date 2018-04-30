'use strict';
angular.module('adistalApp')
    .controller('simpleObservationCtrl', function($scope, $http, $stateParams, config, $state, utilities, $log) {

        var id = $stateParams.id;
        $scope._id = id;
        $scope.identifier = [{
            type: {
                coding: [{}]
            },
            assigner: {}
        }];

        $scope.code = {
            coding: [{}]
        };

        $scope.interpretation = {
            coding: [{}]
        };
        $scope.active = true;
        $scope.issued = '';
        $scope.comments = '';
        $scope.observationValueString = '';
        $scope.status = '';
        $scope.effectiveDateTime = '';

        $scope.related = [{
            references: {}
        }];

        $scope.performer = [{}];

        $scope.bodySite = {
            coding: [{}]
        };

        $scope.dataAbsentReason = {
            coding: [{}]
        };

        $scope.subject = {};

        $scope.category = {
            coding: [{}]
        };

        $scope.method = {
            coding: [{}]
        };

        $scope.valueCodeableConcept = {
            coding: [{}]
        };

        $scope.specimen = {};

        $scope.effectivePeriod = {};

        $scope.component = [{
            valueCodeableConcept: {
                coding: [{}]
            },
            dataAbsentReason: {
                coding: [{}]
            },
            valueAttachment: {},
            valueRange: {
                high: {},
                low: {}
            },
            valuePeriod: {},
            valueRatio: {
                denominator: {},
                numerator: {}
            },
            valueQuantity: {},
            valueSampleData: {},
            referenceRange: [{
                high: {},
                low: {},
                age: {
                    high: {},
                    low: {}
                },
                meaning: {
                    coding: [{}]
                }
            }],
            valueString: ''
        }];

        $scope.valueRange = {
            high: {},
            low: {}
        };
        $scope.device = {};
        $scope.valueSampleData = {
            quantity: {}
        };
        $scope.referenceRange = [{
            high: {},
            low: {},
            age: {
                high: {},
                low: {}
            },
            meaning: {
                coding: [{}]
            }
        }];
        $scope.valueQuantity = {};
        $scope.valueRatio = {
            denominator: {},
            numerator: {}
        };
        $scope.valueAttachment = {};

        if (typeof $stateParams.observation_id !== 'undefined' && $stateParams.observation_id !== '') {
            $http.get(config.api_url + '/api/observations/' + $stateParams.observation_id)
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
        $scope.saveObservation = function() {
            var newObservation = {
                identifier: $scope.identifier,
                code: $scope.code,
                interpretation: $scope.interpretation,
                related: $scope.related,
                performer: $scope.performer,
                bodySite: $scope.bodySite,
                subject: $scope.subject,
                dataAbsentReason: $scope.dataAbsentReason,
                category: $scope.category,
                method: $scope.method,
                valueCodeableConcept: $scope.valueCodeableConcept,
                specimen: $scope.specimen,
                effectivePeriod: $scope.effectivePeriod,
                component: $scope.component,
                valueRange: $scope.valueRange,
                device: $scope.device,
                referenceRange: $scope.referenceRange,
                valueRatio: $scope.valueRatio,
                valueAttachment: $scope.valueAttachment,
                active: $scope.active,
                issued: $scope.issued,
                comments: $scope.comments,
                observationValueString: $scope.observationValueString,
                status: $scope.status,
                effectiveDateTime: $scope.effectiveDateTime
            };
            if (typeof $stateParams.observation_id !== 'undefined' && $stateParams.observation_id !== '') {
                $http.put(config.api_url + '/api/observations/' + $stateParams.observation_id, utilities.stringToDateRecursive(newObservation))
                    .then(function() {
                        $state.go('observation_abm');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/observations', utilities.stringToDateRecursive(newObservation))
                    .then(function() {
                        $state.go('observation_abm');
                    }).catch($log.error);

            }
        };

        $scope.cancelObservation = function() {
            $state.go('observation_abm');
        };

        $scope.onLoadFile = function() {
            $scope.photo = $scope.$parent.valueAttachment;

            $scope.onLoadFile = function() {
                if ($scope.file_upload) {
                    $scope.component[0].valueAttachment.data = 'data:' + $scope.file_upload.filetype + ';base64,' + $scope.file_upload.base64;
                    $scope.component[0].valueAttachment.contentType = $scope.file_upload.filetype;
                    $scope.component[0].valueAttachment.size = $scope.file_upload.filesize;
                    $scope.component[0].valueAttachment.title = $scope.file_upload.filename;
                }
            };
        };
    })
    .controller('observationDecomViewer', function($scope, dwv, $log) {
        $log.info('observationDecomViewer');
        $scope.log = function() {
            $log.info($scope.attachment);
        };
    });
