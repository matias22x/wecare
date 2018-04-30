'use strict';
angular.module('observationRouter', []).config(function($stateProvider) {
    $stateProvider
        .state('observation', {
            url: '/observation',
            cache: false,
            templateUrl: 'templates/observation-list.html',
            controller: 'observationListCtrl'
        })
        .state('observation.edit', {
            url: '/edit/:observation_id?',
            cache: false,
            views: {
                '@': {
                    controller: 'editObservationCtrl',
                    templateUrl: 'templates/roles/observation.html'
                }
            }
        })
        .state('observation.edit.identifier', {
            cache: false,
            url: '/:identifier_index/identifier',
            views: {
                'forms@observation.edit': {
                    controller: 'identifierEditCtrl',
                    templateUrl: 'templates/edit_schemas/identifier.html'
                }
            }
        })
        .state('observation.edit.identifier.type', {
            cache: false,
            url: '/type/text',
            views: {
                'forms@observation.edit': {
                    controller: 'codeableConceptTextEditCtrl',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'

                }

            }
        })
        .state('observation.edit.identifier.coding', {
            cache: false,
            url: '/:identifier_index/type/coding/:index',
            views: {
                'forms@observation.edit': {
                    controller: 'codingEditCtrl',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })

    .state('observation.edit.value', {
        cache: false,
        url: '/value',
        views: {
            'forms@observation.edit': {
                controller: 'editObservationValueCtrl',
                templateUrl: 'templates/edit_schemas/observation-value.html'
            }
        }
    })
        .state('observation.edit.code', {
            url: '/code',
            cache: false
        })
        .state('observation.edit.code.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationCode',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.code.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationInterpretationCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.interpretation', {
            url: '/interpretation',
            cache: false
        })
        .state('observation.edit.interpretation.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationInterpretationCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.interpretation.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationInterpretation',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.issued', {
            cache: false,
            url: '/issued',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationIssued',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.related', {
            url: '/:related_index/related',
            cache: false
        })
        .state('observation.edit.related.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationRelatedText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.related.references', {
            cache: false,
            url: '/references',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationRelatedReferences',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.performer', {
            cache: false,
            url: '/:index/performer',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationPerformer',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.bodysite', {
            url: '/bodysite',
            cache: false
        })
        .state('observation.edit.bodysite.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationBodySiteText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.bodysite.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationBodySiteCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })

    .state('observation.edit.dataabsentreason', {
        url: '/dataabsentreason',
        cache: false
    })
        .state('observation.edit.dataabsentreason.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationDataAbsentReasonText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.dataabsentreason.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationDataAbsentReasonCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.subject', {
            cache: false,
            url: '/subject',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationSubject',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.category', {
            url: '/category',
            cache: false
        })
        .state('observation.edit.category.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationCategoryText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.category.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationCategoryCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.comments', {
            cache: false,
            url: '/comment',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComments',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.effectivedatetime', {
            cache: false,
            url: '/effectivedatetime',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationEffectiveDatetTime',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.method', {
            url: '/method',
            cache: false
        })
        .state('observation.edit.method.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationMethodText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.method.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationMethodCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.valuestring', {
            cache: false,
            url: '/valuestring',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueString',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.status', {
            cache: false,
            url: '/status',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationStatus',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.valuecodeableconcept', {
            url: '/valuecodeableconcept',
            cache: false
        })
        .state('observation.edit.valuecodeableconcept.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueCodeableConceptText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.valuecodeableconcept.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueCodeableConceptCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.specimen', {
            cache: false,
            url: '/specimen',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationSpecimen',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.effectiveperiod', {
            cache: false,
            url: '/effectiveperiod',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationEffectivePeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('observation.edit.component', {
            cache: false,
            url: '/component/:component_index'
        })
        .state('observation.edit.component.text', {
            url: '/text',
            cache: false,
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.component.valuecodeableconcept', {
            cache: false,
            url: '/valuecodeableconcept'
        })
        .state('observation.edit.component.valuecodeableconcept.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueCodeableConceptText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.component.valuecodeableconcept.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueCodeableConceptCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.component.valuetime', {
            cache: false,
            url: '/valuetime',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueTime',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.component.code', {
            cache: false,
            url: '/code',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentCode',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.component.valueattachment', {
            cache: false,
            url: '/valueattachment',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueAttachment',
                    templateUrl: 'templates/edit_schemas/photo.html'
                }
            }
        })
        .state('observation.edit.component.sampledata', {
            cache: false,
            url: '/sampledata',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentSampleData',
                    templateUrl: 'templates/edit_schemas/sample-data-schema.html'
                }
            }
        })
        //************************************************//
        .state('observation.edit.component.referencerange', {
            cache: false,
            url: '/referencerange/:reference_range_index'
        })
        .state('observation.edit.component.referencerange.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeHigh',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeLow',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.age', {
            cache: false,
            url: '/age'
        })
        .state('observation.edit.component.referencerange.age.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeAgeHigh',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.age.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeAgeLow',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.meaning', {
            cache: false,
            url: '/meaning'
        })
        .state('observation.edit.component.referencerange.meaning.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeMeaningText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.component.referencerange.meaning.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentReferenceRangeMeaningCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })

    .state('observation.edit.component.valuequantity', {
        cache: false,
        url: '/valuequantity',
        views: {
            'forms@observation.edit': {
                controller: 'editObservationComponentValueQuantity',
                templateUrl: 'templates/edit_schemas/quantity.html'
            }
        }
    })
        .state('observation.edit.component.valueperiod', {
            cache: false,
            url: '/valueperiod',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValuePeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('observation.edit.component.valueratio', {
            cache: false,
            url: '/valueratio'
        })
        .state('observation.edit.component.valueratio.denominator', {
            cache: false,
            url: '/denominator',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueRatioDenominator',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.valueratio.numerator', {
            cache: false,
            url: '/numerator',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueRatioNumerator',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.valuerange', {
            cache: false,
            url: '/valuerange'
        })
        .state('observation.edit.component.valuerange.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueRangeHigh',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.observationvaluerange', {
            cache: false,
            url: '/valuerangue'
        })
        .state('observation.edit.observationvaluerange.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueRangeHigh',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        })
        .state('observation.edit.observationvaluerange.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueRangeLow',
                    templateUrl: 'templates/edit_schemas/number.html'
                }
            }
        })

    .state('observation.edit.valuesampledata.quantity', {
        cache: false,
        url: '/quantity',
        views: {
            'forms@observation.edit': {
                controller: 'editObservationSampleDataSchemaQuantity',
                templateUrl: 'templates/edit_schemas/quantity.html'
            }
        }
    })
        .state('observation.edit.component.valuerange.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueRangeLow',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.component.valuedatetime', {
            cache: false,
            url: '/valuedatetime',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueDateTime',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.component.dataabsentreason', {
            cache: false,
            url: '/dataabsentreason'
        })
        .state('observation.edit.component.dataabsentreason.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentDataAbsentReasonText',
                    templateUrl: 'templates/edit_schemas/codeable-concept-text.html'
                }
            }
        })
        .state('observation.edit.component.dataabsentreason.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentDataAbsentReasonCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.component.valuestring', {
            cache: false,
            url: '/valuestring',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationComponentValueString',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.valuetime', {
            cache: false,
            url: '/valuetime',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueTime',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.valueperiod', {
            cache: false,
            url: '/valueperiod',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValuePeriod',
                    templateUrl: 'templates/edit_schemas/period.html'
                }
            }
        })
        .state('observation.edit.referencerange', {
            cache: false,
            url: '/referencerange/:range_index'
        })
        .state('observation.edit.referencerange.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeHigh',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.referencerange.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeLow',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.referencerange.age', {
            cache: false,
            url: '/age'
        })
        .state('observation.edit.referencerange.age.high', {
            cache: false,
            url: '/high',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeAgeHigh',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.referencerange.age.low', {
            cache: false,
            url: '/low',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeAgeLow',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.referencerange.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.referencerange.meaning', {
            cache: false,
            url: '/meaning'
        })
        .state('observation.edit.referencerange.meaning.text', {
            cache: false,
            url: '/text',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeMeaningText',
                    templateUrl: 'templates/edit_schemas/text.html'
                }
            }
        })
        .state('observation.edit.referencerange.meaning.coding', {
            cache: false,
            url: '/coding/:coding_index',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationReferenceRangeMeaningCoding',
                    templateUrl: 'templates/edit_schemas/coding.html'
                }
            }
        })
        .state('observation.edit.device', {
            cache: false,
            url: '/device',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationDevice',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.valuedatetime', {
            cache: false,
            url: '/valuedatetime',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueDateTime',
                    templateUrl: 'templates/edit_schemas/date.html'
                }
            }
        })
        .state('observation.edit.encounter', {
            cache: false,
            url: '/encounter',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationEncounter',
                    templateUrl: 'templates/edit_schemas/reference-schema.html'
                }
            }
        })
        .state('observation.edit.valuesampledata', {
            cache: false,
            url: '/valuesampledata',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationSampleDataSchema',
                    templateUrl: 'templates/edit_schemas/sample-data-schema.html'
                }
            }
        })

    .state('observation.edit.valuequantity', {
        cache: false,
        url: '/valuequantity',
        views: {
            'forms@observation.edit': {
                controller: 'editObservationValueQuantity',
                templateUrl: 'templates/edit_schemas/quantity.html'
            }
        }
    })
        .state('observation.edit.valueratio', {
            cache: false,
            url: '/valueratio'
        })
        .state('observation.edit.valueratio.numerator', {
            cache: false,
            url: '/numerator',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueRatioNumerator',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.valueratio.denominator', {
            cache: false,
            url: '/denominator',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueRatioDenominator',
                    templateUrl: 'templates/edit_schemas/quantity.html'
                }
            }
        })
        .state('observation.edit.valueattachment', {
            cache: false,
            url: '/valueattachment',
            views: {
                'forms@observation.edit': {
                    controller: 'editObservationValueAttachment',
                    templateUrl: 'templates/edit_schemas/photo.html'
                }
            }
        });
});
