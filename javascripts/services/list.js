'use strict';
angular.module('listService', []).service('listService', function($http, config) {
    return {
        postList: function(data) {
            return $http.post(config.api_url + '/api/lists', data);
        },
        putList: function(id, data) {
            return $http.put(config.api_url + '/api/lists/' + id, data);
        },
        getList: function(patientId) {
            return $http.get(config.api_url + '/api/lists?conditions={"$and":[{"subject.reference":"' + patientId + '"},{"code.text":"background"}]}');
        },
        getListPhysicalExam: function(procedureRequestId) {
            return $http.get(config.api_url + '/api/lists?conditions={"$and":[{"code.text":"physicalExam"},{"source.reference":"' + procedureRequestId + '"}]}');
        },
        getListByProcedure: function(procedureId) {
            return $http.get(config.api_url + '/api/lists?conditions={"source.reference":"' + procedureId + '"}');
        },
        getListBackGround: function(patientId) {
            return $http.get(config.api_url + '/api/lists?conditions={"$and":[{"subject.reference":"' + patientId + '"},{"code.text":"background"}]}');
        }
    };
});
