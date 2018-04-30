exports.diagnosticreportBackendMock = function() {
    angular.module('diagnosticreportBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "582c84fc0d992e1545206545",
                "updatedAt": "2016-11-16T17:25:29.081Z",
                "createdAt": "2016-11-16T16:10:36.899Z",
                "category": {
                    "text": "category",
                    "_id": "582c84fc0d992e1545206552",
                    "coding": [{
                        "_id": "582c84fc0d992e1545206553",
                        "code": "asdasd"
                    }, {
                        "code": "aaaaaaaaaaaaaaaaaaaa",
                        "_id": "582c8e6e0d992e1545206725"
                    }]
                },
                "conclusion": "testingAdistaltestingAdistaltestingAdistal",
                "code": {
                    "text": "code",
                    "_id": "582c84fc0d992e1545206550",
                    "coding": [{
                        "_id": "582c84fc0d992e1545206551",
                        "code": "a"
                    }, {
                        "code": "asd",
                        "_id": "582c8ecd0d992e1545206768"
                    }, {
                        "code": "asdasd",
                        "_id": "582c8ecd0d992e1545206767"
                    }]
                },
                "managingOrganization": {
                    "reference": "asdasss",
                    "display": "sdasd",
                    "_id": "582c84fc0d992e1545206546"
                },
                "effectiveDatePeriod": {
                    "_id": "582c93c10d992e1545206808",
                    "end": "2016-11-16T17:13:37.358Z",
                    "start": "2016-11-16T17:13:37.358Z"
                },
                "encounter": {
                    "_id": "582c93c10d992e1545206809"
                },
                "performer": [{
                        actor: {
                            "updatedAt": "2017-10-02T15:07:48.646Z",
                            "createdAt": "2017-10-02T15:07:48.646Z",
                            "reference": "59a42ca13e14230019590c8b",
                            "display": "OrganizacionPrestadora",
                            "_id": "59d2564448ee9200218b4fc8"
                        },
                        "role": {
                            "text": "Organization",
                            "_id": "59d2564448ee9200218b4fc7",
                            "coding": []
                        },
                        "_id": "59d2564448ee9200218b4fc6"
                    },
                    {
                        "actor": {
                            "updatedAt": "2017-10-02T15:07:48.646Z",
                            "createdAt": "2017-10-02T15:07:48.646Z",
                            "display": "MedicoPrestador1",
                            "reference": "59aea915c0a1e30017eb7127",
                            "_id": "59d2564448ee9200218b4fc5"
                        },
                        "role": {
                            "text": "Practitioner",
                            "_id": "59d2564448ee9200218b4fc4",
                            "coding": []
                        },
                        "_id": "59d2564448ee9200218b4fc3"
                    }
                ],
                "subject": {
                    "_id": "582c93c10d992e154520680a"
                },
                "effectiveDateTime": "2016-11-17T00:00:00.000Z",
                "codedDiagnosis": [{
                    "_id": "582c84fc0d992e1545206548",
                    "text": "aaaa",
                    "coding": [{
                        "code": "asdasd",
                        "_id": "582c84fc0d992e1545206549"
                    }, {
                        "code": "222222",
                        "_id": "582c87240d992e15452065a6"
                    }]
                }, {
                    "_id": "582c852f0d992e1545206571",
                    "text": "asdasd",
                    "coding": [{
                        "_id": "582c852f0d992e1545206572"
                    }, {
                        "_id": "582c87240d992e15452065a5"
                    }, {
                        "_id": "582c87240d992e15452065a4"
                    }, {
                        "code": "a5",
                        "_id": "582c87240d992e15452065a3"
                    }]
                }],
                "image": [{
                    "link": {
                        "_id": "582c84fc0d992e154520654b"
                    },
                    "_id": "582c84fc0d992e154520654a"
                }],
                "imagingStudy": [{
                    "_id": "582c84fc0d992e154520654c"
                }],
                "result": [{
                    "_id": "582c84fc0d992e154520654d"
                }],
                "specimen": [{
                    "_id": "582c84fc0d992e154520654e"
                }],
                "request": [{
                    "_id": "582c84fc0d992e154520654f"
                }],
                "basedOn": [{
                    updatedAt: "2017-09-05T14:10:48.406Z",
                    createdAt: "2017-09-05T14:10:48.406Z",
                    "reference": "59aeae25c0a1e30017eb738e",
                    _id: "59aeb068c0a1e30017eb7500"
                }],
                "identifier": [{
                    "type": {
                        "_id": "582c84fc0d992e1545206556",
                        "coding": [{
                            "_id": "582c84fc0d992e1545206557"
                        }]
                    },
                    "value": "test",
                    "assigner": {
                        "_id": "582c84fc0d992e1545206555"
                    },
                    "_id": "582c84fc0d992e1545206554"
                }]
            };
            var procedureResquestMock = [{
                    _id: "59aeaf0dc0a1e30017eb743f",
                    updatedAt: "2017-09-05T14:05:01.500Z",
                    createdAt: "2017-09-05T14:05:01.500Z",
                    subject: {
                        updatedAt: "2017-09-05T14:05:01.500Z",
                        createdAt: "2017-09-05T14:05:01.500Z",
                        reference: "59038c9116d0f60017e2eae9",
                        display: "Julieta Solis",
                        _id: "59aeaf0dc0a1e30017eb7446"
                    },
                    code: {
                        text: "Orina color dudoso",
                        _id: "59aeaf0dc0a1e30017eb7442",
                        coding: []
                    },
                    status: "requested",
                    priority: "ROUTINE",
                    performer: {
                        updatedAt: "2017-09-05T14:05:01.500Z",
                        createdAt: "2017-09-05T14:05:01.500Z",
                        reference: "59a42ca13e14230019590c8b",
                        display: "OrganizacionPrestadora",
                        _id: "59aeaf0dc0a1e30017eb7441"
                    },
                    performerType: {
                        text: "Clinico",
                        _id: "59aeaf0dc0a1e30017eb7440",
                        coding: []
                    },
                    __v: 0,
                    deleted: false,
                    event: [{
                            description: {
                                _id: "59aeaf0dc0a1e30017eb744f",
                                coding: [{
                                    _id: "59aeaf0dc0a1e30017eb7450"
                                }]
                            },
                            actor: {
                                updatedAt: "2017-09-05T14:05:01.499Z",
                                createdAt: "2017-09-05T14:05:01.499Z",
                                _id: "59aeaf0dc0a1e30017eb744e"
                            },
                            _id: "59aeaf0dc0a1e30017eb744d",
                            dateTime: "2017-09-05T14:05:01.491Z"
                        },
                        {
                            actor: {
                                updatedAt: "2017-09-05T14:05:01.499Z",
                                createdAt: "2017-09-05T14:05:01.499Z",
                                display: "MedicoCliente",
                                reference: "59aea8d4c0a1e30017eb7100",
                                _id: "59aeaf0dc0a1e30017eb744c"
                            },
                            status: "requested",
                            _id: "59aeaf0dc0a1e30017eb744b",
                            dateTime: "2017-09-05T14:05:01.490Z"
                        }
                    ],
                    relevantHistory: [],
                    note: [],
                    bodySite: [],
                    specimen: [{
                        updatedAt: "2017-09-05T14:05:01.499Z",
                        createdAt: "2017-09-05T14:05:01.499Z",
                        _id: "59aeaf0dc0a1e30017eb7445"
                    }],
                    supportingInfo: [],
                    reasonReference: [],
                    reasonCode: [],
                    category: [{
                        text: "ASYNCHRONOUS_CONSULTATION",
                        _id: "59aeaf0dc0a1e30017eb7443",
                        coding: [{
                            _id: "59aeaf0dc0a1e30017eb7444"
                        }]
                    }],
                    replaces: [],
                    basedOn: [],
                    definition: [],
                    identifier: [{
                        type: {
                            _id: "59aeaf0dc0a1e30017eb7452",
                            coding: [{
                                _id: "59aeaf0dc0a1e30017eb7453"
                            }]
                        },
                        value: "25074639",
                        system: "Solicitud de diagnostico por anÃ¡lisis",
                        _id: "59aeaf0dc0a1e30017eb7451"
                    }],
                    requester: {
                        agent: {
                            updatedAt: "2017-09-05T14:05:01.498Z",
                            createdAt: "2017-09-05T14:05:01.498Z",
                            display: "MedicoCliente",
                            reference: "59aea8d4c0a1e30017eb7100",
                            _id: "59aeaf0dc0a1e30017eb7448"
                        },
                        onBehalfOf: {
                            updatedAt: "2017-09-05T13:37:53.840Z",
                            createdAt: "2017-09-05T13:37:53.840Z",
                            reference: "59a42c1f3e14230019590c41",
                            display: "OrganizacionCliente",
                            _id: "59aea8b1c0a1e30017eb70fd"
                        }
                    }
                },
                {
                    _id: "59c931715b161c0017949ede",
                    updatedAt: "2017-09-25T16:40:17.531Z",
                    createdAt: "2017-09-25T16:40:17.531Z",
                    subject: {
                        updatedAt: "2017-09-25T16:40:17.531Z",
                        createdAt: "2017-09-25T16:40:17.531Z",
                        reference: "59038cfb16d0f60017e2ebfd",
                        display: "Pedro Perez",
                        _id: "59c931715b161c0017949ee6"
                    },
                    code: {
                        text: "Solicitud con DICOM",
                        _id: "59c931715b161c0017949ee1",
                        coding: []
                    },
                    status: "requested",
                    priority: "ROUTINE",
                    performer: {
                        updatedAt: "2017-09-25T16:40:17.531Z",
                        createdAt: "2017-09-25T16:40:17.531Z",
                        reference: "59a42ca13e14230019590c8b",
                        display: "OrganizacionPrestadora",
                        _id: "59c931715b161c0017949ee0"
                    },
                    performerType: {
                        text: "Clinico",
                        _id: "59c931715b161c0017949edf",
                        coding: []
                    },
                    __v: 0,
                    deleted: false,
                    event: [{
                            description: {
                                _id: "59c931715b161c0017949eed",
                                coding: [{
                                    _id: "59c931715b161c0017949eee"
                                }]
                            },
                            actor: {
                                updatedAt: "2017-09-25T16:40:17.530Z",
                                createdAt: "2017-09-25T16:40:17.530Z",
                                _id: "59c931715b161c0017949eec"
                            },
                            _id: "59c931715b161c0017949eeb",
                            dateTime: "2017-09-25T16:40:17.523Z"
                        },
                        {
                            actor: {
                                updatedAt: "2017-09-25T16:40:17.531Z",
                                createdAt: "2017-09-25T16:40:17.531Z",
                                display: "MedicoCliente",
                                reference: "59aea8d4c0a1e30017eb7100",
                                _id: "59c931715b161c0017949eea"
                            },
                            status: "requested",
                            _id: "59c931715b161c0017949ee9",
                            dateTime: "2017-09-25T16:40:17.522Z"
                        }
                    ],
                    relevantHistory: [],
                    note: [],
                    bodySite: [],
                    specimen: [{
                        updatedAt: "2017-09-25T16:40:17.530Z",
                        createdAt: "2017-09-25T16:40:17.530Z",
                        _id: "59c931715b161c0017949ee5"
                    }],
                    supportingInfo: [],
                    reasonReference: [],
                    reasonCode: [],
                    category: [{
                        text: "ASYNCHRONOUS_CONSULTATION",
                        _id: "59c931715b161c0017949ee2",
                        coding: [{
                            _id: "59c931715b161c0017949ee3"
                        }]
                    }],
                    replaces: [],
                    basedOn: [],
                    definition: [],
                    identifier: [{
                        type: {
                            _id: "59c931715b161c0017949ef0",
                            coding: [{
                                _id: "59c931715b161c0017949ef1"
                            }]
                        },
                        value: "23064784",
                        system: "Solicitud con DICOM",
                        _id: "59c931715b161c0017949eef"
                    }],
                    requester: {
                        agent: {
                            updatedAt: "2017-09-25T16:40:17.530Z",
                            createdAt: "2017-09-25T16:40:17.530Z",
                            display: "MedicoCliente",
                            reference: "59aea8d4c0a1e30017eb7100",
                            _id: "59c931715b161c0017949ee8"
                        },
                        onBehalfOf: {
                            updatedAt: "2017-09-05T13:37:53.840Z",
                            createdAt: "2017-09-05T13:37:53.840Z",
                            reference: "59a42c1f3e14230019590c41",
                            display: "OrganizacionCliente",
                            _id: "59aea8b1c0a1e30017eb70fd"
                        }
                    }
                }
            ];
            var practitionerRoleMock = {
                _id: "59763bddf6d177001756b6b4",
                practitioner: {
                    updatedAt: "2017-07-24T18:26:37.195Z",
                    createdAt: "2017-07-24T18:26:37.195Z",
                    display: "brian",
                    reference: "586ba3c8b9919b0cbd4e0a72",
                    _id: "59763bddf6d177001756b6b7"
                },
                organization: {
                    updatedAt: "2017-07-24T18:26:37.195Z",
                    createdAt: "2017-07-24T18:26:37.195Z",
                    reference: "59a42ca13e14230019590c8b",
                    display: "OrganizacionPresadora",
                    _id: "59763bddf6d177001756b6b6"
                },
                __v: 0,
                deleted: false,
                endpoint: [],
                notAvailable: [],
                availableTime: [],
                telecom: [],
                healthcareService: [],
                location: [],
                specialty: [{
                    text: "Clinico",
                    _id: "59763bddf6d177001756b6b5",
                    coding: []
                }],
                code: [{
                    text: 'LENDER'
                }],
                identifier: []
            };
            var organizationMock = {
                _id: "59a42ca13e14230019590c8b",
                updatedAt: "2017-08-28T14:45:53.299Z",
                createdAt: "2017-08-28T14:45:53.299Z",
                type: {
                    _id: "59a42ca13e14230019590c8d",
                    coding: [{
                        _id: "59a42ca13e14230019590c8e"
                    }]
                },
                name: "OrganizacionPrestadora",
                partOf: {
                    updatedAt: "2017-08-28T14:45:53.299Z",
                    createdAt: "2017-08-28T14:45:53.299Z",
                    _id: "59a42ca13e14230019590c8c"
                },
                active: true,
                __v: 0,
                endpoint: [],
                alias: [],
                identifier: [{
                    type: {
                        _id: "59a42ca13e14230019590c9a",
                        coding: [{
                            _id: "59a42ca13e14230019590c9b"
                        }]
                    },
                    value: "organizacion prestadora",
                    use: "LENDER",
                    _id: "59a42ca13e14230019590c99"
                }],
                address: [{
                        use: "Home",
                        _id: "59a42ca13e14230019590c98",
                        line: []
                    },
                    {
                        use: "Email",
                        _id: "59a42ca13e14230019590c97",
                        line: []
                    }
                ],
                contact: [{
                    purpose: {
                        _id: "59a42ca13e14230019590c91",
                        coding: [{
                            _id: "59a42ca13e14230019590c92"
                        }]
                    },
                    address: {
                        _id: "59a42ca13e14230019590c90",
                        line: []
                    },
                    _id: "59a42ca13e14230019590c8f",
                    telecom: [{
                            _id: "59a42ca13e14230019590c94"
                        },
                        {
                            _id: "59a42ca13e14230019590c93"
                        }
                    ]
                }],
                telecom: [{
                        value: "44446668",
                        _id: "59a42ca13e14230019590c96"
                    },
                    {
                        value: "organizacionprestadora@mail.com",
                        _id: "59a42ca13e14230019590c95"
                    }
                ]
            }
            var listMock = {
            	"_id": "5aa01744fa75050022e01af8",
            	"updatedAt": "2018-03-27T18:20:15.459Z",
            	"createdAt": "2018-03-07T16:45:56.419Z",
            	"code": {
            		"text": "background",
            		"_id": "5aba8b5f464bd1001f07d19f",
            		"coding": []
            	},
            	"entry": [],
            	"subject": [{
            		"updatedAt": "2018-03-27T18:20:15.456Z",
            		"createdAt": "2018-03-27T18:20:15.456Z",
            		"reference": "59038c9116d0f60017e2eae9",
            		"display": "Julieta Solis",
            		"_id": "5aba8b5f464bd1001f07d19e"
            	}],
            	"identifier": []
            };
            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgyMzFkMWEzNGFkYzAwMTcyNWQyM2IiLCJ1cGRhdGVkQXQiOiIyMDE3LTA4LTAyVDIwOjEwOjU3LjUwNloiLCJjcmVhdGVkQXQiOiIyMDE3LTA4LTAyVDIwOjEwOjU3LjUwNloiLCJ1c2VybmFtZSI6ImFkbWluZXhvIiwiZW1haWwiOiJhZG1pbmV4b0BhZGlzdGFsLmNvbSIsInR5cGUiOiJBZG1pbiIsIl9fdiI6MCwidG9rZW5zIjpbXSwiZGVsZXRlZCI6ZmFsc2UsImlhdCI6MTUwMjM5MzAyMywibmJmIjoxNTAyMzkzMDIzLCJleHAiOjE1NjU1MDgyMjMsImF1ZCI6IjAuMC4wLjA6MzAwMCIsImlzcyI6InZRRmFjQm9iR2p3Q0ZIYjR0QVZKV3lSYWZtTjJqRGc1RlN2Nk4wcGpuTzQiLCJzdWIiOiJhZG1pbmV4byIsImp0aSI6ImFkbWluZXhvIn0.TppCI1HEYcKJhrDU-Lx0n_cJ5eY-mTlmPYgyWnZmpCM",
                "user": {
                    "_id": "586ba3c8b9919b0cbd4e0a71",
                    "updatedAt": "2017-01-03T13:14:48.190Z",
                    "createdAt": "2017-01-03T13:14:48.190Z",
                    "type": "Practitioner",
                    "username": "brian",
                    "email": "asdasd",
                    "__v": 0,
                    "role": {
                        "practitioner": "586ba3c8b9919b0cbd4e0a72",
                        "sub_role": "LENDER"
                    },
                    "tokens": []
                }
            });

            $httpBackend.whenGET(/api\/searchingorderslender/).respond(procedureResquestMock);

            $httpBackend.whenGET(config.api_url + '/api/searchingreportslender?&organization=59a42ca13e14230019590c8b').respond({data:[mock]});

            $httpBackend.whenGET(/api\/appointments/).respond([]);

            $httpBackend.whenGET(/api\/lists/).respond([listMock]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests/59aeaf0dc0a1e30017eb743f').respond(procedureResquestMock[0]);

            $httpBackend.whenGET(config.api_url + '/api/patients/59038c9116d0f60017e2eae9');

            $httpBackend.whenGET(/api\/organizations/).respond(organizationMock);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests?conditions={"performer.reference":"59a42ca13e14230019590c8b"}&limit=10').respond(procedureResquestMock);

            $httpBackend.whenGET(config.api_url + '/api/practitionerroles?conditions={"practitioner.reference":"586ba3c8b9919b0cbd4e0a72"}').respond([practitionerRoleMock]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports/582c84fc0d992e1545206545').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/diagnosticreports').respond([mock]);

            $httpBackend.whenPUT(/api\/procedurerequests/).respond(procedureResquestMock[0]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests/59aeae25c0a1e30017eb738e').respond(procedureResquestMock[0]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports?limit=10&conditions={"performer.actor.reference":"59a42ca13e14230019590c8b"}&{"$or":[{"identifier.value":{"$regex": "undefined", "$options": "i"}},{"performer.actor.display":{"$regex": "undefined", "$options": "i"}}]}')
              .respond([mock]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports/?conditions={"performer.actor.reference":"59a42ca13e14230019590c8b"}&sort=-createdAt&limit=10')
              .respond([mock]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests?count=true').respond(200,20);


            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports?limit=10&conditions={"performer.actor.reference":"59a42ca13e14230019590c8b"}&{"$or":[{"identifier.value":{"$regex": "undefined", "$options": "i"}},{"performer.actor.display":{"$regex": "undefined", "$options": "i"}}]}').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports?limit=20&conditions={"performer.actor.reference":"59a42ca13e14230019590c8b"}&{"$or":[{"identifier.value":{"$regex": "undefined", "$options": "i"}},{"performer.actor.display":{"$regex": "undefined", "$options": "i"}}]}').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports?conditions={"performer.actor.reference":"586ba3c8b9919b0cbd4e0a71"}').respond([mock]);

            $httpBackend.whenGET(config.api_url + '/api/practitioners/586ba3c8b9919b0cbd4e0a72').respond([mock]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticreports/582c84fc0d992e1545206545').respond(mock);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/

        });
};
