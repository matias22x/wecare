'use strict';
angular.module('wecareApp')
    .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('listado');
    })
    .controller('agregarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('agregar');
    })
    .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('editar');
    });
