exports.auxiliarBackendMock = function() {
    angular.module('auxiliarBackendMock', ['ngMockE2E'])
        .run(function($httpBackend, config) {
            var mock = {
                "_id": "5829f7b00fae9b6df3a13cd5",
                "updatedAt": "2016-11-14T20:20:55.085Z",
                "createdAt": "2016-11-14T17:43:12.486Z",
                "__v": 8,
                "auxiliarRole": [{
                    "managingOrganization": {
                        "_id": "5829f7b00fae9b6df3a13cd9"
                    },
                    "role": {
                        "_id": "5829f7b00fae9b6df3a13cd7",
                        "coding": [{
                            "_id": "5829f7b00fae9b6df3a13cd8"
                        }]
                    },
                    "_id": "5829f7b00fae9b6df3a13cd6"
                }],
                "photo": [{
                    "_id": "5829f7b00fae9b6df3a13cda",
                    "contentType": "image/png",
                    "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA7CAIAAADKGJCyAAAAh3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaVY7RDcMwCET/maIjYMCHGaeNYqkbdPyCnMjK+4DTyX6Czt930qtoLGTdBwLgxMJC3hkGL5S5CbfaORfX1pZJdk0qKyCGs+2HdvU3XTEw3dzRceCQtMupopKzRGXlOiO2ZN6/9dnr5ymnP0q/LHYPWp+wAAAKBGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjI0MCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjU5IgogICB0aWZmOkltYWdlV2lkdGg9IjI0MCIKICAgdGlmZjpJbWFnZUhlaWdodD0iNTkiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",
                    "size": 5228,
                    "title": "ideas.png"
                }, {
                    "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA7CAIAAADKGJCyAAAAh3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaVY7RDcMwCET/maIjYMCHGaeNYqkbdPyCnMjK+4DTyX6Czt930qtoLGTdBwLgxMJC3hkGL5S5CbfaORfX1pZJdk0qKyCGs+2HdvU3XTEw3dzRceCQtMupopKzRGXlOiO2ZN6/9dnr5ymnP0q/LHYPWp+wAAAKBGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjI0MCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjU5IgogICB0aWZmOkltYWdlV2lkdGg9IjI0MCIKICAgdGlmZjpJbWFnZUhlaWdodD0iNTkiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",
                    "contentType": "image/png",
                    "size": 5228,
                    "title": "ideas.png",
                    "_id": "582a1bcf9c18e103a4cd4568"
                }],
                "address": [{
                    "_id": "5829f7b00fae9b6df3a13cdd",
                    "line": []
                }],
                "telecom": [{
                    "_id": "5829f7b00fae9b6df3a13cdb",
                    "value": "val telecom 3"
                }],
                "name": {
                    "_id": "5829f7b00fae9b6df3a13cdc",
                    "text": "test1",
                    "prefix": [],
                    "given": [],
                    "family": [],
                    "suffix": []
                },
                "identifier": [{
                    "type": {
                        "_id": "5829f7b00fae9b6df3a13cdf",
                        "coding": [{
                            "_id": "5829f7b00fae9b6df3a13ce0"
                        }]
                    },
                    "value": "test",
                    "_id": "5829f7b00fae9b6df3a13cde"
                }],
                "active": false
            };

            var userMock = {
                _id: "59c3d67c782eb70021720014",
                updatedAt: "2017-09-21T15:10:52.887Z",
                createdAt: "2017-09-21T15:10:52.887Z",
                username: "brian",
                email: "auxiliarusers@mail.com",
                type: "Auxiliar",
                __v: 0,
                role: {
                    auxiliar: "59c3d67c782eb70021720015"
                },
                tokens: [],
                deleted: false
            };

            var organizationMock = {
                    _id: "59a42c1f3e14230019590c41",
                    updatedAt: "2018-01-04T13:44:36.682Z",
                    createdAt: "2017-08-28T14:43:43.497Z",
                    type: {
                        _id: "59a42c1f3e14230019590c43",
                        coding: [{
                            _id: "59a42c1f3e14230019590c44"
                        }]
                    },
                    name: "OrganizacionCliente",
                    partOf: {},
                    active: true,
                    __v: 2,
                    specialties: [
                        "59038a1a16d0f60017e2e923",
                        "59038b2d16d0f60017e2ea1d",
                        "59038bab16d0f60017e2ea75"
                    ],
                    endpoint: [],
                    alias: [],
                    identifier: [{
                        type: {
                            _id: "59a42c1f3e14230019590c50",
                            coding: [{
                                _id: "59a42c1f3e14230019590c51"
                            }]
                        },
                        value: "organizacion cliente",
                        use: "CLIENT",
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
                    ]
            };

            $httpBackend.whenPOST(config.api_url + '/api/users').respond({
                "_id": "582cbbcd551e0766078efecb",
                "updatedAt": "2016-11-16T20:04:29.992Z",
                "createdAt": "2016-11-16T20:04:29.992Z",
                "username": "test",
                "email": "test@127.0.0.1:4000.com",
                "__v": 0,
                "role": {
                    "auxiliar": "5829f7b00fae9b6df3a13cd5"
                },
                "tokens": []
            });

            $httpBackend.whenPOST(config.api_url + '/api/login').respond({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJjYmJjZDU1MWUwNzY2MDc4ZWZlY2IiLCJpYXQiOjE0NzkzOTM4Njh9.5nGAwKVAFoFN6u2ZeIO29KbqtkVNtvuq1uO6c0ChLVQ",
                "user": {
                    "username": "admin",
                    "email": "admin@mail.com",
                    "type": "Node Administrator",
                    "role": {
                        "node_administrator": "59aeac4dc0a1e30017eb724e"
                    },
                    "tokens": [],
                    "deleted": false
                }
            });

            $httpBackend.whenGET(config.api_url + '/api/auxiliars/5829f7b00fae9b6df3a13cd5').respond(mock);

            $httpBackend.whenGET(config.api_url + '/api/users').respond([userMock]);

            $httpBackend.whenGET(config.api_url + '/api/users/59c3d67c782eb70021720014').respond(userMock);

            $httpBackend.whenPUT(config.api_url + '/api/auxiliars/5829f7b00fae9b6df3a13cd5').respond(mock);

            $httpBackend.whenPOST(config.api_url + '/api/auxiliars').respond(mock);

            $httpBackend.whenGET(config.api_url + '/api/auxiliars').respond([
                mock
            ]);

            $httpBackend.whenGET(/\/api\/organizations/).respond([organizationMock]);

            $httpBackend.whenGET(/^(?!(\/api))/).passThrough(); ///^(?!(\/api))/
        });
};
