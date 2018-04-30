'use strict';
angular.module('adistalApp')
    .controller('observationListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/observations')
            .then(function(resp) {
                $scope.observationList = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });

        $scope.deleteobservation = function(index) {
            var id = $scope.observationList[index]._id;
            $http.delete(config.api_url + '/api/observations/' + id);
            $scope.observationList.splice(index, 1);
        };

    })
    .controller('editObservationCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
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


        $scope.addCodeCoding = function() {
            $scope.code.coding.push({});
        };

        $scope.addInterpretationCoding = function() {
            $scope.interpretation.coding.push({});
        };

        $scope.addRelated = function() {
            $scope.related.push({
                references: {}
            });
        };

        $scope.addPerformer = function() {
            $scope.performer.push({});
        };

        $scope.addBodySiteCoding = function() {
            $scope.bodySite.coding.push({});
        };

        $scope.addDataAbsentReasonCoding = function() {
            $scope.dataAbsentReason.coding.push({});
        };

        $scope.addCategoryCoding = function() {
            $scope.category.coding.push({});
        };

        $scope.addMethodCoding = function() {
            $scope.method.coding.push({});
        };

        $scope.addValueCodeableConceptCoding = function() {
            $scope.valueCodeableConcept.coding.push({});
        };

        $scope.addComponent = function() {
            $scope.component.push({
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
                valueString: '',
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
                }]
            });
        };

        $scope.addComponentCodeableConceptCoding = function(componentIndex) {
            $scope.component[componentIndex].valueCodeableConcept.coding.push({});
        };

        $scope.addComponentReferenceRage = function(componentIndex) {
            $scope.component[componentIndex].referenceRange.push({
                high: {},
                low: {},
                age: {
                    high: {},
                    low: {}
                },
                meaning: {
                    coding: [{}]
                }
            });
        };

        $scope.addComponentReferenceRageMeaningCoding = function(componentIndex, referenceRangeIndex) {
            $scope.component[componentIndex].referenceRange[referenceRangeIndex].meaning.coding.push({});
        };

        $scope.addComponentDataAbsentReasonCoding = function(componentIndex) {
            $scope.component[componentIndex].dataAbsentReason.coding.push({});
        };

        $scope.addReferenceRange = function() {
            $scope.referenceRange.push({
                high: {},
                low: {},
                age: {
                    high: {},
                    low: {}
                },
                meaning: {
                    coding: [{}]
                }
            });
        };
        $scope.addReferenceRangeMeaningCoding = function(referenceRangeIndex) {
            $scope.referenceRange[referenceRangeIndex].meaning.coding.push({});
        };

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
                        $state.go('observation');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/observations', utilities.stringToDateRecursive(newObservation))
                    .then(function() {
                        $state.go('observation');
                    }).catch(function(err) {
                        $log.error(err);
                    });

            }
        };
    })

