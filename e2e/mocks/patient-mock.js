exports.patientBackendMock = function() {
    angular.module('patientBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
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
                    "suffix": []
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


            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ",
                "user": {
              		"username": "brian",
              		"email": "brian@mail.com",
              		"type": "Practitioner",
              		"role": {
                    "practitioner": "586ba3c8b9919b0cbd4e0a72",
                    "sub_role": "CLIENT"
              		},
              		"tokens": []
              	}
            });

            $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
                mock
            );

            $httpBackend.whenGET(config.api_url + '/api/patients/582f152e83cf3010f3baa106').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/patients').respond(mock);


            $httpBackend.whenGET(config.api_url + '/api/patients').respond([
                mock
            ]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
}
