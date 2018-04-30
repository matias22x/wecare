exports.loginBackendMock = function() {
    angular.module('loginBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4OThkMGMxOTk3YjI2OTczYWM5NzQiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTAxVDEzOjI5OjUyLjI3NFoiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTAxVDEzOjI5OjUyLjI3NFoiLCJ1c2VybmFtZSI6ImJyaWFuIiwidHlwZSI6IkFkbWluIiwiX192IjowLCJ0b2tlbnMiOltdfQ.l7E7AQRgQUY_KpXCtLMtXiLlGbun4zMUMnkhlTczLdo",
                "user": {
                    "_id": "581898d0c1997b26973ac974",
                    "updatedAt": "2016-11-01T13:29:52.274Z",
                    "createdAt": "2016-11-01T13:29:52.274Z",
                    "username": "brian",
                    "type": "Admin",
                    "__v": 0,
                    "tokens": []
                }
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond({
                "__v": 0,
                "updatedAt": "2016-11-17T14:46:41.457Z",
                "createdAt": "2016-11-17T14:46:41.457Z",
                "username": "test",
                "email": "test@127.0.0.1:4000.com",
                "_id": "582dc2d1fc680d2e926329fd",
                "tokens": []
            });

            $httpBackend.whenPOST(config.api_url + '/api/users').respond({
                "_id": "582cbbcd551e0766078efecb",
                "updatedAt": "2016-11-16T20:04:29.992Z",
                "createdAt": "2016-11-16T20:04:29.992Z",
                "username": "test",
                "email": "test@127.0.0.1:4000.com",
                "__v": 0,
                "tokens": []
            });


            $httpBackend.whenGET(config.api_url + '/api/users').respond([{
                    "_id": "581898d0c1997b26973ac974",
                    "updatedAt": "2016-11-01T13:29:52.274Z",
                    "createdAt": "2016-11-01T13:29:52.274Z",
                    "username": "brian",
                    "type": "Admin",
                    "__v": 0,
                    "tokens": []
                },
                {
                    "_id": "582cbbcd551e0766078efecb",
                    "updatedAt": "2016-11-16T20:04:29.992Z",
                    "createdAt": "2016-11-16T20:04:29.992Z",
                    "username": "test",
                    "email": "test@test.com",
                    "__v": 0,
                    "tokens": []
                }
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
