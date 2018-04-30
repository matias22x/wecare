'use strict';
angular.module('adistalApp')
.controller('structureCtrl', function($scope, $http, $state, $stateParams, config, utilities, $log, $rootScope, $translate) {
    $rootScope.title = $translate.instant('DATA_STRUCTURE');
    $rootScope.description = '';
});
