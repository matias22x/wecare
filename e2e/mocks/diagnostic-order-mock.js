exports.diagnosticorderBackendMock = function() {
    angular.module('diagnosticorderBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582b66af9bb54025c5ebcfb2",
                "updatedAt": "2016-11-15T20:19:37.281Z",
                "createdAt": "2016-11-15T19:49:03.336Z",
                "managingOrganization": {
                    "display": "dasda",
                    "reference": "sd",
                    "_id": "582b66af9bb54025c5ebcfbc"
                },
                "subject": {
                    "_id": "582b66af9bb54025c5ebcfbb"
                },
                "orderer": {
                    "_id": "582b66af9bb54025c5ebcfba"
                },
                "encounter": {
                    "_id": "582b66af9bb54025c5ebcfb9"
                },
                "type": {
                    "_id": "582b66af9bb54025c5ebcfb5",
                    "coding": [{
                        "_id": "582b66af9bb54025c5ebcfb6"
                    }]
                },
                "__v": 5,
                "note": [{
                    "authorReference": {
                        "display": "asd",
                        "reference": "asd",
                        "_id": "582b66af9bb54025c5ebcfbe"
                    },
                    "_id": "582b66af9bb54025c5ebcfbd",
                    "time": {
                        "type": "2016-11-15T19:49:03.315Z"
                    }
                }, {
                    "authorReference": {
                        "reference": "22",
                        "display": "222",
                        "_id": "582b6dd99bb54025c5ebd236"
                    },
                    "_id": "582b6dd99bb54025c5ebd235",
                    "time": {
                        "type": "2016-11-15T20:19:37.266Z"
                    }
                }],
                "item": [{
                    "code": {
                        "_id": "582b66af9bb54025c5ebcfcb",
                        "coding": [{
                            "_id": "582b66af9bb54025c5ebcfcc"
                        }]
                    },
                    "specimen": {
                        "_id": "582b66af9bb54025c5ebcfca"
                    },
                    "bodySite": {
                        "_id": "582b66af9bb54025c5ebcfc8",
                        "coding": [{
                            "_id": "582b66af9bb54025c5ebcfc9"
                        }]
                    },
                    "_id": "582b66af9bb54025c5ebcfbf",
                    "event": [{
                        "description": {
                            "text": "des 0 0",
                            "_id": "582b66af9bb54025c5ebcfc6",
                            "coding": [{
                                "_id": "582b66af9bb54025c5ebcfc7"
                            }]
                        },
                        "actor": {
                            "display": "act 1",
                            "_id": "582b66af9bb54025c5ebcfc5"
                        },
                        "_id": "582b66af9bb54025c5ebcfc4"
                    }]
                }],
                "event": [{
                    "description": {
                        "_id": "582b66af9bb54025c5ebcfcf",
                        "coding": [{
                            "_id": "582b66af9bb54025c5ebcfd0"
                        }]
                    },
                    "actor": {
                        "_id": "582b66af9bb54025c5ebcfce"
                    },
                    "_id": "582b66af9bb54025c5ebcfcd"
                }],
                "specimen": [{
                    "_id": "582b66af9bb54025c5ebcfb8"
                }],
                "supportingInformation": [{
                    "_id": "582b66af9bb54025c5ebcfb7"
                }],
                "reason": [{
                    "_id": "582b66af9bb54025c5ebcfb3",
                    "coding": [{
                        "_id": "582b66af9bb54025c5ebcfb4"
                    }]
                }],
                "identifier": [{
                    "type": {
                        "_id": "582b66af9bb54025c5ebcfd2",
                        "coding": [{
                            "_id": "582b66af9bb54025c5ebcfd3"
                        }]
                    },
                    "value": "test",
                    "_id": "582b66af9bb54025c5ebcfd1"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            // $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            //     mock
            // );

            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders/582b66af9bb54025c5ebcfb2').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/diagnosticorders').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
