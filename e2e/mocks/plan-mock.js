exports.planBackendMock = function() {
    angular.module('planBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582f145d83cf3010f3baa0cb",
                "updatedAt": "2016-11-18T14:46:53.979Z",
                "createdAt": "2016-11-18T14:46:53.979Z",
                "clientOrganization": {
                    "_id": "582f145d83cf3010f3baa0cc"
                },
                "buyCredit": false,
                "__v": 0,
                "identifier": [{
                    "type": {
                        "_id": "582f145d83cf3010f3baa0d0",
                        "coding": [{
                            "_id": "582f145d83cf3010f3baa0d1"
                        }]
                    },
                    "value": "test",
                    "_id": "582f145d83cf3010f3baa0cf"
                }],
                "serviceType": [{
                    "_id": "582f145d83cf3010f3baa0ce"
                }],
                "providerOrganization": [{
                    "_id": "582f145d83cf3010f3baa0cd"
                }]
            };


            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/plans/582f145d83cf3010f3baa0cb').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/plans').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/plans').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
