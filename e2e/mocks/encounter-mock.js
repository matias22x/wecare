exports.encounterBackendMock = function() {
    angular.module('encounterBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "58249c6f06d76717eef5d860",
                "updatedAt": "2016-11-17T12:54:16.961Z",
                "createdAt": "2016-11-10T16:12:31.327Z",
                "patient": {
                    "reference": "zasd",
                    "display": "sdfsdf",
                    "_id": "58249c6f06d76717eef5d88c"
                },
                "serviceProvider": {
                    "display": "service",
                    "reference": "provider",
                    "_id": "58249c6f06d76717eef5d876"
                },
                "period": {
                    "_id": "58249c6f06d76717eef5d870",
                    "end": "2016-11-03T00:00:00.000Z",
                    "start": "2016-11-24T00:00:00.000Z"
                },
                "priority": {
                    "text": "asdasd",
                    "_id": "58249c6f06d76717eef5d86e",
                    "coding": [{
                        "_id": "58249c6f06d76717eef5d86f",
                        "code": "asdasd"
                    }, {
                        "code": "qweqwe",
                        "_id": "582ca56c0d992e1545207642"
                    }]
                },
                "length": {
                    "system": "adsd",
                    "unit": "asd",
                    "comparator": "asda",
                    "code": "sda",
                    "value": 1,
                    "_id": "58249c6f06d76717eef5d86d"
                },
                "appointment": {
                    "display": "apointment",
                    "reference": "apointment",
                    "_id": "58249c6f06d76717eef5d866"
                },
                "partOf": {
                    "display": "paet",
                    "reference": "of",
                    "_id": "58249c6f06d76717eef5d862"
                },
                "status": "eeeeestatiss",
                "__v": 46,
                "class": "clases",
                "incomingReferral": [{
                    "reference": "eee",
                    "_id": "582c994c0d992e1545206c24"
                }],
                "type": [{
                    "_id": "58249c6f06d76717eef5d863",
                    "text": "sdfsdfsdfsdf",
                    "coding": [{
                        "code": "sdf",
                        "_id": "58249c6f06d76717eef5d864"
                    }, {
                        "code": "qweqwe",
                        "_id": "582c9bef0d992e1545206d59"
                    }]
                }],
                "identifier": [{
                    "type": {
                        "_id": "58249c6f06d76717eef5d890",
                        "coding": [{
                            "_id": "58249c6f06d76717eef5d891"
                        }]
                    },
                    "value": "test",
                    "_id": "58249c6f06d76717eef5d88f"
                }],
                "episodeOfCare": [{
                    "display": "q",
                    "reference": "222",
                    "_id": "58249c6f06d76717eef5d865"
                }],
                "reason": [{
                    "text": "r2",
                    "_id": "582c9f9e0d992e1545206eea",
                    "coding": [{
                        "code": "asdasdasa22",
                        "_id": "582c9f9e0d992e1545206eeb"
                    }]
                }],
                "location": [{
                    "location": {
                        "_id": "582ca0fb0d992e1545207065"
                    },
                    "period": {
                        "_id": "582ca0fb0d992e1545207064",
                        "end": "2016-11-04T00:00:00.000Z",
                        "start": "2016-11-05T00:00:00.000Z"
                    },
                    "_id": "582ca0fb0d992e1545207063"
                }],
                "indication": [{
                    "display": "4",
                    "_id": "582ca3690d992e15452071bf"
                }],
                "participant": [{
                    "individual": {
                        "display": "11",
                        "reference": "22",
                        "_id": "58249c6f06d76717eef5d875"
                    },
                    "period": {
                        "_id": "58249c6f06d76717eef5d872",
                        "end": "2016-09-21T00:00:00.000Z",
                        "start": "2016-09-02T00:00:00.000Z"
                    },
                    "_id": "58249c6f06d76717eef5d871",
                    "type": [{
                        "text": "t1",
                        "_id": "58249c6f06d76717eef5d873",
                        "coding": [{
                            "code": "asdasdasd",
                            "_id": "58249c6f06d76717eef5d874"
                        }]
                    }]
                }],
                "hospitalization": [{
                    "origin": {
                        "reference": "sdas",
                        "display": "qweqwe",
                        "_id": "58249c6f06d76717eef5d88b"
                    },
                    "admitSource": {
                        "text": "hospi 1 suerce",
                        "_id": "58249c6f06d76717eef5d889",
                        "coding": [{
                            "_id": "58249c6f06d76717eef5d88a",
                            "code": "1111"
                        }]
                    },
                    "reAdmission": {
                        "_id": "58249c6f06d76717eef5d882",
                        "coding": [{
                            "_id": "58249c6f06d76717eef5d883"
                        }]
                    },
                    "preAdmissionIdentifier": {
                        "type": {
                            "_id": "58249c6f06d76717eef5d880",
                            "coding": [{
                                "_id": "58249c6f06d76717eef5d881"
                            }]
                        },
                        "assigner": {
                            "_id": "58249c6f06d76717eef5d87f"
                        },
                        "period": {
                            "_id": "58249c6f06d76717eef5d87e",
                            "end": "2016-11-10T16:12:31.303Z",
                            "start": "2016-11-10T16:12:31.303Z"
                        },
                        "_id": "58249c6f06d76717eef5d87d"
                    },
                    "destination": {
                        "display": "destinity",
                        "reference": "destinity",
                        "_id": "58249c6f06d76717eef5d87a"
                    },
                    "dischargeDisposition": {
                        "display": "des  11",
                        "reference": "des 1",
                        "_id": "58249c6f06d76717eef5d879"
                    },
                    "_id": "58249c6f06d76717eef5d877",
                    "dischargeDiagnosis": [{
                        "display": "descar diag 0",
                        "reference": "descar diag 0",
                        "_id": "58249c6f06d76717eef5d878"
                    }, {
                        "display": "descar diag 1",
                        "reference": "descar diag 1",
                        "_id": "582da866d24302179d669d2b"
                    }, {
                        "reference": "descar diag 2",
                        "display": "descar diag 2",
                        "_id": "582da866d24302179d669d2a"
                    }],
                    "specialCourtesy": [{
                        "_id": "58249c6f06d76717eef5d87b",
                        "coding": [{
                            "_id": "58249c6f06d76717eef5d87c"
                        }]
                    }],
                    "dietPreference": [{
                        "_id": "58249c6f06d76717eef5d884",
                        "coding": [{
                            "_id": "58249c6f06d76717eef5d885"
                        }]
                    }],
                    "specialArrangement": [{
                        "_id": "58249c6f06d76717eef5d886",
                        "coding": [{
                            "code": "0",
                            "_id": "58249c6f06d76717eef5d887"
                        }, {
                            "code": "01",
                            "_id": "582cbeb10d992e1545208691"
                        }]
                    }, {
                        "_id": "582cbeb10d992e154520868f",
                        "coding": [{
                            "code": "20",
                            "_id": "582cbeb10d992e1545208690"
                        }]
                    }, {
                        "_id": "582cbeb10d992e154520868d",
                        "coding": [{
                            "code": "asdasd",
                            "_id": "582cbeb10d992e154520868e"
                        }]
                    }],
                    "admittingDiagnosis": [{
                        "display": "asd",
                        "reference": "00",
                        "_id": "58249c6f06d76717eef5d888"
                    }]
                }, {
                    "origin": {
                        "_id": "582da748d24302179d669c31"
                    },
                    "admitSource": {
                        "_id": "582da748d24302179d669c2f",
                        "coding": [{
                            "_id": "582da748d24302179d669c30"
                        }]
                    },
                    "reAdmission": {
                        "_id": "582da748d24302179d669c28",
                        "coding": [{
                            "_id": "582da748d24302179d669c29"
                        }]
                    },
                    "preAdmissionIdentifier": {
                        "type": {
                            "_id": "582da748d24302179d669c26",
                            "coding": [{
                                "_id": "582da748d24302179d669c27"
                            }]
                        },
                        "assigner": {
                            "_id": "582da748d24302179d669c25"
                        },
                        "period": {
                            "_id": "582da748d24302179d669c24",
                            "end": "2016-11-17T12:49:12.798Z",
                            "start": "2016-11-17T12:49:12.798Z"
                        },
                        "_id": "582da748d24302179d669c23"
                    },
                    "destination": {
                        "_id": "582da748d24302179d669c20"
                    },
                    "dischargeDisposition": {
                        "display": "des 2",
                        "reference": "des 2",
                        "_id": "582da748d24302179d669c1f"
                    },
                    "_id": "582da748d24302179d669c1d",
                    "dischargeDiagnosis": [{
                        "_id": "582da748d24302179d669c1e",
                        "display": "descar diag 10",
                        "reference": "descar diag 10"
                    }],
                    "specialCourtesy": [{
                        "_id": "582da748d24302179d669c21",
                        "coding": [{
                            "_id": "582da748d24302179d669c22"
                        }]
                    }],
                    "dietPreference": [{
                        "_id": "582da748d24302179d669c2a",
                        "coding": [{
                            "_id": "582da748d24302179d669c2b"
                        }]
                    }],
                    "specialArrangement": [{
                        "_id": "582da748d24302179d669c2c",
                        "coding": [{
                            "_id": "582da748d24302179d669c2d"
                        }]
                    }],
                    "admittingDiagnosis": [{
                        "_id": "582da748d24302179d669c2e"
                    }]
                }],
                "statusHistory": [{
                    "period": {
                        "_id": "58249c6f06d76717eef5d88e",
                        "end": "2016-11-25T00:00:00.000Z",
                        "start": "2016-11-01T00:00:00.000Z"
                    },
                    "_id": "58249c6f06d76717eef5d88d",
                    "status": "h1"
                }]
            };

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
            });

            // $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            //     mock
            // );

            $httpBackend.whenGET(config.api_url + '/api/encounters/58249c6f06d76717eef5d860').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/encounters').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/encounters').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
