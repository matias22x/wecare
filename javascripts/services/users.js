'use strict';
angular.module('usersService', []).service('userService', function($http, config, $log, $rootScope, $translate) {
    return {
        getAllUser: function() {
            return $http.get(config.api_url + '/api/users');
        },
        getUserById: function(usersId) {
            return $http.get(config.api_url + '/api/users/' + usersId);
        },
        putUserById: function(usersId, newUser) {
            $log.info(newUser);
            return $http.put(config.api_url + '/api/users/' + usersId, newUser);
        },
        postUser: function(data) {
            return $http.post(config.api_url + '/api/users', data).then(function(resp) {
                $rootScope.showDialog($translate.instant('NEW_USER_CREATED'));
                return resp;
            });
        },
        deleteUserById: function(userId) {
            return $http.delete(config.api_url + '/api/users/' + userId);
        },
        validUsername: function(username) {
            return username && config.user_validation.test(username);
        },
        validPassword: function(password) {
            return password && config.pass_validation.test(password);
        },
        updatePassword: function(data) {
            var dataParams = {
                password: data.pass
            };
            var options = {
                headers : {
                    'Authorization': 'Bearer ' + data.token
                }
            };
            return $http.post(config.api_url + '/api/updatepass', dataParams, options);
        },
        checkTokenToRefresh: function() {
            return $http.get(config.api_url + '/api/checkTokenToRefresh');
        }
    };
});
