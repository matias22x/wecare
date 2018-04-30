exports.organizationBackendMock = function() {
    angular.module('organizationBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "58262e5557310216893da0d8",
                "updatedAt": "2016-11-14T17:03:58.344Z",
                "createdAt": "2016-11-11T20:47:17.907Z",
                "type": {
                    "_id": "58262e5557310216893da0da",
                    "coding": [{
                        "_id": "58262e5557310216893da0db"
                    }]
                },
                "name": "test",
                "partOf": {
                },
                "active": true,
                "__v": 3,
                "identifier": [{
                    "type": {
                        "_id": "58262e5557310216893da0e7",
                        "coding": [{
                            "_id": "58262e5557310216893da0e8"
                        }]
                    },
                    "value": "test",
                    "_id": "58262e5557310216893da0e6"
                }],
                "address": [{
                    "use": "Home",
                    "_id": "58262e5557310216893da0e5",
                    "line": []
                }, {
                    "use": "Email",
                    "_id": "58262e5557310216893da0e4",
                    "line": []
                }],
                "contact": [{
                    "purpose": {
                        "_id": "58262e5557310216893da0de",
                        "coding": [{
                            "_id": "58262e5557310216893da0df"
                        }]
                    },
                    "address": {
                        "_id": "58262e5557310216893da0dd",
                        "line": []
                    },
                    "_id": "58262e5557310216893da0dc",
                    "telecom": [{
                        "_id": "58262e5557310216893da0e1"
                    }, {
                        "_id": "58262e5557310216893da0e0"
                    }]
                }],
                "telecom": [{
                    "_id": "5829ee7e930b8a6ba16f9ea3"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenGET(/\/api\/organizations\/58262e5557310216893da0d8/).respond(mock);

            $httpBackend.whenPOST(/\/api\/organizations/).respond(mock);

            $httpBackend.whenGET(/\/api\/organizations/).respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
