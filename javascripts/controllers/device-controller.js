'use strict';
angular.module('adistalApp')
    .controller('deviceListCtrl', function($scope, $http, config, $log) {
        $http.get(config.api_url + '/api/devices')
            .then(function(resp) {
                $scope.device_list = resp.data;
            }).catch(function(err) {
                $log.error(err);
            });
        $scope.deleteDevice = function(deviceIndex) {
            var id = $scope.device_list[deviceIndex]._id;
            $http.delete(config.api_url + '/api/devices/' + id);
            $scope.device_list.splice(deviceIndex, 1);
        };
    })
    .controller('editDeviceCtrl', function($scope, $http, $stateParams, config, $state, $log, utilities) {
        var id = $stateParams.id;
        $scope._id = id;

        $scope.identifier = [{
            type: {
                coding: [{}]
            }
        }];
        $scope.status = '';
        $scope.manufacturer = '';
        $scope.manufactureDate = '';
        $scope.model = '';
        $scope.version = '';
        $scope.expiry = '';
        $scope.udi = '';
        $scope.lotNumber = '';
        $scope.url = '';

        $scope.type = {
            coding: [{}]
        };

        $scope.note = [{
            authorReference: {}
        }];

        $scope.owner = {};

        $scope.location = {};

        $scope.patient = {};

        $scope.contact = [{}];

        $scope.addNote = function() {
            $scope.note.push({
                authorReference: {}
            });
        };

        $scope.deleteNote = function(noteIndex) {
            if ($scope.note.length > 1) {
                $scope.note.splice(noteIndex, 1);
            }
        };

        $scope.addContact = function() {
            $scope.contact.push({});
        };

        $scope.deleteContact = function(contactIndex) {
            if ($scope.contact.length > 1) {
                $scope.contact.splice(contactIndex, 1);
            }
        };

        if (typeof $stateParams.device_id !== 'undefined' && $stateParams.device_id !== '') {
            $http.get(config.api_url + '/api/devices/' + $stateParams.device_id)
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

        $scope.saveDevice = function() {
            var newItem = {
                identifier: $scope.identifier,
                note: $scope.note,
                owner: $scope.owner,
                location: $scope.location,
                patient: $scope.patient,
                contact: $scope.contact,
                type: $scope.type,
                status: $scope.status,
                manufacturer: $scope.manufacturer,
                manufactureDate: $scope.manufactureDate,
                model: $scope.model,
                version: $scope.version,
                expiry: $scope.expiry,
                udi: $scope.udi,
                lotNumber: $scope.lotNumber,
                url: $scope.url
            };

            if (typeof $stateParams.device_id !== 'undefined' && $stateParams.device_id !== '') {
                $http.put(config.api_url + '/api/devices/' + $stateParams.device_id, utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('device');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            } else {
                $http.post(config.api_url + '/api/devices', utilities.stringToDateRecursive(newItem))
                    .then(function() {
                        $state.go('device');
                    }).catch(function(err) {
                        $log.error(err);
                    });
            }
        };
    })
    .controller('editCreditManagingOrganization', function($scope) {
        $scope.reference = $scope.$parent.managingOrganization;
    })
    .controller('editDeviceStatusCtrl', function($scope) {
        $scope.title = 'Status';
        $scope.subtitle = 'Text';
        $scope.model_name = 'status';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceManufacturerCtrl', function($scope) {
        $scope.title = 'Manufacturer';
        $scope.subtitle = 'Text';
        $scope.model_name = 'manufacturer';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceModelCtrl', function($scope) {
        $scope.title = 'Model';
        $scope.subtitle = 'Text';
        $scope.model_name = 'model';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceVersionCtrl', function($scope) {
        $scope.title = 'Version';
        $scope.subtitle = 'Text';
        $scope.model_name = 'version';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceManufactureDateCtrl', function($scope) {
        $scope.title = 'Manufacture Date';
        $scope.subtitle = 'Date';
        $scope.model_name = 'manufactureDate';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceExpiryCtrl', function($scope) {
        $scope.title = 'Expiry';
        $scope.subtitle = 'Date';
        $scope.model_name = 'expiry';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceUdiCtrl', function($scope) {
        $scope.title = 'Udi';
        $scope.subtitle = 'Text';
        $scope.model_name = 'udi';
        $scope.data = $scope.$parent;
    })
    .controller('editDevicelotNumberCtrl', function($scope) {
        $scope.title = 'Lot Numer';
        $scope.subtitle = 'Text';
        $scope.model_name = 'lotNumber';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceUrlCtrl', function($scope) {
        $scope.title = 'URL';
        $scope.subtitle = 'Text';
        $scope.model_name = 'url';
        $scope.data = $scope.$parent;
    })
    .controller('editDeviceType', function($scope) {
        $scope.title = 'Type';
        $scope.codeableConcept = $scope.$parent.type;
    })
    .controller('editDeviceTypeCoding', function($scope, $state, $stateParams) {
        $scope.title = 'Type Coding';
        $scope.coding = $scope.$parent.type.coding[$stateParams.coding_index];
    })
    .controller('editDeviceOwner', function($scope) {
        $scope.title = 'Owner';
        $scope.reference = $scope.$parent.owner;
    })
    .controller('editDeviceLocation', function($scope) {
        $scope.title = 'Location';
        $scope.reference = $scope.$parent.location;
    })
    .controller('editDevicePatient', function($scope) {
        $scope.title = 'Patient';
        $scope.reference = $scope.$parent.patient;
    })
    .controller('editDeviceContact', function($scope, $state, $stateParams) {
        var contactPointIndex = $stateParams.index;
        $scope.contactPoint = $scope.$parent.contact[contactPointIndex];
        $scope.save = function() {
            $scope.$parent.save();
        };
    })
    .controller('editDeviceNote', function($scope, $stateParams) {
        var noteIndex = $stateParams.note_index;
        $scope.data = $scope.$parent.note[noteIndex];
    })
    .controller('editDeviceNoteAuthorReference', function($scope, $stateParams) {
        var noteIndex = $stateParams.note_index;
        $scope.reference = $scope.$parent.note[noteIndex].authorReference;
    });
