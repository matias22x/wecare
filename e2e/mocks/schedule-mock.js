exports.scheduleBackendMock = function() {
    angular.module('scheduleBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582f0ac683cf3010f3baa009",
                "updatedAt": "2016-11-18T14:05:58.111Z",
                "createdAt": "2016-11-18T14:05:58.111Z",
                "actor": {
                    "_id": "582f0ac683cf3010f3baa00c"
                },
                "__v": 0,
                "type": [{
                    "_id": "582f0ac683cf3010f3baa00a",
                    "coding": [{
                        "_id": "582f0ac683cf3010f3baa00b"
                    }]
                }],
                "identifier": [{
                    "type": {
                        "_id": "582f0ac683cf3010f3baa00e",
                        "coding": [{
                            "_id": "582f0ac683cf3010f3baa00f"
                        }]
                    },
                    "value": "test",
                    "_id": "582f0ac683cf3010f3baa00d"
                }]
            };


            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/schedules/582f0ac683cf3010f3baa009').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/schedules').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/schedules').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
