'use strict';
angular.module('callerService', []).service('callerService', function($http, config) {
    return {
        acceptCall: function(data) {
            return $http.post(config.api_url + '/api/callers', data);
        },
        reTransferCall: function(data) {
            return $http.post(config.api_url + '/api/resendnotifications', data);
        },
        rejectProcedureRequest: function(data) {
            return $http.post(config.api_url + '/api/rejectprocedure', data);
        }
    };
});
