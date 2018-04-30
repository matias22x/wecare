'use strict';

angular.module('adistalApp').constant('decoderScripts', {
    'jpeg2000':      'components/dwv/decoders/pdfjs/decode-jpeg2000.js',
    'jpeg-lossless': 'components/dwv/decoders/rii-mango/decode-jpegloss.js',
    'jpeg-baseline': 'components/dwv/decoders/pdfjs/decode-jpegbaseline.js'
}).component('editIdentifier', {
    bindings: {
        'identifier':      '=',
        'attrname':        '=',
        'modelname':       '=',
        'parentIndexName': '=',
        'parentIndex':     '='
    },
    templateUrl: '/templates/ui-components/identifier.html',
    controller:  function($state) {
        var self = this;
        self.addIdentifier = function() {
            self.identifier.push({
                type: {
                    coding: [{}]
                }
            });
        };

        self.deleteIdentifier = function(identifierIndex) {
            if (self.identifier.length > 1) {
                self.identifier.splice(identifierIndex, 1);
            }
        };

        self.addCoding = function(identifierIndex) {
            self.identifier[identifierIndex].type.coding.push({});
        };

        self.deleteCoding = function(identifierIndex, codingIndex) {
            if (self.identifier[identifierIndex].type.coding.length > 1) {
                self.identifier[identifierIndex].type.coding.splice(codingIndex, 1);
            }
        };

        self.editIdentifier = function($index) {
            var stateString = self.modelname + '.edit.' + (self.attrname || 'identifier');
            var params      = {};
            if (typeof $index !== 'undefined') {
                params.identifier_index = $index;
            }
            $state.go(stateString, params);
        };

        self.editType = function($index) {
            var stateString = self.modelname + '.edit.' + (self.attrname || 'identifier') + '.type';
            var params      = {};

            if (typeof $index !== 'undefined') {
                params = {
                    identifier_index: $index
                };
            }

            if (typeof self.parentIndex !== 'undefined') {
                params[self.parentIndexName] = self.parentIndex;
            }
            $state.go(stateString, params);
        };

        self.editCodeableCoding = function($index, $identifierIndex) {
            var stateString = self.modelname + '.edit.' + (self.attrname || 'identifier') + '.coding';
            var params      = {
                index: $index
            };

            if (typeof $identifierIndex !== 'undefined') {
                params.identifier_index = $identifierIndex;
            }

            if (typeof self.parentIndex !== 'undefined') {
                params[self.parentIndexName] = self.parentIndex;
            }
            $state.go(stateString, params);
        };

    }
}).component('editCodeableConcept', {
    bindings: {
        modelname:             '=',
        attrname:              '=',
        codeableConcept:       '=',
        title:                 '=',
        parentIndexName:       '=',
        parentIndex:           '=',
        parentParentIndex:     '=',
        parentParentIndexName: '='
    },
    templateUrl: '/templates/ui-components/codeable-concept.html',
    controller:  function($state) {
        var self = this;
        self.addCodeableConcept = function() {
            self.codeableConcept.push({
                coding: [{}]
            });
        };

        self.removeCodeableConcept = function($index) {
            if (self.codeableConcept.length > 1) {
                self.codeableConcept.splice($index, 1);
            }
        };

        self.addCoding = function(index) {
            if (typeof index !== 'undefined') {
                self.codeableConcept[index].coding.push({});
            } else {
                self.codeableConcept.coding.push({});
            }
        };

        self.deleteCoding = function(codingIndex, codeableIndex) {
            if (typeof codeableIndex !== 'undefined') {
                if (self.codeableConcept[codeableIndex].coding.length > 1) {
                    self.codeableConcept[codeableIndex].coding.splice(codingIndex, 1);
                }
            } else {
                if (self.codeableConcept.coding.length > 1) {
                    self.codeableConcept.coding.splice(codingIndex, 1);
                }
            }
        };

        self.editCodeableText = function($index) {
            var stateString = self.modelname + '.edit.' + self.attrname + '.text';
            var params      = {};

            if (typeof $index !== 'undefined') {
                params = {
                    codeable_index: $index
                };
            }

            if (typeof self.parentIndex !== 'undefined') {
                params[self.parentIndexName] = self.parentIndex;
            }
            if (typeof self.parentParentIndex !== 'undefined') {
                params[self.parentParentIndexName] = self.parentParentIndex;
            }
            $state.go(stateString, params);
        };

        self.editCodeableCoding = function($index, $codeableIndex) {
            var stateString = self.modelname + '.edit.' + self.attrname + '.coding';
            var params      = {
                coding_index: $index
            };

            if (typeof $codeableIndex !== 'undefined') {
                params.codeable_index = $codeableIndex;
            }

            if (typeof self.parentIndex !== 'undefined') {
                params[self.parentIndexName] = self.parentIndex;
            }
            $state.go(stateString, params);
        };

        self.isArray = angular.isArray;
    }
}).component('basicEdit', {
    bindings: {
        modelname:             '=',
        attrname:              '=',
        model:                 '=',
        title:                 '=',
        element:               '=',
        parentIndexName:       '=',
        parentIndex:           '=',
        parentParentIndex:     '=',
        parentParentIndexName: '='
    },
    templateUrl: '/templates/ui-components/basic-edit.html',
    controller:  function($state) {
        var self = this;
        self.addElement = function() {
            if (typeof self.element !== 'undefined') {
                self.model.push(self.element);
            } else if (typeof self.model[0] === 'object') {
                self.model.push({});
            } else {
                self.model.push('');
            }
        };

        self.deleteElement = function($index) {
            if (self.model.length > 1) {
                self.model.splice($index, 1);
            }
        };

        self.edit = function($index) {
            var stateString = self.modelname + '.edit.' + self.attrname;
            var params      = {};
            if (typeof $index !== 'undefined') {
                params.index = $index;
            }
            if (typeof self.parentIndex !== 'undefined') {
                params[self.parentIndexName] = self.parentIndex;
            }
            if (typeof self.parentParentIndex !== 'undefined') {
                params[self.parentParentIndexName] = self.parentParentIndex;
            }
            $state.go(stateString, params);
        };

        self.isArray = angular.isArray;
    }
}).component('editIdentifierHuman', {
    bindings: {
        'identifier':      '=',
        'attrname':        '=',
        'modelname':       '=',
        'parentIndexName': '=',
        'parentIndex':     '=',
        'id':              '='
    },
    templateUrl: '/templates/ui-components/identifier-human.html'
}).component('addressHuman', {
    bindings: {
        'address':  '=',
        'readonly': '<'
    },
    templateUrl: '/templates/ui-components/address-human.html',
    controller:  function() {
        var self = this;
        self.address    = self.address || [];
        self.$onChanges = function() {
            if (!self.address.line) {
                self.address.line = [];
            }
        };
        if (!self.address.line) {
            self.address.line = [];
        }
    }
}).component('assignOrganizations', {
    bindings: {
        'organizations': '=',
        'assignTo':      '=',
        'title':         '=',
        'readonly':      '='
    },
    templateUrl: '/templates/ui-components/practitioner-organizations.html',
    controller:  function($log, $http, config, utilities, practitionerService) {
        var self = this;

        self.removeAssignOrg = function(reference) {
            self.assignTo.forEach(function(org, index) {
                if (org.reference === reference) {
                    self.assignTo.splice(index, 1);
                }
            });
        };
        self.addCreateOrganization = function() {
            var newOrganization = {
                name: self.selectOrganization.text
            };
            $http.post(config.api_url + '/api/organizations', utilities.stringToDateRecursive(newOrganization)).then(function() {
                $http.get(config.api_url + '/api/organizations').then(function(orgResp) {
                    self.organizations      = orgResp.data;
                    self.selectOrganization = self.organizations[0]._id;
                    self.addOrganization();
                }).catch(function(er) {
                    $log.error(er);
                });
            }).catch(function(err) {
                $log.error(err);
            });
        };
        self.addOrganization = function() {
            if (self.selectOrganization && self.selectSpeciality.text) {
                var dataSpeciality = {
                    type:   'speciality',
                    values: [{
                        'text': self.selectSpeciality.text
                    }]
                };
                var method;
                if ((typeof self.specialities !== 'undefined' && self.specialities.length > 0) || self.practitionerRole[0].speciality.length > 0) {
                    method             = 'put';
                    dataSpeciality._id = self.idPredetermined;
                    dataSpeciality.values.push(self.specialities[0]);
                } else {
                    method = 'post';
                }
                $log.info(method, dataSpeciality);
                practitionerService.saveSpeciality(method, dataSpeciality).then(function(resp) {
                    Object.keys(self.organizations).forEach(function(key) {
                        if (self.organizations[key]._id === self.selectOrganization) {

                            self.practitionerRole.push({
                                managingOrganization: {
                                    reference: self.organizations[key]._id,
                                    display:   self.organizations[key].name
                                },
                                speciality: [resp.data.values[0]]
                            });
                            self.selectSpeciality = {
                                coding: [{}]
                            };
                        }
                    });
                });
            }
        };
        self.assignToOrganization = function() {
            Object.keys(self.organizations).forEach(function(key) {
                if (self.organizations[key]._id === self.selectOrganization) {
                    self.assignTo.push({
                        reference: self.organizations[key]._id,
                        display:   self.organizations[key].name
                    });
                }
            });
        };
    }
}).component('practitionerOrganizations', {
    bindings: {
        'organizations':            '<',
        'practitionerRole':         '=',
        'specialityInput':          '=',
        'title':                    '=',
        'readonly':                 '=',
        'practitionerSubRole':      '=',
        'filterTypesOrganizations': '='
    },
    templateUrl: '/templates/ui-components/practitioner-organizations.html',
    controller:  function($log, $http, config, utilities, practitionerService) {
        var self = this;
        var currentOrg = '';
        self.specialitiesText = [];
        self.specialities     = [];

        self.$onChanges = function() {
            if (self.organizations && self.organizations.length > 0) {
                self.selectOrganization = self.organizations[0]._id;
                self.specialities = self.organizations[0].specialties;
            }
            if (self.practitionerSubRole) {
                self.selectSubRole = self.practitionerSubRole;
            }
        };
        self.$doCheck = function() {
            if (self.selectOrganization && (!currentOrg || currentOrg !== self.selectOrganization)) {
                currentOrg = self.selectOrganization;
                var organizationSelected = self.organizations.find(function(item) {
                    return item._id === self.selectOrganization;
                })
                self.specialities = organizationSelected.specialties;
            }
        };

        self.addSubRol = function addSubRol() {
            self.practitionerSubRole = self.selectSubRole;
            self.filterTypesOrganizations(self.practitionerSubRole);
        };

        self.selectSpeciality = [];

        self.specialityIpt = true;
        if (typeof self.specialityInput !== 'undefined') {
            self.specialityIpt = false;
        }
        if (typeof self.practitionerRole !== 'undefined') {
            self.practitionerRole = self.practitionerRole || [];
        }

        self.removeOrgRef = function(rol) {
            self.practitionerRole.splice(self.practitionerRole.indexOf(rol), 1);
            practitionerService.deletePractitionerRoleById(rol._id).then(function() {});
        };

        self.addCreateOrganization = function() {
            var newOrganization = {
                name: self.selectOrganization.text
            };
            $http.post(config.api_url + '/api/organizations', utilities.stringToDateRecursive(newOrganization)).then(function() {
                $http.get(config.api_url + '/api/organizations').then(function(orgResp) {
                    self.organizations      = orgResp.data;
                    self.selectOrganization = self.organizations[0]._id;
                    self.addOrganization();
                }).catch(function(er) {
                    $log.error(er);
                });
            }).catch(function(err) {
                $log.error(err);
            });
        };

        self.addOrganization = function() {
            if (self.selectOrganization && self.selectSpeciality.length) {
                self.selectSpeciality.map(function(specialty) {
                    var specialtyObj = JSON.parse(specialty);
                    var allOrganizations = self.organizations.map(function(org) {
                        return org._id;
                    });
                    var indexOrganization   = allOrganizations.indexOf(self.selectOrganization);
                    var newPractitionerRole = {
                        organization: {
                            reference: self.organizations[indexOrganization]._id,
                            display:   self.organizations[indexOrganization].name
                        }
                    };
                    if (indexOrganization !== -1) {
                        newPractitionerRole.specialty = [{
                            text: specialtyObj.value.text,
                            coding: [{code: specialtyObj._id}]
                        }];
                    }
                    self.practitionerRole.push(newPractitionerRole);
                });
            }
        };
    }
}).component('basicEditHuman', {
    bindings: {
        modelname:             '=',
        attrname:              '=',
        model:                 '=',
        title:                 '=',
        element:               '=',
        parentIndexName:       '=',
        parentIndex:           '=',
        parentParentIndex:     '=',
        parentParentIndexName: '=',
        _id:                   '='
    },
    templateUrl: '/templates/ui-components/basic-edit-human.html'
}).component('fileModal', {
    bindings: {
        attachment:       '=',
        save:             '=',
        type:             '=',
        studyName:        '=',
        selectAttachment: '=',
        acceptCallback:   '=',
        status:           '=',
        editObservation:  '=',
        editing:          '='
    },
    templateUrl: '/templates/ui-components/file-modal.html',
    controller:  function(config, $http, $log, FileUploader, $translate, $auth) {
        var self = this;
        self.studyName  = self.studyName || '';
        self.attachment = self.attachment || [];
        self.cancelStr  = $translate.instant('CANCEL');

        self.progress = 0;

        self.checkAttachments = function checkAttachments() {
            if (self.attachment.length > 1) {
                Object.keys(self.attachment).forEach(function(key) {
                    if (self.attachment[key].title.indexOf('dcm') === -1) {
                        self.attachmentNotDicom = true;
                    } else {
                        self.attachmentNotDicom = false;
                    }
                });
            } else {
                self.attachmentNotDicom = false;
            }
        };

        self.uploader = new FileUploader({
            url:        config.api_url + '/api/upload',
            alias:      'file',
            autoUpload: true,
            headers:    {
                authorization: 'Bearer ' + $auth.getToken()
            },
            onProgressAll: function(progress) {
                self.progress = progress;
            },
            onSuccessItem: function(item, response) {

                self.attachment.push({
                    contentType: response.contentType,
                    contextHttp: response.contextHttp,
                    url:         response.url,
                    title:       response.filename,
                    hash:        response.md5
                });
                self.filenames = '';
            },
            onCompleteAll: function() {
                self.checkAttachments();
                self.uploader.queue = [];
                self.progress       = 0;
            }
        });
        self.cancelStudy = function cancelStudy() {
            self.attachment  = [];
            self.studyName   = '';
            self.status.open = false;
            self.editing     = false;
        };
        self.removeAttach = function(item) {
            self.attachment.splice(self.attachment.indexOf(item), 1);
            self.checkAttachments();
        };
    }
}).component('filesAttachment', {
    bindings: {
        attachment:       '=',
        save:             '=',
        type:             '=',
        studyName:        '=',
        selectAttachment: '=',
        acceptCallback:   '='
    },
    templateUrl: '/templates/ui-components/files-attachment.html',
    controller:  function(config, $http, $log, FileUploader, $auth) {
        var self = this;
        self.studyName  = self.studyName || '';
        self.attachment = self.attachment || [];

        self.uploader = new FileUploader({
            url:     config.api_url + '/api/upload',
            alias:   'file',
            headers: {
                authorization: 'Bearer ' + $auth.getToken()
            },
            onAfterAddingFile: function() {
                self.loadFileNames();
            },
            autoUpload:    true,
            onSuccessItem: function(item, response) {
                self.attachment.push({
                    contentType: response.contentType,
                    contextHttp: response.contextHttp,
                    url: response.url,
                    title:       response.filename,
                    hash:        response.md5
                });
                self.filenames = '';
            },
            onCompleteAll: function() {
                self.uploader.queue = [];
            }
        });
        self.loadFileNames = function() {
            self.filenames = '';
            var filenames = self.uploader.queue.filter(function(item) {
                return (typeof item.file.name === 'string' && item.file.name);
            });
            filenames = filenames.map(function(item) {
                return item.file.name;
            });
            self.filenames = filenames.join(', ');
        };
    }
}).component('studyViewer', {
    bindings: {
        studyName:        '<',
        selectAttachment: '=',
        attachment:       '=',
        saveAttachment:   '='
    },
    templateUrl: '/templates/ui-components/study-viewer.html',
    controller:  function() {
        var self = this;
        self.studyName  = self.studyName || '';
        self.$onChanges = function() {
            self.isDicom = self.attachment[0].title.indexOf('.dcm') !== -1;
            if (self.attachment && self.attachment.length > 0) {
                if (self.isDicom) {
                    self.selectAttachment(self.attachment[0]);
                }
            }
        };
    }
}).component('studyDicom', {
    bindings: {
        currentAttachment: '<',
        attachment:        '=',
        enableButtons:     '=',
        noDicom:           '='
    },
    templateUrl: '/templates/ui-components/study-dicom.html',
    controller:  function(config, dwv, $log, $q, decoderScripts, $auth, $scope) {
        var self  = this;
        var layer = null;
        self.enabled    = false;
        self.app        = null;
        self.nameButton = 'PLAY';

        this.$onChanges = function(changes) {
            var titleFile = changes.currentAttachment.currentValue.title;
            if (titleFile.indexOf('.dcm') !== -1) {
                if (changes.currentAttachment && changes.currentAttachment.currentValue) {
                    self.isDicomArray = (self.attachment.length > 1 && titleFile.indexOf('.dcm') !== -1);
                    self.loadAttachment(changes.currentAttachment.currentValue);
                }
            }
            return;
        };

        function ValueMaxInPercent(value) {
            return value + parseInt(value * 0.5);
        }

        function ValueMinInPercent(value) {
            return value - parseInt(value * 0.5);
        }

        function setRanges(range, value) {
            range.min   = ValueMinInPercent(value);
            range.max   = ValueMaxInPercent(value);
            range.value = value;
        }

        function setControlWindowLevel() {
            var rangeBrightness = document.getElementById('brightnessRange');
            var rangeContrast   = document.getElementById('contrastRange');
            self.app.addEventListener('load-end', function() {
                setRanges(rangeContrast, self.app.getViewController().getWindowLevel().width);
                setRanges(rangeBrightness, self.app.getViewController().getWindowLevel().center);
            });
            self.app.addEventListener('wl-change', function(event) {
                if (!event.skipGenerate) {
                    rangeBrightness.value = self.app.getViewController().getWindowLevel().center;
                    rangeContrast.value   = self.app.getViewController().getWindowLevel().width;
                } else {
                    setRanges(rangeContrast, self.app.getViewController().getWindowLevel().width);
                    setRanges(rangeBrightness, self.app.getViewController().getWindowLevel().center);
                }
            });

            rangeBrightness.oninput = function setContrast() {
                self.app.getViewController().addWindowLevelPresets({
                    'manual': {
                        'wl':   new dwv.image.WindowLevel(parseInt(this.value), parseInt(rangeContrast.value)),
                        'name': 'manual'
                    }
                });
                self.app.getViewController().setWindowLevelPreset('manual');
                self.app.getViewController().setWindowLevel(parseInt(this.value), parseInt(rangeContrast.value));
            };

            rangeContrast.oninput = function setBrightness() {
                self.app.getViewController().addWindowLevelPresets({
                    'manual': {
                        'wl':   new dwv.image.WindowLevel(parseInt(rangeBrightness.value), parseInt(this.value)),
                        'name': 'manual'
                    }
                });
                self.app.getViewController().setWindowLevelPreset('manual');
                self.app.getViewController().setWindowLevel(parseInt(rangeBrightness.value), parseInt(this.value));
            };
        }

        function setControlEvent() {
            var range = document.getElementById('sliceRange');
            range.min = 0;
            self.app.addEventListener('load-end', function() {
                $scope.$apply(function() {
                    self.isDicomArray = self.isDicomArray || (self.app.getImage().getNumberOfFrames() > 1);
                    self.loading      = false;
                });

                if (!self.isDicomArray) {
                    return;
                }
                range.max = self.app.getImage().getGeometry().getSize().getNumberOfSlices() - 1;
                if (!parseInt(range.max) && self.app.getImage().getNumberOfFrames()) {
                    range.max       = self.app.getImage().getNumberOfFrames() - 1;
                    self.frameArray = true;
                } else {
                    self.frameArray = false;
                }
                self.app.addEventListener('position-change', function() {
                    if (self.frameArray) {
                        range.value = self.app.getViewController().getCurrentFrame();
                    } else {
                        range.value = self.app.getViewController().getCurrentPosition().k;
                    }
                });
                range.oninput = function() {
                    var pos = self.app.getViewController().getCurrentPosition();
                    pos.k = this.value;
                    self.app.getViewController().setCurrentPosition(pos);
                    if (self.frameArray) {
                        self.app.getViewController().setCurrentFrame(this.value);
                    }
                };
            });
        }

        self.initialize = function initialize() {
            return $q(function(resolve) {
                var settings = {
                    'containerDivId': 'dwv'
                };
                layer                    = document.getElementsByClassName('layerContainer');
                layer[0].style.height    = '100%';
                layer[0].style.width     = '100%';
                dwv.gui.getElement       = dwv.gui.base.getElement;
                dwv.image.decoderScripts = decoderScripts;
                self.app                 = new dwv.App();
                dwv.gui.displayProgress  = function(percent) {
                    self.finishLoader = false;
                    $log.info('progress: ', percent, '%');
                };
                self.app.addEventListener('load-start', function() {
                    self.loading = true;
                });
                self.app.init(settings);
                document.getElementById('restart').onclick = self.app.onDisplayReset;
                $log.info('initialize: done!');
                self.enabled = true;
                return resolve();
            });
        };
        self.loadAttachment = function loadAttachment(currentAttachment) {
            var urls = [];
            if (currentAttachment.title.indexOf('.dcm') !== -1 && self.attachment.length > 1) {
                urls = self.attachment.map(function(itemAttachment) {
                    return itemAttachment.url;
                });
            } else {
                urls = [currentAttachment.url];
            }
            self.initialize().then(function() {
                if (urls) {
                    self.app.loadURLs(urls);
                    setControlEvent();
                    setControlWindowLevel();
                    return;
                }
                $log.error('Error loading Attachment: no attachment');
            }).catch($log.error);
        };

        self.playDicom = function() {
            self.nameButton = self.nameButton === 'PAUSE' ? 'PLAY' : 'PAUSE';
            self.app.getViewController().play();
        };

        self.fullScreenAllow = '';
        self.expand          = function() {
            self.fullScreenAllow = 'fullscreen';
        };

        self.desexpand = function() {
            self.fullScreenAllow = '';
        };
    }
}).component('dicomViewer', {
    bindings: {
        attachments:    '=',
        loadAttachment: '=',
        enableButtons:  '='
    },
    templateUrl: '/templates/ui-components/dicom-viewer.html',
    controller:  function(config, dwv, $log, decoderScripts) {
        var self = this;

        self.$onChanges = function(changes) {
            if (changes.attachments) {
                $log.info('attachment changes');
                self.loadAttachments();
            }
        };

        dwv.gui.getElement       = dwv.gui.base.getElement;
        dwv.image.decoderScripts = decoderScripts;

        var app = new dwv.App();
        dwv.gui.displayProgress = function(percent) {
            $log.info('progress: ', percent, '%');
        };
        app.init({
            'containerDivId': 'dwv',
            'tools':          ['WindowLevel']
        });
        document.getElementById('restart').onclick = app.onDisplayReset;

        self.loadAttachment = function loadAttachment(currentAttachment) {
            if (currentAttachment && currentAttachment.url) {
                app.loadURLs([currentAttachment.url]);
            } else {
                $log.error('Error loading Attachment: no attachment');
            }
        };

        self.loadAttachments = function loadAttachments() {
            if (!self.attachments || self.attachments.length === 0 || !self.attachments[0].url) {
                $log.error('no attachments');
                return;
            }

            var images = [];
            if (self.attachments && self.attachments.length) {
                images = self.attachments.map(function(item) {
                    return item.url;
                });
            }
            app.loadURLs(images);

        };
    }
}).component('photoForm', {
    bindings: {
        'photo': '='
    },
    templateUrl: '/templates/ui-components/photo-form.html',
    controller:  function(config) {
        var self = this;
        self.imgUrl = config.api_url + '/api/readfile/?fileid=';
    }
}).component('tableActions', {
    bindings: {
        'properties':       '=',
        'list':             '=',
        'viewState':        '=',
        'editState':        '=',
        'reportState':      '=',
        'orderState':       '=',
        'confirmDelete':    '=',
        'type':             '=',
        'currentUser':      '=',
        'search':           '=',
        'seeker':           '=',
        'callcenter':       '=',
        'transferCall':     '=',
        'practitionerList': '=',
        'changeNotificationStatus': '=',
        'searchWord': '=',
        'userData': '=',
        'validateAction': '=',
        'orderDefault': '<',
        'orientationList': '<'
    },
    templateUrl: '/templates/ui-components/table-actions.html',
    controller:  function($state, $translate, config) {
        var self = this;
        var limit = 10;
        var page = 0;
        var ordersQuantityToSkip = 0;
        self.$onChanges = function() {
            self.front_url = config.front_url;
            self.isAdmin = false;
            if (this.type === 'Admin' || this.type === 'Node Administrator') {
                self.isAdmin = true;
                self.deletedOrHide = $translate.instant('DELETE');
                self.deletedOrHideQuestion = $translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_RECORD');
                self.deletedOrHideDescription = $translate.instant('IF_IT_IS_ACCEPTED_DATA_WILL_BE_PERMANENTLY_DELETED');
            }
            if (this.searchWord) {
                self.searchWordInInput = this.searchWord;
            }
        };
        self.isCreator = function(item) {
            self.deletedOrHide = '';
            if (typeof item.orderer !== 'undefined' && (item.orderer.reference === self.currentUser)) {
                self.deletedOrHide = $translate.instant('HIDE');
                self.deletedOrHideQuestion = $translate.instant('ARE_YOU_SURE_YOU_WANT_TO_HIDE_THE_RECORD');
                self.deletedOrHideDescription = '';
                return true;
            }
            return false;
        };
        self.camelize = function camelize(str) {
            if (typeof str !== 'undefined') {
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index === 0 ?
                        letter.toLowerCase() :
                        letter.toUpperCase();
                }).replace(/\s+/g, '');
            }
            return '';
        };

        if (self.properties && self.properties.length > 0) {
            var propertieDefault = self.orderDefault ? self.orderDefault : self.properties[0];
            self.propertyName = self.camelize(propertieDefault);
            self.reverse      = self.orientationList ? self.orientationList : false;
        }

        self.translateProp = function(str) {
            return $translate.instant(str.toUpperCase().replace(/\ /g, '_'));
        };
        self.editRedirect = function editRedirect(itemId) {
            $state.go(self.editState, {
                id: itemId
            });
        };
        self.viewRedirect = function viewRedirect(itemId) {
            $state.go(self.viewState, {
                id: itemId
            });
        };
        self.orderRedirect = function orderRedirect(itemId) {
            $state.go(self.orderState, {
                patient_id: itemId
            });
        };
        self.reportRedirect = function reportRedirect(itemId) {
            $state.go(self.reportState, {
                diagnostic_order_id: itemId
            });
        };

        self.getDiagnosticPerPage = function(pageToSee, propertyName) {
            self.countPages = Math.ceil(self.list.length / limit);
            self.activePage = pageToSee;
            self.arrayPages = Array.apply(null, Array(self.countPages)).map(function(item, index) {
                return index + 1;
            });


            if (propertyName && self.reverse) {
                self.list = self.list.sort(function(a, b) {
                    if (a[propertyName] > b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] < b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }

            if (propertyName && !self.reverse) {
                self.list = self.list.sort(function(a, b) {
                    if (a[propertyName] < b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] > b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }

            ordersQuantityToSkip = self.activePage * limit;
            self.paginatedList = self.list.slice(ordersQuantityToSkip, ordersQuantityToSkip + limit);
        };

        self.enableRedirect = function(item, prop) {
            if ((!item.sref || !item.sref[self.camelize(prop)]) && !(item.redirectTo && prop === 'title')) {
                return true;
            }
            return false;
        };

        self.moveToPage = function(pageToMove) {
            if (pageToMove >= 0 && pageToMove < self.countPages) {
                self.getDiagnosticPerPage(pageToMove);
            }
        };

        self.getDiagnosticPerPage(page);

        self.selectedToDelete = function(item) {
            self.selectedRegistryToDelete = item;
        };

        self.deleteRegistryOfList = function() {
            self.confirmDelete(self.selectedRegistryToDelete);
            self.paginatedList.splice(self.paginatedList.indexOf(self.selectedRegistryToDelete), 1);
        };

        self.sortBy = function sortBy(propertyName) {
            self.reverse = (self.propertyName === self.camelize(propertyName)) ?
            !self.reverse :
            false;
            self.propertyName = self.camelize(propertyName);

            self.getDiagnosticPerPage(page, self.propertyName);
            self.property = propertyName;

        };

        self.functionSearch = function functionSearch(searchData) {
            self.search(searchData).then(function(resp) {
                self.list = resp;
                self.clearSearching = true;
                self.getDiagnosticPerPage(page);
            });
        };

        self.clearSearch = function clearSearch() {
            self.search().then(function(resp) {
                self.list = resp;
                self.clearSearching = false;
                self.getDiagnosticPerPage(page);
            });
        };

        self.getNotificationId = function getNotificationId(notificationId) {
            self.notificationId = notificationId;
        };

        self.functionTransferCall = function transferCall(practitionerId) {
            self.transferCall(self.notificationId, practitionerId);
        };

    }
}).component('datePicker', {
    bindings: {
        'date':        '=',
        'placeholder': '=',
        'labelText':   '='
    },
    templateUrl: '/templates/ui-components/date-picker.html',
    controller:  function($translate) {
        var self = this;
        self.month = [
            $translate.instant('MONTH_JANUARY'),
            $translate.instant('MONTH_FEBRUARY'),
            $translate.instant('MONTH_MARCH'),
            $translate.instant('MONTH_APRIL'),
            $translate.instant('MONTH_MAY'),
            $translate.instant('MONTH_JUNE'),
            $translate.instant('MONTH_JULY'),
            $translate.instant('MONTH_AUGUST'),
            $translate.instant('MONTH_SEPTEMBER'),
            $translate.instant('MONTH_OCTOBER'),
            $translate.instant('MONTH_NOVEMBER'),
            $translate.instant('MONTH_DECEMBER')
        ];
        self.monthShort = [
            $translate.instant('MONTH_SHORT_JAN'),
            $translate.instant('MONTH_SHORT_FEB'),
            $translate.instant('MONTH_SHORT_MAR'),
            $translate.instant('MONTH_SHORT_APR'),
            $translate.instant('MONTH_SHORT_MAY'),
            $translate.instant('MONTH_SHORT_JUN'),
            $translate.instant('MONTH_SHORT_JUL'),
            $translate.instant('MONTH_SHORT_AUG'),
            $translate.instant('MONTH_SHORT_SEP'),
            $translate.instant('MONTH_SHORT_OCT'),
            $translate.instant('MONTH_SHORT_NOV'),
            $translate.instant('MONTH_SHORT_DEC')
        ];
        self.weekdaysFull = [
            $translate.instant('SUNDAY'),
            $translate.instant('MONDAY'),
            $translate.instant('TUESDAY'),
            $translate.instant('WEDNESDAY'),
            $translate.instant('THURSDAY'),
            $translate.instant('FRIDAY'),
            $translate.instant('SATURDAY')
        ];
        self.weekdaysLetter = [
            $translate.instant('DAY_S'),
            $translate.instant('DAY_M'),
            $translate.instant('DAY_T'),
            $translate.instant('DAY_W'),
            $translate.instant('DAY_TH'),
            $translate.instant('DAY_F'),
            $translate.instant('DAY_SA')
        ];
        self.todayStr = false;
        self.clearStr = $translate.instant('CANCEL');
        self.closeStr = $translate.instant('ACCEPT');
        self.maxDate  = (new Date()).toDateString();
    }

});
