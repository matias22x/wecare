exports.observationBackendMock = function() {
    angular.module('observationBackendMock', ['ngMockE2E'])
    .run(function($httpBackend,config) {
        var mock = {
            "_id": "582ddfead24302179d66ca1b",
            "updatedAt": "2016-11-17T17:03:07.789Z",
            "createdAt": "2016-11-17T16:50:50.355Z",
            "code": {
              "_id": "582ddfead24302179d66ca51",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca52"
                }
              ]
            },
            "interpretation": {
              "_id": "582ddfead24302179d66ca4f",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca50"
                }
              ]
            },
            "bodySite": {
              "_id": "582ddfead24302179d66ca4a",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca4b"
                }
              ]
            },
            "subject": {
              "_id": "582ddfead24302179d66ca49"
            },
            "dataAbsentReason": {
              "_id": "582ddfead24302179d66ca47",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca48"
                }
              ]
            },
            "category": {
              "_id": "582ddfead24302179d66ca45",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca46"
                }
              ]
            },
            "method": {
              "_id": "582ddfead24302179d66ca43",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca44"
                }
              ]
            },
            "valueCodeableConcept": {
              "_id": "582ddfead24302179d66ca41",
              "coding": [
                {
                  "_id": "582ddfead24302179d66ca42"
                }
              ]
            },
            "specimen": {
              "_id": "582ddfead24302179d66ca40"
            },
            "effectivePeriod": {
              "_id": "582ddfead24302179d66ca3f",
              "end": "2016-11-17T16:50:50.330Z",
              "start": "2016-11-17T16:50:50.330Z"
            },
            "device": {
              "_id": "582ddfead24302179d66ca28"
            },
            "valueRatio": {
              "denominator": {
                "_id": "582ddfead24302179d66ca1f"
              },
              "numerator": {
                "_id": "582ddfead24302179d66ca1e"
              },
              "_id": "582ddfead24302179d66ca1d"
            },
            "valueAttachment": {
              "_id": "582ddfead24302179d66ca1c"
            },
            "__v": 5,
            "identifier": [
              {
                "type": {
                  "_id": "582ddfead24302179d66ca55",
                  "coding": [
                    {
                      "_id": "582ddfead24302179d66ca56"
                    }
                  ]
                },
                "value":"test",
                "assigner": {
                  "_id": "582ddfead24302179d66ca54"
                },
                "_id": "582ddfead24302179d66ca53"
              }
            ],
            "referenceRange": [
              {
                "high": {
                  "_id": "582ddfead24302179d66ca27"
                },
                "low": {
                  "_id": "582ddfead24302179d66ca26"
                },
                "age": {
                  "high": {
                    "_id": "582ddfead24302179d66ca25"
                  },
                  "low": {
                    "_id": "582ddfead24302179d66ca24"
                  },
                  "_id": "582ddfead24302179d66ca23"
                },
                "meaning": {
                  "_id": "582ddfead24302179d66ca21",
                  "coding": [
                    {
                      "_id": "582ddfead24302179d66ca22"
                    }
                  ]
                },
                "_id": "582ddfead24302179d66ca20"
              }
            ],
            "component": [
              {
                "valueCodeableConcept": {
                  "_id": "582ddfead24302179d66ca3d",
                  "coding": [
                    {
                      "_id": "582ddfead24302179d66ca3e"
                    }
                  ]
                },
                "dataAbsentReason": {
                  "_id": "582ddfead24302179d66ca3b",
                  "coding": [
                    {
                      "_id": "582ddfead24302179d66ca3c",
                      "code": "asd"
                    },
                    {
                      "code": "asdasd",
                      "_id": "582de238d24302179d66cc5e"
                    }
                  ]
                },
                "valueAttachment": {
                  "_id": "582ddfead24302179d66ca3a"
                },
                "valueRange": {
                  "high": {
                    "_id": "582ddfead24302179d66ca39"
                  },
                  "low": {
                    "_id": "582ddfead24302179d66ca38"
                  },
                  "_id": "582ddfead24302179d66ca37"
                },
                "valuePeriod": {
                  "_id": "582ddfead24302179d66ca36",
                  "end": "2016-11-17T16:50:50.328Z",
                  "start": "2016-11-17T16:50:50.328Z"
                },
                "valueRatio": {
                  "denominator": {
                    "_id": "582ddfead24302179d66ca35"
                  },
                  "numerator": {
                    "_id": "582ddfead24302179d66ca34"
                  },
                  "_id": "582ddfead24302179d66ca33"
                },
                "valueQuantity": {
                  "_id": "582ddfead24302179d66ca32"
                },
                "valueString": "asdasd",
                "_id": "582ddfead24302179d66ca29",
                "referenceRange": [
                  {
                    "high": {
                      "_id": "582ddfead24302179d66ca31"
                    },
                    "low": {
                      "_id": "582ddfead24302179d66ca30"
                    },
                    "age": {
                      "high": {
                        "_id": "582ddfead24302179d66ca2f"
                      },
                      "low": {
                        "_id": "582ddfead24302179d66ca2e"
                      },
                      "_id": "582ddfead24302179d66ca2d"
                    },
                    "meaning": {
                      "_id": "582ddfead24302179d66ca2b",
                      "coding": [
                        {
                          "_id": "582ddfead24302179d66ca2c"
                        }
                      ]
                    },
                    "_id": "582ddfead24302179d66ca2a"
                  }
                ]
              }
            ],
            "performer": [
              {
                "_id": "582ddfead24302179d66ca4c"
              }
            ],
            "status": "test",
            "related": [
              {
                "references": {
                  "_id": "582ddfead24302179d66ca4e"
                },
                "_id": "582ddfead24302179d66ca4d"
              }
            ]
          };


        $httpBackend.whenPOST(config.api_url + '/api/login').respond({
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ"
        });

        $httpBackend.whenPOST(config.api_url + '/api/signup').respond(
            mock
        );

        $httpBackend.whenGET(config.api_url + '/api/observations/582ddfead24302179d66ca1b').respond(mock);

        $httpBackend.whenPOST(config.api_url + '/api/observations').respond(mock);


        $httpBackend.whenGET(config.api_url + '/api/observations').respond([
            mock
        ]);

        $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
    });
}
