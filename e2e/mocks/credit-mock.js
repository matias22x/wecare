exports.creditBackendMock = function() {
    angular.module('creditBackendMock', ['ngMockE2E'])
    .run(function($httpBackend,config) {

        $httpBackend.whenPOST(config.api_url + '/api/login').respond({
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
        });

        $httpBackend.whenGET(config.api_url + '/api/credits').respond(
            [{
                _id: "582612493910117b1f410fbe",
                updatedAt: "2016-11-11T18:47:37.068Z",
                createdAt: "2016-11-11T18:47:37.068Z",
                managingOrganization: {
                    _id: "582612493910117b1f410fbf"
                },
                __v: 0,
                identifier: [
                {
                    type: {
                        _id: "582612493910117b1f410fc1",
                        coding: [
                        {
                            _id: "582612493910117b1f410fc2"
                        }
                        ]
                    },
                    _id: "582612493910117b1f410fc0"
                }
                ]
            },
            {
                _id: "582a25469c18e103a4cd472d",
                updatedAt: "2016-11-14T20:57:47.810Z",
                createdAt: "2016-11-14T20:57:42.907Z",
                managingOrganization: {
                    display: "eee",
                    reference: "asdasd",
                    _id: "582a25469c18e103a4cd472e"
                },
                __v: 1,
                identifier: [
                {
                    type: {
                        _id: "582a25469c18e103a4cd4730",
                        coding: [
                        {
                            _id: "582a25469c18e103a4cd4731"
                        }
                        ]
                    },
                    _id: "582a25469c18e103a4cd472f"
                }
                ]
            }]
        );

        $httpBackend.whenGET(config.api_url + '/api/credits/582a25469c18e103a4cd472d').respond(
            {
                _id: "582612493910117b1f410fbe",
                updatedAt: "2016-11-11T18:47:37.068Z",
                createdAt: "2016-11-11T18:47:37.068Z",
                managingOrganization: {
                    _id: "582612493910117b1f410fbf",
                    "display": "test reference display",
                    "reference": "test 2 reference reference"
                },
                __v: 0,
                identifier: [
                {
                    type: {
                        "text" : "test codeable concept",
                        _id: "582612493910117b1f410fc1",
                        coding: [
                        {
                            _id: "582612493910117b1f410fc2"
                        }
                        ]
                    },
                    "assigner": {
                        "display": "display test",
                        "reference": "reference test"
                    },
                    "system": "system test",
                    "value": "value test",
                    _id: "582612493910117b1f410fc0"
                }
                ]
            }
        );

        $httpBackend.whenPOST(config.api_url + '/api/credits').respond(
            {
              "_id": "582dcc52fc680d2e926329ff",
              "updatedAt": "2016-11-17T15:27:14.685Z",
              "createdAt": "2016-11-17T15:27:14.685Z",
              "managingOrganization": {
                "display": "eee",
                "reference": "asdasd",
                "_id": "582dcc52fc680d2e92632a03"
              },
              "__v": 0,
              "identifier": [
                {
                  "type": {
                    "_id": "582dcc52fc680d2e92632a01",
                    "coding": [
                      {
                        "_id": "582dcc52fc680d2e92632a02"
                      }
                    ]
                  },
                  "_id": "582dcc52fc680d2e92632a00"
                }
              ]
            }
        );


        $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
    });
}