'use strict';
angular.module('botService', []).service('botService', function($http, config) {

    return {
        postPreguntas: function(data) {
            return $http.post(config.api_url + '/wit', data);
        }
    };

});