.controller('identifierEditCtrl', function($scope, $state, $stateParams) {
    var identifierIndex = $stateParams.identifier_index;
    $scope.identifier = $scope.$parent.identifier[identifierIndex];
})
    .controller('codeableConceptTextEditCtrl', function($scope, $state, $stateParams) {
        var identifierIndex = $stateParams.identifier_index;
        $scope.codeableConcept = $scope.$parent.identifier[identifierIndex].type;
    })
    .controller('codingEditCtrl', function($scope, $state, $stateParams) {

        var identifierIndex = $stateParams.identifier_index || 0;
        var index = $stateParams.index || 0;
        $scope.coding = $scope.$parent.identifier[identifierIndex].type.coding[index];
    })
    .controller('editObservationCode', function($scope) {
        $scope.title = 'Observation Code';
        $scope.codeableConcept = $scope.$parent.code;
    })
    .controller('editObservationCodeCoding', function($scope, $stateParams) {
        $scope.title = 'Observation Code Coding';
        $scope.coding = $scope.$parent.code.coding[$stateParams.coding_index];
    })
    .controller('editObservationInterpretation', function($scope) {
        $scope.title = 'Observation Interpretation';
        $scope.codeableConcept = $scope.$parent.interpretation;
    })
    .controller('editObservationInterpretationCoding', function($scope, $stateParams) {
        $scope.title = 'Observation Interpretation Coding';
        $scope.coding = $scope.$parent.code.coding[$stateParams.coding_index];
    })
    .controller('editObservationIssued', function($scope) {
        $scope.title = 'Issued';
        $scope.subtitle = 'Date';
        $scope.model_name = 'issued';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationRelatedText', function($scope, $stateParams) {
        $scope.title = 'Related Text';
        $scope.subtitle = 'Text';
        $scope.model_name = 'type';
        $scope.data = $scope.$parent.related[$stateParams.related_index];
    })
    .controller('editObservationRelatedReferences', function($scope, $stateParams) {
        $scope.title = 'Related Reference';
        $scope.reference = $scope.$parent.related[$stateParams.related_index].references;
    })
    .controller('editObservationPerformer', function($scope, $stateParams) {
        $scope.title = 'Performer';
        $scope.reference = $scope.$parent.performer[$stateParams.index];
    })
    .controller('editObservationBodySiteText', function($scope) {
        $scope.title = 'BodySite Text';
        $scope.codeableConcept = $scope.$parent.bodySite;
    })
    .controller('editObservationBodySiteCoding', function($scope, $stateParams) {
        $scope.title = 'BodySite Coding';
        $scope.coding = $scope.$parent.bodySite.coding[$stateParams.coding_index];
    })
    .controller('editObservationDataAbsentReasonText', function($scope) {
        $scope.title = 'DataAbsentReason Text';
        $scope.codeableConcept = $scope.$parent.dataAbsentReason;
    })
    .controller('editObservationDataAbsentReasonCoding', function($scope, $stateParams) {
        $scope.title = 'DataAbsentReason Coding';
        $scope.coding = $scope.$parent.dataAbsentReason.coding[$stateParams.coding_index];
    })
    .controller('editObservationSubject', function($scope) {
        $scope.title = 'Subject';
        $scope.reference = $scope.$parent.subject;
    })
    .controller('editObservationCategoryText', function($scope) {
        $scope.title = 'Category Text';
        $scope.codeableConcept = $scope.$parent.bodySite;
    })
    .controller('editObservationCategoryCoding', function($scope, $stateParams) {
        $scope.title = 'Category Coding';
        $scope.coding = $scope.$parent.bodySite.coding[$stateParams.coding_index];
    })
    .controller('observationNumberEditCtrl', function($scope) {
        $scope.data = $scope.$parent.data;
    })
    .controller('editObservationTypeCtrl', function($scope) {
        $scope.codeableConcept = $scope.$parent.type;
    })
    .controller('editObservationTypeCtrl', function($scope, $stateParams) {
        $scope.coding = $scope.$parent.type.coding[$stateParams.coding_index];
    })
    .controller('editObservationSpecialityCtrl', function($scope) {
        $scope.codeableConcept = $scope.$parent.type;
    })
    .controller('editObservationSpecialityCodingCtrl', function($scope, $stateParams) {
        $scope.coding = $scope.$parent.type.coding[$stateParams.coding_index];
    })
    .controller('editObservationComments', function($scope) {
        $scope.title = 'Comments';
        $scope.subtitle = 'Text';
        $scope.model_name = 'comments';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationEffectiveDatetTime', function($scope) {
        $scope.title = 'Effective DateTime';
        $scope.subtitle = 'Date';
        $scope.model_name = 'effectiveDateTime';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationMethodText', function($scope) {
        $scope.title = 'Method Text';
        $scope.codeableConcept = $scope.$parent.method;
    })
    .controller('editObservationMethodCoding', function($scope, $stateParams) {
        $scope.title = 'Method Coding';
        $scope.coding = $scope.$parent.method.coding[$stateParams.coding_index];
    })
    .controller('editObservationValueString', function($scope) {
        $scope.title = 'Value String';
        $scope.subtitle = 'Text';
        $scope.model_name = 'observationValueString';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationStatus', function($scope) {
        $scope.title = 'Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationValueCodeableConceptText', function($scope) {
        $scope.title = 'valueCodeableConcept Text';
        $scope.codeableConcept = $scope.$parent.valueCodeableConcept;
    })
    .controller('editObservationValueCodeableConceptCoding', function($scope, $stateParams) {
        $scope.title = 'valueCodeableConcept Coding';
        $scope.coding = $scope.$parent.valueCodeableConcept.coding[$stateParams.coding_index];
    })
    .controller('editObservationSpecimen', function($scope) {
        $scope.title = 'Specimen';
        $scope.reference = $scope.$parent.specimen;
    })
    .controller('editObservationEffectivePeriod', function($scope) {
        $scope.title = 'Effective Period';
        $scope.period = $scope.$parent.effectivePeriod;
    })
    .controller('editObservationComponentText', function($scope, $stateParams) {
        $scope.title = 'Component Text';
        $scope.subtitle = 'Text';
        $scope.model_name = 'type';
        $scope.data = $scope.$parent.component[$stateParams.component_index];
    })
    .controller('editObservationComponentValueCodeableConceptCoding', function($scope, $stateParams) {
        $scope.title = 'valueCodeableConcept Coding';
        $scope.coding = $scope.$parent.component[$stateParams.component_index].valueCodeableConcept.coding[$stateParams.coding_index];
    })
    .controller('editObservationComponentValueCodeableConceptText', function($scope, $stateParams) {
        $scope.title = 'valueCodeableConcept Text';
        $scope.codeableConcept = $scope.$parent.component[$stateParams.component_index].valueCodeableConcept;
    })
    .controller('editObservationComponentValueTime', function($scope, $stateParams) {
        $scope.title = 'Value Time';
        $scope.subtitle = 'Date';
        $scope.model_name = 'valueTime';
        $scope.data = $scope.$parent.component[$stateParams.component_index];
    })
    .controller('editObservationComponentCode', function($scope, $stateParams) {
        $scope.title = 'Code';
        $scope.subtitle = 'Text';
        $scope.model_name = 'code';
        $scope.data = $scope.$parent.component[$stateParams.component_index];
    })
    .controller('editObservationComponentValueAttachment', function($scope, $stateParams) {
        $scope.photo = $scope.$parent.component[$stateParams.component_index].valueAttachment;
        $scope.onLoadFile = function() {
            if ($scope.file_upload) {
                $scope.photo.data = 'data:' + $scope.file_upload.filetype + ';base64,' + $scope.file_upload.base64;
                $scope.photo.contentType = $scope.file_upload.filetype;
                $scope.photo.size = $scope.file_upload.filesize;
                $scope.photo.title = $scope.file_upload.filename;
            }
        };
    })
    .controller('editObservationComponentSampleData', function($scope, $stateParams) {
        $scope.title = 'Value SampleData';
        $scope.sampleData = $scope.$parent.component[$stateParams.component_index].valueSampleData;
    })
    .controller('editObservationComponentReferenceRangeHigh', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange High';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].high;
    })
    .controller('editObservationComponentReferenceRangeLow', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Low';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].low;
    })
    .controller('editObservationComponentReferenceRangeAgeHigh', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Age High';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].age.high;
    })
    .controller('editObservationComponentReferenceRangeAgeLow', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Age Low';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].age.low;
    })
    .controller('editObservationComponentReferenceRangeText', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Text';
        $scope.subtitle = 'Text';
        $scope.model_name = 'text';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index];
    })
    .controller('editObservationComponentReferenceRangeMeaningText', function($scope, $stateParams) {
        $scope.title = 'Meaning Text';
        $scope.subtitle = 'Text';
        $scope.model_name = 'text';
        $scope.data = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].meaning;
    })
    .controller('editObservationComponentReferenceRangeMeaningCoding', function($scope, $stateParams) {
        $scope.title = 'Meaning Coding';
        $scope.coding = $scope.$parent.component[$stateParams.component_index].referenceRange[$stateParams.reference_range_index].meaning.coding[$stateParams.coding_index];
    })
    .controller('editObservationComponentValueQuantity', function($scope, $stateParams) {
        $scope.title = 'Value Quantity';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].valueQuantity;
    })
    .controller('editObservationComponentValueRatioDenominator', function($scope, $stateParams) {
        $scope.title = 'ValueRange Denominator';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].valueRatio.denominator;
    })
    .controller('editObservationComponentValueRatioNumerator', function($scope, $stateParams) {
        $scope.title = 'ValueRatio Numerator';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].valueRatio.numerator;
    })
    .controller('editObservationComponentValuePeriod', function($scope, $stateParams) {
        $scope.title = 'Value Period';
        $scope.period = $scope.$parent.component[$stateParams.component_index].valuePeriod;
    })
    .controller('editObservationComponentValueRangeLow', function($scope, $stateParams) {
        $scope.title = 'ValueRange Low';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].valueRange.low;
    })
    .controller('editObservationComponentValueRangeHigh', function($scope, $stateParams) {
        $scope.title = 'ValueRange High';
        $scope.quantity = $scope.$parent.component[$stateParams.component_index].valueRange.high;
    })
    .controller('editObservationComponentValueDateTime', function($scope, $stateParams) {
        $scope.title = 'Value Date Time';
        $scope.subtitle = 'Date';
        $scope.model_name = 'valueDateTime';
        $scope.data = $scope.$parent.component[$stateParams.component_index];
    })
    .controller('editObservationComponentDataAbsentReasonCoding', function($scope, $stateParams) {
        $scope.title = 'DataAbsentReason Coding';
        $scope.coding = $scope.$parent.component[$stateParams.component_index].dataAbsentReason.coding[$stateParams.coding_index];
    })
    .controller('editObservationComponentDataAbsentReasonText', function($scope, $stateParams) {
        $scope.title = 'DataAbsentReason Text';
        $scope.codeableConcept = $scope.$parent.component[$stateParams.component_index].dataAbsentReason;
    })
    .controller('editObservationComponentValueString', function($scope, $stateParams) {
        $scope.title = 'Value String';
        $scope.subtitle = 'Text';
        $scope.model_name = 'valueString';
        $scope.data = $scope.$parent.component[$stateParams.component_index];
    })
    .controller('editObservationValueRangeLow', function($scope) {
        $scope.title = 'ValueRange Low';
        $scope.subtitle = 'Number';
        $scope.model_name = 'high';
        $scope.data = $scope.$parent.valueRange;
    })
    .controller('editObservationValueRangeHigh', function($scope) {
        $scope.title = 'valueRange High';
        $scope.subtitle = 'Number';
        $scope.model_name = 'high';
        $scope.data = $scope.$parent.valueRange;
    })
    .controller('editObservationDevice', function($scope) {
        $scope.title = 'Device Reference';
        $scope.data = $scope.$parent.device;
    })
    .controller('editObservationValueDateTime', function($scope) {
        $scope.title = 'valueDateTime';
        $scope.subtitle = 'Date';
        $scope.model_name = 'valueDateTime';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationEncounter', function($scope) {
        $scope.title = 'Encounter';
        $scope.reference = $scope.$parent.encounter;
    })
    .controller('editObservationSampleDataSchema', function($scope) {
        $scope.title = 'SampleData';
        $scope.sampleData = $scope.$parent.valueSampleData;
    })
    .controller('editObservationSampleDataSchemaQuantity', function($scope) {
        $scope.title = 'SampleData Quantity';
        $scope.quantity = $scope.$parent.valueSampleData.quantity;
    })
    .controller('editObservationValueTime', function($scope) {
        $scope.title = 'ValueTime';
        $scope.subtitle = 'Date';
        $scope.model_name = 'valueTime';
        $scope.data = $scope.$parent;
    })
    .controller('editObservationValuePeriod', function($scope) {
        $scope.title = 'ValuePeriod';
        $scope.period = $scope.$parent.valuePeriod;
    })
    .controller('editObservationReferenceRangeHigh', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange High';
        $scope.quantity = $scope.$parent.referenceRange[$stateParams.range_index].high;
    })
    .controller('editObservationReferenceRangeLow', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Low';
        $scope.quantity = $scope.$parent.referenceRange[$stateParams.range_index].low;
    })
    .controller('editObservationReferenceRangeAgeHigh', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Age High';
        $scope.quantity = $scope.$parent.referenceRange[$stateParams.range_index].age.high;
    })
    .controller('editObservationReferenceRangeAgeLow', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Age Low';
        $scope.quantity = $scope.$parent.referenceRange[$stateParams.range_index].age.low;
    })
    .controller('editObservationReferenceRangeText', function($scope, $stateParams) {
        $scope.title = 'ReferenceRange Text';
        $scope.subtitle = 'Date';
        $scope.model_name = 'text';
        $scope.quantity = $scope.$parent.referenceRange[$stateParams.range_index];
    })
    .controller('editObservationReferenceRangeMeaningText', function($scope, $stateParams) {
        $scope.title = 'Meaning Text';
        $scope.subtitle = 'Text';
        $scope.model_name = 'text';
        $scope.data = $scope.$parent.referenceRange[$stateParams.range_index].meaning;
    })
    .controller('editObservationReferenceRangeMeaningCoding', function($scope, $stateParams) {
        $scope.title = 'Meaning Coding';
        $scope.coding = $scope.$parent.referenceRange[$stateParams.range_index].meaning.coding[$stateParams.coding_index];
    })
    .controller('editObservationValueQuantity', function($scope) {
        $scope.title = 'Value Quantity';
        $scope.quantity = $scope.$parent.valueQuantity;
    })
    .controller('editObservationValueRatioNumerator', function($scope) {
        $scope.title = 'Value Ratio Numerator';
        $scope.quantity = $scope.$parent.valueRatio.numerator;
    })
    .controller('editObservationValueRatioDenominator', function($scope) {
        $scope.title = 'Value Ratio Denominator';
        $scope.quantity = $scope.$parent.valueRatio.denominator;
    })
    .controller('editObservationValueAttachment', function($scope) {
        $scope.photo = $scope.$parent.valueAttachment;

        $scope.onLoadFile = function() {
            if ($scope.file_upload) {
                $scope.photo.data = 'data:' + $scope.file_upload.filetype + ';base64,' + $scope.file_upload.base64;
                $scope.photo.contentType = $scope.file_upload.filetype;
                $scope.photo.size = $scope.file_upload.filesize;
                $scope.photo.title = $scope.file_upload.filename;
            }
        };
    });
