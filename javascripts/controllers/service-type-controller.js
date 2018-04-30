'use strict';
angular.module('adistalApp')
    .controller('serviceTypeListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/servicetypes')
            .then(function(resp) {
                $scope.service_type_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });

        $scope.deleteserviceType = function(index) {
            var id = $scope.service_type_list[index]._id;
            $http.delete(config.api_url + '/api/servicetypes/' + id);
            $scope.service_type_list.splice(index, 1);
        };

    })
    .controller('editServiceTypeCtrl', function($scope, $http, $stateParams, $state, config, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.identifier = [{
            type: {
                coding: [{}]
            },
            assigner: {}
        }];
        $scope.type = {
            coding: [{}]
        };

        $scope.speciality = {
            coding: [{}]
        };
        $scope.diagnosticService = [{
            coding: [{}]
        }];

        $scope.creditCost = 0;

        if (typeof $stateParams.servicetype_id !== 'undefined' && $stateParams.servicetype_id !== 'undefined') {
            $http.get(config.api_url + '/api/servicetypes/' + $stateParams.servicetype_id)
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
        $scope.addCoding = function(identifierIndex) {
            $scope.identifier[identifierIndex].type.coding.push({});
        };

        $scope.deleteCoding = function(identifierIndex, codingIndex) {
            if ($scope.identifier[identifierIndex].type.coding.length > 1) {
                $scope.identifier[identifierIndex].type.coding.splice(codingIndex, 1);
            }
        };

        $scope.addDiagnosticService = function() {
            $scope.diagnosticService.push({
                coding: [{}]
            });
        };

        $scope.deleteDiagnosticService = function(index) {
            if ($scope.diagnosticService.length > 1) {
                $scope.diagnosticService.splice(index, 1);
            }
        };

        $scope.addDiagnosticServiceCoding = function(diagnosticServiceIndex) {
            $scope.diagnosticService[diagnosticServiceIndex].coding.push({});
        };

        $scope.deleteDiagnosticServiceCoding = function(diagnosticServiceIndex, codingIndex) {
            if ($scope.diagnosticService[diagnosticServiceIndex].coding.length > 1) {
                $scope.diagnosticService[diagnosticServiceIndex].coding.splice(codingIndex, 1);
            }
        };

        $scope.addTypeCoding = function() {
            $scope.type.coding.push({});
        };

        $scope.deleteTypeCoding = function(indexCoding) {
            if ($scope.type.coding.length > 1) {
                $scope.type.coding.splice(indexCoding, 1);
            }
        };

        $scope.addSpecialityCoding = function() {
            $scope.speciality.coding.push({});
        };

        $scope.deleteSpecialityCoding = function(index) {
            if ($scope.speciality.coding.length > 1) {
                $scope.speciality.coding.splice(index, 1);
            }

        };

        $scope.addIdentifier = function() {
            $scope.identifier.push({
                type: {
                    coding: [{}]
                },
                assigner: {}
            });
        };

        $scope.deleteIdentifier = function(index) {
            if ($scope.identifier.length > 1) {
                $scope.identifier.splice(index, 1);
            }
        };

        $scope.saveServiceType = function() {
            var newServiceType = {
                identifier: $scope.identifier,
                type: $scope.type,
                speciality: $scope.speciality,
                diagnosticService: $scope.diagnosticService,
                creditCost: $scope.creditCost
            };
            if (typeof $stateParams.servicetype_id !== 'undefined' && $stateParams.servicetype_id !== '') {
                $http.put(config.api_url + '/api/servicetypes/' + $stateParams.servicetype_id, utilities.stringToDateRecursive(newServiceType))
                    .then(function() {
                        $state.go('servicetype');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/servicetypes', utilities.stringToDateRecursive(newServiceType))
                    .then(function() {
                        $state.go('servicetype');
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
        var identifierIndex = $stateParams.identifier_index;
        $scope.coding = $scope.$parent.identifier[identifierIndex].type.coding[$stateParams.index];
    })
    .controller('editServiceTypeDiagnosticServiceCtrl', function($scope, $state, $stateParams) {
        $scope.codeableConcept = $scope.$parent.diagnosticService[$stateParams.codeable_index];
    })
    .controller('editServiceTypeDiagnosticServiceCodingCtrl', function($scope, $stateParams) {
        var codeableIndex = $stateParams.codeable_index;
        var codingIndex = $stateParams.coding_index;
        $scope.coding = $scope.$parent.diagnosticService[codeableIndex].coding[codingIndex];
    })
    .controller('serviceTypeNumberEditCtrl', function($scope) {
        $scope.title = 'Credit Cost';
        $scope.data = $scope.$parent;
    })
    .controller('editServiceTypeTypeCtrl', function($scope) {
        $scope.title = 'Type';
        $scope.codeableConcept = $scope.$parent.type;
    })
    .controller('editServiceTypeTypeCodingCtrl', function($scope, $stateParams) {
        $scope.title = 'Type Coding';
        $scope.coding = $scope.$parent.type.coding[$stateParams.coding_index];
    })
    .controller('editServiceTypeSpecialityCtrl', function($scope) {
        $scope.title = 'Speciality';
        $scope.codeableConcept = $scope.$parent.speciality;
    })
    .controller('editServiceTypeSpecialityCodingCtrl', function($scope, $stateParams) {
        $scope.title = 'Speciality Coding';
        $scope.coding = $scope.$parent.speciality.coding[$stateParams.coding_index];
    });
