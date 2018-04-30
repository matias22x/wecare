'use strict';
angular.module('statisticsService', []).service('statisticsService', function($http, config) {
    return {
        getstatisticsByOrganization: function() {
            return $http.get(config.api_url + '/api/organizationstatistics/');
        }
    };

});
