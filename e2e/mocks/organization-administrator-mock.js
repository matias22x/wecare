exports.organizationadministratorBackendMock = function() {
    angular.module('organizationadministratorBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "5829eebd930b8a6ba16f9ede",
                "updatedAt": "2016-11-14T17:05:01.740Z",
                "createdAt": "2016-11-14T17:05:01.740Z",
                "active": true,
                "__v": 0,
                "partOf": [{
                    "_id": "5829eebd930b8a6ba16f9edf"
                }],
                "identifier": [{
                    "type": {
                        "_id": "5829eebd930b8a6ba16f9ee4",
                        "coding": [{
                            "_id": "5829eebd930b8a6ba16f9ee5"
                        }]
                    },
                    "value": "test",
                    "_id": "5829eebd930b8a6ba16f9ee3"
                }],
                "address": [{
                    "_id": "5829eebd930b8a6ba16f9ee2",
                    "line": []
                }],
                "photo": [{
                    "_id": "5829eebd930b8a6ba16f9ee0",
                    "creation": "2016-11-14T17:05:01.733Z"
                }],
                "telecom": [{
                    "_id": "5829eebd930b8a6ba16f9ee1"
                }],
                "name": []
            };

            var userMock = {
              _id: "59c3d67c782eb70021720014",
              updatedAt: "2017-09-21T15:10:52.887Z",
              createdAt: "2017-09-21T15:10:52.887Z",
              username: "test1",
              email: "auxiliarusers@mail.com",
              type: "Organization Administrator",
              __v: 0,
              role: {
                  organization_administrator: "59c3d67c782eb70021720015"
              },
              tokens: [ ],
              deleted: false
            };

            $httpBackend.whenPOST(config.api_url + '/api/users').respond({
                "_id": "582cbbcd551e0766078efecb",
                "updatedAt": "2016-11-16T20:04:29.992Z",
                "createdAt": "2016-11-16T20:04:29.992Z",
                "username": "test",
                "email": "test@127.0.0.1:4000.com",
                "__v": 0,
                "role": {
                    "organization_administrator": "5829eebd930b8a6ba16f9ede"
                },
                "tokens": []
            });

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ",
                "user": {
              		"username": "admin",
              		"email": "admin@mail.com",
              		"type": "Node Administrator",
              		"role": {
              			"node_administrator": "59aeac4dc0a1e30017eb724e"
              		},
              		"tokens": [],
              		"deleted": false
              	}
            });

            // $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            //     mock
            // );

            $httpBackend.whenGET(config.api_url + '/api/organizationadministrators/5829eebd930b8a6ba16f9ede').respond(mock);

            $httpBackend.whenPUT(config.api_url + '/api/organizationadministrators/5829eebd930b8a6ba16f9ede').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/organizationadministrators').respond(mock);

            $httpBackend.whenGET(config.api_url + '/api/users').respond([userMock]);

            $httpBackend.whenGET(config.api_url + '/api/users/59c3d67c782eb70021720014').respond(userMock);

            $httpBackend.whenGET(config.api_url + '/api/organizationadministrators').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
