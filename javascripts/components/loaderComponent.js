'use strict';
angular.module('adistalApp')
.component('loader', {
    bindings: {
        loadingText: '='
    },
    templateUrl: '/templates/ui-components/loader.html',
    controller: function() {
        var self = this;
    }
});
