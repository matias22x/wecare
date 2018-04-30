'use strict';

angular.module('notificationService', []).service('notificationService', function($http, config) {
    return {
        getUserNotifications: function(params) {
            var strParams = '';
            if (params) {
                strParams = Object.keys(params).map(function(key) {
                    return key + '=' + params[key];
                }).join('&');
            }
            return $http.get(config.api_url + '/api/usernotifications?' + strParams);
        },
        getNotificationById: function(id) {
            return $http.get(config.api_url + '/api/notifications/' + id);
        },
        putNotificationReaded: function(id, data) {
            return $http.put(config.api_url + '/api/notifications/' + id, data);
        },
        notificationReportEdited: function(data) {
            return $http.post(config.api_url + '/api/notificationreportedited', data);
        },
        revisionDiagnostic: function(data) {
            return $http.post(config.api_url + '/api/revisiondiagnostic', data);
        },
        getLastUserNotification: function(userId) {
            return $http.get(config.api_url + '/api/notifications?sort=-1&limit=1&conditions={"to": "' + userId + '"}');
        },
        readNotificationByReferenceAndUserId: function(notificationData) {
            return $http.post(config.api_url + '/api/readnotifications', notificationData);
        },
        getNotificationByObjectAndUser: function(notificationData) {
            return $http.get(config.api_url + '/api/notifications?conditions={"$and":[{"objectReference":"' + notificationData.objectId + '"},{"to":"' + notificationData.to + '"}]}');
        }
    };
});
