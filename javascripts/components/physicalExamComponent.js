'use strict';
angular.module('adistalApp')
.component('physicalExam', {
    bindings: {
        entry: '=',
        physicalExam: '=',
        enableEdit: '='
    },
    templateUrl: '/templates/ui-components/form/physical-exam.html',
    controller: function() {
        var self = this;
        self.$onChanges = function() {
            self.editField = self.enableEdit;
        };
        this.arrayToFilterDCMStudy = ['TEMPERATURE', 'RESPIRATORY_SYSTEM', 'CARDIOVASCULAR_APPARATUS'];
        self.generateFlagWithKeypress = function(data) {
            Object.keys(self.entry).forEach(function(key) {
                if(data.item === key) {
                    self.entry[key].text = data.flag;
                }
            });
        };
    }
});
