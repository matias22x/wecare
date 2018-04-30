exports.slotBackendMock = function() {
    angular.module('slotBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582e00c1d24302179d66dbe2",
                "updatedAt": "2016-11-17T19:10:57.515Z",
                "createdAt": "2016-11-17T19:10:57.515Z",
                "schedule": {
                    "_id": "582e00c1d24302179d66dbe4"
                },
                "type": {
                    "_id": "582e00c1d24302179d66dbe3",
                    "coding": []
                },
                "__v": 0,
                "identifier": [{
                    "type": {
                        "_id": "582e00c1d24302179d66dbe6",
                        "coding": [{
                            "_id": "582e00c1d24302179d66dbe7"
                        }]
                    },
                    "value": "test",
                    "_id": "582e00c1d24302179d66dbe5"
                }]
            };


            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/slots/582e00c1d24302179d66dbe2').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/slots').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/slots').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
