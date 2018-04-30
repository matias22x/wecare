exports.locationBackendMock = function() {
    angular.module('locationBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582341f79b554215e25edc34",
                "updatedAt": "2016-11-10T16:19:30.818Z",
                "createdAt": "2016-11-09T15:34:15.099Z",
                "physicalType": {
                    "_id": "582341f79b554215e25edc38",
                    "coding": [{
                        "_id": "582341f79b554215e25edc39"
                    }]
                },
                "address": {
                    "_id": "582341f79b554215e25edc37",
                    "line": []
                },
                "type": {
                    "_id": "582341f79b554215e25edc35",
                    "coding": []
                },
                "__v": 3,
                "status": "status",
                "identifier": [{
                    "type": {
                        "_id": "582341f79b554215e25edc3b",
                        "coding": [{
                            "_id": "582341f79b554215e25edc3c",
                            "code": "test"
                        }]
                    },
                    "value": "test",
                    "_id": "582341f79b554215e25edc3a"
                }],
                "telecom": [{
                    "_id": "582341f79b554215e25edc36"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            // $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            //     mock
            // );

            $httpBackend.whenGET(config.api_url + '/api/locations/582341f79b554215e25edc34').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/locations').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/locations').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
