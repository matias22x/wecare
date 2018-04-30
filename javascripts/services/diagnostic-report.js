'use strict';
angular.module('diagnosticReportService', []).service('diagnosticReportService', function($http, config) {
    return {
        getAllDiagnosticReport: function(limit) {
            if (limit) {
                return $http.get(config.api_url + '/api/diagnosticreports?limit=' + limit);
            }
            return $http.get(config.api_url + '/api/diagnosticreports');
        },
        getAllDiagnosticReportByOrganizationLender: function(options, data) {
            var limit = options.limit || 20;
            return $http.get(config.api_url + '/api/diagnosticreports?limit=' + limit + '&conditions={"performer.actor.reference":"' + options.organizationId + '"}&{"$or":[{"identifier.value":{"$regex": "' + data + '", "$options": "i"}},{"performer.actor.display":{"$regex": "' + data + '", "$options": "i"}}]}');
        },
        getAllDiagnosticReportByUser: function(userid) {
            return $http.get(config.api_url + '/api/diagnosticreports?conditions={"performer.actor.reference":"' + userid + '"}');
        },
        getDiagnosticReport: function(diagnosticId) {
            return $http.get(config.api_url + '/api/diagnosticreports/' + diagnosticId);
        },
        putDiagnosticReportById: function(diagnosticId, data) {
            return $http.put(config.api_url + '/api/diagnosticreports/' + diagnosticId, data);
        },
        postDiagnosticReport: function(data) {
            return $http.post(config.api_url + '/api/diagnosticreports', data);
        },
        deleteDiagnosticReportById: function(diagnosticId) {
            return $http.delete(config.api_url + '/api/diagnosticreports/' + diagnosticId);
        },
        getUserDiagnosticReport: function(userId) {
            return $http.get(config.api_url + '/api/diagnosticreports/?conditions={"orderer.reference":"' + userId + '"}');
        },
        getUserDiagnosticReportLimit: function(userId, limit) {
            return $http.get(config.api_url + '/api/diagnosticreports/?conditions={"performer.actor.reference":"' + userId + '"}&limit=' + limit);
        },
        getByRequest: function(diagnosticId) {
            return $http.get(config.api_url + '/api/diagnosticreports/?conditions={"request.reference":"' +
                diagnosticId + '"}');
        },
        getPatientByReference: function(reference) {
            return $http.get(config.api_url + '/api/patients/' + reference);
        },
        getDiagnosticReportByOrganizationClient: function(options) {
            var lim = (options && options.limit) || 20;
            return $http.get(config.api_url + '/api/procedurerequests?conditions={"requester.onBehalfOf.reference":"' + options.organizationId + '"}&limit=' + lim + '&select=_id')
            .then(function(resp) {
                var idsRequests = resp.data.map(function(request) {
                    return request._id;
                });
                return $http.get(config.api_url + '/api/diagnosticreports?conditions={"basedOn.reference":{"$in":' + JSON.stringify(idsRequests) + '}}');
            });
        },
        searchReportRequestsRoute: function(data, organizationId, typePractitioner) {
            var dataParams = '?';
            if (data) {
                data = Object.keys(data).length && typeof data === 'object' && JSON.stringify(data);
                dataParams += 'data=' + data;
            }
            if (typePractitioner) {
                dataParams += '&organization=' + organizationId;
            }
            if (!typePractitioner || typePractitioner === 'CLIENT') {
                return $http.get(config.api_url + '/api/searchingreportsclient' + dataParams);
            }
            return $http.get(config.api_url + '/api/searchingreportslender' + dataParams);
        },
        getSkippedReportLender: function(organizationId) {
            return $http.get(config.api_url + '/api/diagnosticreports/?conditions={"performer.actor.reference":"' + organizationId + '"}&sort=-createdAt&limit=10');
        }
    };
});
