exports.serviceTypeBackendMock = function() {
    angular.module('serviceTypeBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582efb5d83cf3010f3ba9f31",
                "updatedAt": "2016-11-18T13:00:14.001Z",
                "createdAt": "2016-11-18T13:00:14.001Z",
                "type": {
                    "_id": "582efb5d83cf3010f3ba9f36",
                    "coding": [{
                        "_id": "582efb5d83cf3010f3ba9f37"
                    }]
                },
                "speciality": {
                    "_id": "582efb5d83cf3010f3ba9f34",
                    "coding": [{
                        "_id": "582efb5d83cf3010f3ba9f35"
                    }]
                },
                "creditCost": 0,
                "__v": 0,
                "diagnosticService": [{
                    "_id": "582efb5d83cf3010f3ba9f32",
                    "coding": [{
                        "_id": "582efb5d83cf3010f3ba9f33"
                    }]
                }],
                "identifier": [{
                    "type": {
                        "_id": "582efb5d83cf3010f3ba9f3a",
                        "coding": [{
                            "_id": "582efb5d83cf3010f3ba9f3b"
                        }]
                    },
                    "assigner": {
                        "_id": "582efb5d83cf3010f3ba9f39"
                    },
                    "value": "test",
                    "_id": "582efb5d83cf3010f3ba9f38"
                }]
            };


            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/servicetypes/582efb5d83cf3010f3ba9f31').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/servicetypes').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/servicetypes').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
