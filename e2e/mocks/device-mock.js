exports.deviceBackendMock = function() {
    angular.module('deviceBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582b17139bb54025c5ebb71f",
                "updatedAt": "2016-11-15T14:10:29.354Z",
                "createdAt": "2016-11-15T14:09:23.782Z",
                "owner": {
                    "_id": "582b17139bb54025c5ebb725"
                },
                "location": {
                    "_id": "582b17139bb54025c5ebb724"
                },
                "patient": {
                    "_id": "582b17139bb54025c5ebb723"
                },
                "type": {
                    "_id": "582b17139bb54025c5ebb720",
                    "coding": [{
                        "_id": "582b17139bb54025c5ebb721"
                    }]
                },
                "__v": 3,
                "model": "asdasdasd",
                "contact": [{
                    "_id": "582b17139bb54025c5ebb722",
                    "value": "aaaaa"
                }],
                "note": [{
                    "authorReference": {
                        "_id": "582b17139bb54025c5ebb727"
                    },
                    "_id": "582b17139bb54025c5ebb726",
                    "time": {
                        "type": "2016-11-15T14:09:23.770Z"
                    }
                }],
                "identifier": [{
                    "type": {
                        "_id": "582b17139bb54025c5ebb729",
                        "coding": [{
                            "_id": "582b17139bb54025c5ebb72a"
                        }]
                    },
                    "value": "test",
                    "_id": "582b17139bb54025c5ebb728"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            // $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            //     mock
            // );

            $httpBackend.whenGET(config.api_url + '/api/devices/582b17139bb54025c5ebb71f').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/devices').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/devices').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
