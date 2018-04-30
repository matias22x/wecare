exports.appointmentBackendMock = function() {
    angular.module('appointmentBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "5824855c06d76717eef5c768",
                "updatedAt": "2016-11-10T14:34:28.806Z",
                "createdAt": "2016-11-10T14:34:04.592Z",
                "type": {
                    "_id": "5824855c06d76717eef5c76d",
                    "coding": [{
                        "_id": "5824855c06d76717eef5c76e"
                    }]
                },
                "reason": {
                    "_id": "5824855c06d76717eef5c76b",
                    "coding": [{
                        "_id": "5824855c06d76717eef5c76c"
                    }]
                },
                "status": "status1112",
                "priority": 0,
                "minutesDuration": 0,
                "__v": 2,
                "participant": [{
                    "actor": {
                        "_id": "5824855c06d76717eef5c767"
                    },
                    "_id": "5824855c06d76717eef5c766",
                    "type": [{
                        "_id": "5824855c06d76717eef5c768",
                        "coding": [{
                            "_id": "5824855c06d76717eef5c769"
                        }]
                    }]
                }],
                "slot": [{
                    "_id": "5824855c06d76717eef5c76a"
                }],
                "identifier": [{
                    "type": {
                        "_id": "5824855c06d76717eef5c770",
                        "coding": [{
                            "_id": "5824855c06d76717eef5c771"
                        }]
                    },
                    "value":"test",
                    "_id": "5824855c06d76717eef5c76f"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            $httpBackend.whenGET(config.api_url + '/api/appointments/5824855c06d76717eef5c768').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/appointments').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/appointments').respond([
                mock
            ]);
            
            $httpBackend.whenGET(config.api_url + '/api/appointments/').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!\/api)/).passThrough(); ///^(?!(\/api))/
        });
};
