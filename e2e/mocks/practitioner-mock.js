exports.practitionerBackendMock = function() {
    angular.module('practitionerBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582f133a83cf3010f3baa081",
                "updatedAt": "2016-11-18T14:42:02.843Z",
                "createdAt": "2016-11-18T14:42:02.843Z",
                "name": {
                    "_id": "582f133a83cf3010f3baa097",
                    "prefix": [],
                    "given": [],
                    "family": [],
                    "text": 'test',
                    "suffix": []
                },
                "__v": 0,
                "identifier": [{
                    "type": {
                        "_id": "582f133a83cf3010f3baa09a",
                        "coding": [{
                            "_id": "582f133a83cf3010f3baa09b"
                        }]
                    },
                    "value": "test",
                    "_id": "582f133a83cf3010f3baa099"
                }],
                "photo": [{
                    "_id": "582f133a83cf3010f3baa08a"
                }],
                "qualification": [{
                    "period": {
                        "_id": "582f133a83cf3010f3baa087",
                        "end": "2016-11-18T14:42:02.807Z",
                        "start": "2016-11-18T14:42:02.807Z"
                    },
                    "issuer": {
                        "_id": "582f133a83cf3010f3baa083"
                    },
                    "_id": "582f133a83cf3010f3baa082",
                    "identifier": [{
                        "type": {
                            "_id": "582f133a83cf3010f3baa085",
                            "coding": [{
                                "_id": "582f133a83cf3010f3baa086"
                            }]
                        },
                        "_id": "582f133a83cf3010f3baa084"
                    }],
                    "code": [{
                        "_id": "582f133a83cf3010f3baa088",
                        "coding": [{
                            "_id": "582f133a83cf3010f3baa089"
                        }]
                    }]
                }],
                "practitionerRole": [{
                    "managingOrganization": {
                        "_id": "582f133a83cf3010f3baa094"
                    },
                    "role": {
                        "_id": "582f133a83cf3010f3baa08f",
                        "coding": [{
                            "_id": "582f133a83cf3010f3baa090"
                        }]
                    },
                    "period": {
                        "_id": "582f133a83cf3010f3baa08d",
                        "end": "2016-11-18T14:42:02.816Z",
                        "start": "2016-11-18T14:42:02.816Z"
                    },
                    "expert": false,
                    "_id": "582f133a83cf3010f3baa08c",
                    "location": [{
                        "_id": "582f133a83cf3010f3baa08e"
                    }],
                    "healthcareService": [{
                        "_id": "582f133a83cf3010f3baa091"
                    }],
                    "speciality": [{
                        "_id": "582f133a83cf3010f3baa092",
                        "coding": [{
                            "_id": "582f133a83cf3010f3baa093"
                        }]
                    }]
                }],
                "communication": [{
                    "_id": "582f133a83cf3010f3baa095",
                    "coding": [{
                        "_id": "582f133a83cf3010f3baa096"
                    }]
                }],
                "address": [{
                    "_id": "582f133a83cf3010f3baa098",
                    "line": []
                }],
                "telecom": [{
                    "_id": "582f133a83cf3010f3baa08b"
                }]
            };
            var organizationMockData = {
                "_id": "58262e5557310216893da0d8",
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
            var roloMockData = {
                  "organization": {
                      "display": "Grava Digital",
                      "reference": "58262e5557310216893da0d8"
                  },
                  "role": {
                      "_id": "582f133a83cf3010f3baa08f",
                      "coding": [{
                          "_id": "582f133a83cf3010f3baa090"
                      }]
                  },
                  "period": {
                      "_id": "582f133a83cf3010f3baa08d",
                      "end": "2016-11-18T14:42:02.816Z",
                      "start": "2016-11-18T14:42:02.816Z"
                  },
                  "expert": false,
                  "_id": "582f133a83cf3010f3baa08c",
                  "location": [{
                      "_id": "582f133a83cf3010f3baa08e"
                  }],
                  "healthcareService": [{
                      "_id": "582f133a83cf3010f3baa091"
                  }],
                  "specialty": [{
                      "_id": "582f133a83cf3010f3baa092",
                      "coding": [{
                          "_id": "582f133a83cf3010f3baa093"
                      }]
                  }],
                  "practitioner": {
                    "display": "practitioners",
                    "_id": "582f133a83cf3010f3baa081"
                  }
            };

            var userMock = {
              _id: "59c3d67c782eb70021720014",
              updatedAt: "2017-09-21T15:10:52.887Z",
              createdAt: "2017-09-21T15:10:52.887Z",
              username: "test1",
              email: "auxiliarusers@mail.com",
              type: "Practitioner",
              __v: 0,
              role: {
                  practitioner: "59c3d67c782eb70021720015"
              },
              tokens: [ ],
              deleted: false
            };

            $httpBackend.whenGET(config.api_url + '/api/organizations').respond([
                organizationMockData
            ]);
            $httpBackend.whenPOST(config.api_url + '/api/users').respond(userMock);
            $httpBackend.whenGET(config.api_url + '/api/users').respond([userMock]);
            $httpBackend.whenGET(config.api_url + '/api/users/59c3d67c782eb70021720014').respond(userMock);
            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ",
                "user": {
                    "_id": "581898d0c1997b26973ac974",
                    "updatedAt": "2016-11-01T13:29:52.274Z",
                    "createdAt": "2016-11-01T13:29:52.274Z",
                    "username": "brian",
                    "type": "Node Administrator",
                    "role": {
                        "node_administrator": "5825ec2054900f7213daebae"
                    },
                    "__v": 0,
                    "tokens": []
                }
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/practitioners/582f133a83cf3010f3baa081').respond(mock);

            $httpBackend.whenGET(config.api_url + '/api/practitionerroles?conditions={"practitioner.reference":"582f133a83cf3010f3baa081"}').respond([roloMockData]);

            $httpBackend.whenPUT(config.api_url + '/api/practitioners/582f133a83cf3010f3baa081').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/practitioners').respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/practitionerroles').respond(roloMockData);
            $httpBackend.whenGET(config.api_url + '/api/predeterminates')
            $httpBackend.whenGET(config.api_url + '/api/practitioners').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
