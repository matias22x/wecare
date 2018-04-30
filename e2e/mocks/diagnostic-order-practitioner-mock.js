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
                    "_id": "582b66af9bb54025c5ebcfbb",
                    "display": "aasd",
                    "reference": "582f152e83cf3010f3baa106"
                },
                "orderer": {
                    "_id": "582b66af9bb54025c5ebcfba"
                },
                "requester": {
                    "agent": {
                        "display": "practitionerNAme",
                        "reference": "582f152e83cf3010f3baa106"
                    },
                    "baseOn": {}
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
                        "display": "asdasd",
                        "reference": "asdasd",
                        "_id": "582b66af9bb54025c5ebcfbe"
                    },
                    "_id": "582b66af9bb54025c5ebcfbd",
                    "time": {
                        "type": "2016-11-15T19:49:03.315Z"
                    },
                    'text': 'nikola tesla',
                    'authorString': 'asdasd'
                }],
                "code": {
                    "text": "Orina color dudoso",
                    "_id": "5aa01744fa75050022e01ad6",
                    "coding": [ ]
                },
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
            var patientMock = {
                "_id": "582f152e83cf3010f3baa106",
                "updatedAt": "2016-11-18T14:50:22.610Z",
                "createdAt": "2016-11-18T14:50:22.610Z",
                "managingOrganization": {
                    "_id": "582f152e83cf3010f3baa12c"
                },
                "maritalStatus": {
                    "_id": "582f152e83cf3010f3baa12a",
                    "coding": [{
                        "_id": "582f152e83cf3010f3baa12b"
                    }]
                },
                "animal": {
                    "species": {
                        "_id": "582f152e83cf3010f3baa116",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa117"
                        }]
                    },
                    "breed": {
                        "_id": "582f152e83cf3010f3baa114",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa115"
                        }]
                    },
                    "genderStatus": {
                        "_id": "582f152e83cf3010f3baa112",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa113"
                        }]
                    },
                    "_id": "582f152e83cf3010f3baa111"
                },
                "deceasedBoolean": false,
                "multipleBirthBoolean": true,
                "__v": 0,
                "name": [{
                    "period": {
                        "_id": "582f152e83cf3010f3baa108",
                        "end": "2016-11-18T14:50:22.572Z",
                        "start": "2016-11-18T14:50:22.572Z"
                    },
                    "_id": "582f152e83cf3010f3baa107",
                    "prefix": [],
                    "given": [],
                    "family": [],
                    "suffix": [],
                    'text': 'prueba'
                }],
                "photo": [{
                    "_id": "582f152e83cf3010f3baa109"
                }],
                "identifier": [{
                    "type": {
                        "_id": "582f152e83cf3010f3baa10d",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa10e"
                        }]
                    },
                    "assigner": {
                        "_id": "582f152e83cf3010f3baa10c"
                    },
                    "period": {
                        "_id": "582f152e83cf3010f3baa10b",
                        "end": "2016-11-18T14:50:22.574Z",
                        "start": "2016-11-18T14:50:22.574Z"
                    },
                    "value": "test",
                    "_id": "582f152e83cf3010f3baa10a"
                }],
                "address": [{
                    "period": {
                        "_id": "582f152e83cf3010f3baa110",
                        "end": "2016-11-18T14:50:22.576Z",
                        "start": "2016-11-18T14:50:22.576Z"
                    },
                    "_id": "582f152e83cf3010f3baa10f",
                    "line": []
                }],
                "link": [{
                    "other": {
                        "_id": "582f152e83cf3010f3baa119"
                    },
                    "_id": "582f152e83cf3010f3baa118"
                }],
                "contact": [{
                    "name": {
                        "_id": "582f152e83cf3010f3baa123",
                        "prefix": [],
                        "given": [],
                        "family": [],
                        "suffix": []
                    },
                    "period": {
                        "_id": "582f152e83cf3010f3baa120",
                        "end": "2016-11-18T14:50:22.583Z",
                        "start": "2016-11-18T14:50:22.583Z"
                    },
                    "purpose": {
                        "_id": "582f152e83cf3010f3baa11e",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa11f"
                        }]
                    },
                    "address": {
                        "period": {
                            "_id": "582f152e83cf3010f3baa11d",
                            "end": "2016-11-18T14:50:22.582Z",
                            "start": "2016-11-18T14:50:22.582Z"
                        },
                        "_id": "582f152e83cf3010f3baa11c",
                        "line": []
                    },
                    "organization": {
                        "_id": "582f152e83cf3010f3baa11b"
                    },
                    "_id": "582f152e83cf3010f3baa11a",
                    "telecom": [{
                        "period": {
                            "_id": "582f152e83cf3010f3baa122",
                            "end": "2016-11-18T14:50:22.584Z",
                            "start": "2016-11-18T14:50:22.584Z"
                        },
                        "_id": "582f152e83cf3010f3baa121"
                    }]
                }],
                "communication": [{
                    "language": {
                        "_id": "582f152e83cf3010f3baa125",
                        "coding": [{
                            "_id": "582f152e83cf3010f3baa126"
                        }]
                    },
                    "_id": "582f152e83cf3010f3baa124"
                }],
                "telecom": [{
                    "period": {
                        "_id": "582f152e83cf3010f3baa128",
                        "end": "2016-11-18T14:50:22.586Z",
                        "start": "2016-11-18T14:50:22.586Z"
                    },
                    "_id": "582f152e83cf3010f3baa127"
                }],
                "careProvider": [{
                    "_id": "582f152e83cf3010f3baa129"
                }]
            };
            var practitionerMock = {
                _id: "586ba3c8b9919b0cbd4e0a72",
                updatedAt: "2017-01-03T13:14:48.361Z",
                createdAt: "2017-01-03T13:14:48.279Z",
                name: {
                    text: "asdasd",
                    _id: "586ba3c8b9919b0cbd4e0a73",
                    prefix: [],
                    given: [],
                    family: [],
                    suffix: []
                },
                active: true,
                __v: 1,
                identifier: [],
                photo: [],
                qualification: [],
                practitionerRole: [{
                    managingOrganization: {
                        reference: "585d1a5cb450b91b89e5ad0d",
                        display: "ideas.delivery",
                        _id: "586ba3c8b9919b0cbd4e0a78"
                    },
                    _id: "586ba3c8b9919b0cbd4e0a75",
                    location: [],
                    healthcareService: [],
                    speciality: [{
                        text: "dios del universo",
                        _id: "586ba3c8b9919b0cbd4e0a76",
                        coding: [{
                            _id: "586ba3c8b9919b0cbd4e0a77"
                        }]
                    }]
                }],
                communication: [],
                address: [],
                telecom: []
            }
            var practitionerRoleMock = {
                _id: "59763bddf6d177001756b6b4",
                practitioner: {
                    updatedAt: "2017-07-24T18:26:37.195Z",
                    createdAt: "2017-07-24T18:26:37.195Z",
                    display: "practitioner",
                    reference: "586ba3c8b9919b0cbd4e0a72",
                    _id: "59763bddf6d177001756b6b7"
                },
                organization: {
                    updatedAt: "2017-07-24T18:26:37.195Z",
                    createdAt: "2017-07-24T18:26:37.195Z",
                    reference: "586ba3c8b9919b0cbd4e0a72",
                    display: "OrganizacionCliente",
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
                code: [],
                identifier: []
            };
            var specialtiesMock = {
                _id: "59038a1a16d0f60017e2e923",
                title: "speciality",
                value: {
                text: "Clinico",
                _id: "59038a1a16d0f60017e2e924",
                coding: [ ]
                },
                __v: 0
              };
            var organizationsMock = {
                _id: "59a42c1f3e14230019590c41",
                updatedAt: "2017-08-28T14:43:43.497Z",
                createdAt: "2017-08-28T14:43:43.497Z",
                type: {
                    _id: "59a42c1f3e14230019590c43",
                    coding: [{
                        _id: "59a42c1f3e14230019590c44"
                    }]
                },
                name: "OrganizacionPrestadora",
                partOf: {
                    updatedAt: "2017-08-28T14:43:43.496Z",
                    createdAt: "2017-08-28T14:43:43.496Z",
                    _id: "59a42c1f3e14230019590c42"
                },
                active: true,
                __v: 0,
                endpoint: [],
                alias: [],
                identifier: [{
                    type: {
                        _id: "59a42c1f3e14230019590c50",
                        coding: [{
                            _id: "59a42c1f3e14230019590c51"
                        }]
                    },
                    value: "organizacion prestadora",
                    use: "LENDER",
                    _id: "59a42c1f3e14230019590c4f"
                }],
                address: [{
                        use: "Home",
                        _id: "59a42c1f3e14230019590c4e",
                        line: []
                    },
                    {
                        use: "Email",
                        _id: "59a42c1f3e14230019590c4d",
                        line: []
                    }
                ],
                contact: [{
                    purpose: {
                        _id: "59a42c1f3e14230019590c47",
                        coding: [{
                            _id: "59a42c1f3e14230019590c48"
                        }]
                    },
                    address: {
                        _id: "59a42c1f3e14230019590c46",
                        line: []
                    },
                    _id: "59a42c1f3e14230019590c45",
                    telecom: [{
                            _id: "59a42c1f3e14230019590c4a"
                        },
                        {
                            _id: "59a42c1f3e14230019590c49"
                        }
                    ]
                }],
                telecom: [{
                        value: "44446666",
                        _id: "59a42c1f3e14230019590c4c"
                    },
                    {
                        value: "organizacioncliente@mail.com",
                        _id: "59a42c1f3e14230019590c4b"
                    }
                ],
                specialties: [specialtiesMock]
            };
            var listMock = {
            	"_id": "5aba8b5f464bd1001f07d19a",
            	"updatedAt": "2018-03-27T18:20:15.455Z",
            	"createdAt": "2018-03-27T18:20:15.455Z",
            	"source": {
            		"updatedAt": "2018-03-27T18:20:15.455Z",
            		"createdAt": "2018-03-27T18:20:15.455Z",
            		"reference": "5aba8b5e464bd1001f07d17b",
            		"display": "asdasd",
            		"_id": "5aba8b5f464bd1001f07d19d"
            	},
            	"code": {
            		"text": "physicalExam",
            		"_id": "5aba8b5f464bd1001f07d19c",
            		"coding": []
            	},
            	"__v": 0,
            	"entry": [],
            	"subject": [{
            		"updatedAt": "2018-03-27T18:20:15.455Z",
            		"createdAt": "2018-03-27T18:20:15.455Z",
            		"reference": "59038c9116d0f60017e2eae9",
            		"display": "Julieta Solis",
            		"_id": "5aba8b5f464bd1001f07d19b"
            	}],
            	"identifier": []
            }
            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODZiYTNjOGI5OTE5YjBjYmQ0ZTBhNzEiLCJ1c2VybmFtZSI6ImFzZGFzZCIsImlhdCI6MTQ4NDE0NzY2MX0.JRk2x1vnyXc0GNeFj3tG62OBJVvyGQf_Y-eQf3ax3I0",
                "user": {
                    "_id": "586ba3c8b9919b0cbd4e0a71",
                    "updatedAt": "2017-01-03T13:14:48.190Z",
                    "createdAt": "2017-01-03T13:14:48.190Z",
                    "type": "Practitioner",
                    "username": "asdasd",
                    "email": "asdasd",
                    "__v": 0,
                    "role": {
                        "practitioner": "586ba3c8b9919b0cbd4e0a72",
                        "sub_role": "CLIENT"
                    },
                    "tokens": []
                }
            });


            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders/582b66af9bb54025c5ebcfb2').respond(mock);
            $httpBackend.whenGET(config.api_url + '/api/procedurerequests/582b66af9bb54025c5ebcfb2').respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/diagnosticorders').respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/diagnosticorders/').respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/procedurerequests').respond(mock);
            $httpBackend.whenPOST(/\/api\/procedurerequests/).respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/procedurerequests/').respond(mock);
            $httpBackend.whenPOST(config.api_url + '/api/lists/').respond(listMock);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders').respond([
                mock
            ]);
            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders/?conditions/={"orderer.reference":"586ba3c8b9919b0cbd4e0a71"}').respond([
                mock
            ]);

            $httpBackend.whenGET(/\/api\/organizations/).respond([organizationsMock]);

            $httpBackend.whenGET(config.api_url + '/api/predetermineds').respond([specialtiesMock]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests/?conditions/={"requester.agent.reference":"586ba3c8b9919b0cbd4e0a71"}').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests?limit=10').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests/').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/procedurerequests?conditions={"assignTo.display":"585d1a5cb450b91b89e5ad0d"}').respond([
                mock
            ]);

            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders?conditions={"assignTo.display":"ideas.delivery"}').respond([
                mock
            ]);
            $httpBackend.whenGET(config.api_url + '/api/diagnosticorders/').respond([
                mock
            ]);
            $httpBackend.whenGET(config.api_url + '/api/practitioners/586ba3c8b9919b0cbd4e0a72').respond(practitionerMock);
            $httpBackend.whenGET(config.api_url + '/api/patients/582f152e83cf3010f3baa106').respond(patientMock);

            $httpBackend.whenPOST(config.api_url + '/api/patients').respond(patientMock);

            $httpBackend.whenGET(config.api_url + '/api/patients').respond([
                patientMock
            ]);
            $httpBackend.whenGET(/\/api\/searchingordersclient/).respond({data:[mock]});

            $httpBackend.whenGET(/\/api\/appointments/).respond([]);

            $httpBackend.whenGET(config.api_url + '/api/practitionerroles?conditions={"practitioner.reference":"586ba3c8b9919b0cbd4e0a72"}').respond([practitionerRoleMock]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/

        });
};
