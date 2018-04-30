'use strict';

angular.module('adistalApp')
    .component('background', {
        bindings: {
            entry: '=',
            toxicHabits: '=',
            psysiologicHabits: '=',
            chillhoodDiseases: '=',
            horizontalTransmitionDiseases: '=',
            adultDiseases: '=',
            enableEdit: '='
        },
        templateUrl: '/templates/ui-components/form/background.html',
        controller:  function() {
            var self = this;
            self.newChillhoodDisease = {};
            self.newHorizontalTransmitionDisease = {};
            self.newAdultDisease = {};

            self.$onChanges = function() {
                self.editField = self.enableEdit;
            };

            self.generateFlag = function(data) {
                Object.keys(self.entry).forEach(function(key) {
                    if (data.item === key) {
                        self.entry[key].text = data.flag;
                    }
                });
            };
            self.countPsysiologicHabits = function() {
                var aux = self.psysiologicHabits.filter(function(index) {
                    return self.entry[index] && self.entry[index].version;
                });
                return aux.length;
            };

            self.countChillhoodDiseases = function() {
                var aux = self.chillhoodDiseases.filter(function(index) {
                    return self.entry[index] && self.entry[index].version;
                });
                return aux.length;
            };

            self.countAdultDiseases = function() {
                var aux = self.adultDiseases.filter(function(index) {
                    return self.entry[index] && self.entry[index].version;
                });
                return aux.length;
            };

            self.countHorizontalTransmitionDiseases = function() {
                var aux = self.horizontalTransmitionDiseases.filter(function(index) {
                    return self.entry[index] && self.entry[index].version;
                });
                return aux.length;
            };
            self.generateChillhoodDisease = function() {
                if (self.chillhoodDiseases.indexOf('Otra(' + self.newChillhoodDisease.value + ')') === -1) {
                    self.chillhoodDiseases.push('Otra(' + self.newChillhoodDisease.value + ')');
                    var newIndex = 'Otra(' + self.newChillhoodDisease.value + ')';

                    self.entry[newIndex] = {
                        text: 'chillhoodDiseases',
                        value: true,
                        code: self.newChillhoodDisease.code || '',
                        version: self.newChillhoodDisease.version || ''
                    };
                }
                self.newChillhoodDisease = {};
            };

            self.generateHorizontalTransmitionDisease = function() {
                if (self.horizontalTransmitionDiseases.indexOf('Otra(' + self.newHorizontalTransmitionDisease.value + ')') === -1) {
                    self.horizontalTransmitionDiseases.push('Otra(' + self.newHorizontalTransmitionDisease.value + ')');
                    var newIndex = 'Otra(' + self.newHorizontalTransmitionDisease.value + ')';

                    self.entry[newIndex] = {
                        text: 'horizontalTransmitionDiseases',
                        value: true,
                        code: self.newHorizontalTransmitionDisease.code || '',
                        version: self.newHorizontalTransmitionDisease.version || ''
                    };
                }
                self.newHorizontalTransmitionDisease = {};
            };

            self.generateAdultDisease = function() {
                if (self.adultDiseases.indexOf('Otra(' + self.newAdultDisease.value + ')') === -1) {
                    self.adultDiseases.push('Otra(' + self.newAdultDisease.value + ')');
                    var newIndex = 'Otra(' + self.newAdultDisease.value + ')';

                    self.entry[newIndex] = {
                        text: 'adultDiseases',
                        value: true,
                        code: self.newAdultDisease.code || '',
                        version: self.newAdultDisease.version || ''
                    };
                }
                self.newAdultDisease = {};
            };
        }
    });
