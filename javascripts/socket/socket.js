'use strict';
var utilitiesModule = angular.module('socket', []);
utilitiesModule.factory('socket', function(config) {
    var socket = io(config.api_url);
    return socket;
});
