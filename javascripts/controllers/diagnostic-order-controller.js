'use strict';
angular.module('adistalApp').controller('diagnosticOrderListCtrl', function($scope, $http, $q, config, $log, userData, moment, diagnosticOrderService) {
    $scope.properties = ['Title', 'Patient', 'RequestedBy', 'Status', 'Created At'];
    $scope.diagnosticOrdersListView = [{}];
    $http.get(config.api_url + '/api/diagnosticorders').then(function(resp) {
        $scope.diagnostic_order_list = resp.data;
    }).catch(function(err) {
        $log.error(err);
    });
    $scope.miDiagnosticOrdersListView = [];
    function loadDiagnosticOrder(data, userIdbyPractitioner) {
        $q(function(resolve) {
            if(data && userIdbyPractitioner) {
                return resolve(diagnosticOrderService.searchDiagnosticOrder(data, userIdbyPractitioner));
            }else if (data) {

                var dataMoment = moment(data, 'DD/MM/YYYY');
                if (dataMoment._isValid === true) {
                    var dateStart = dataMoment.format();
                    var dateEnd = dataMoment.add(1, 'day');
                    dateEnd = dateEnd.format();
                    return resolve(diagnosticOrderService.searchDiagnosticOrderByDate(dateStart, dateEnd));
                }

                return resolve(diagnosticOrderService.searchDiagnosticOrder(data));
            }
            return resolve(diagnosticOrderService.getAllDiagnosticOrder());
        })
          .then(function(diagnosticOrdersResp) {

              $scope.diagnosticOrdersListView = diagnosticOrdersResp.data.map(function(item) {
                  return {
                      _id: item._id,
                      identifier: item._id,
                      patient: (item.identifier && item.identifier.length > 0) && item.identifier[0].value,
                      requestedBy: item.orderer.display,
                      orderer: item.orderer,
                      title: (typeof item.identifier[0] !== 'undefined' && typeof item.identifier[0].system !== 'undefined' ?
                      item.identifier[0].system :
                      '-'),
                      createdAt: moment(item.createdAt).format('DD/ MM/ YYYY'),
                      status: item.status,
                      sref: {
                          patient: {
                              state: 'patient_view',
                              params: {
                                  id: item.subject.reference
                              }
                          },
                          requestedBy: {
                              state: 'users-view',
                              params: {
                                  id: item.orderer.reference
                              }
                          }
                      }
                  };
              });
          }).catch($log.error);
    }
    if (userData.get('user') !== null && typeof userData.get('user').type !== 'undefined' && userData.get('user').type === 'Practitioner') {
        var rol = userData.get('user').role;
        loadDiagnosticOrder('', userData.get('user')._id);
        $http.get(config.api_url + '/api/practitioners/' + rol.practitioner).then(function(practitionerResp) {
            practitionerResp.data.practitionerRole.forEach(function(role) {
                var organization = role.managingOrganization.display;
                $http.get(config.api_url + '/api/diagnosticorders?conditions={"assignTo.display":"' + organization + '"}').then(function(doResp) {
                    var itemDiagnosticList = {
                        organization:organization
                    };
                    itemDiagnosticList.list = doResp.data.map(function(item) {
                        return {
                            _id: item._id,
                            identifier: item._id,
                            patient: (item.identifier && item.identifier.length > 0) && item.identifier[0].value,
                            requestedBy: item.orderer.display,
                            orderer: item.orderer,
                            title: (typeof item.identifier[0] !== 'undefined' && typeof item.identifier[0].system !== 'undefined' ?
                                item.identifier[0].system :
                                '-'),
                            createdAt: new Date(item.createdAt).toDateString(),
                            status: item.status,
                            sref: {
                                patient: {
                                    state: 'patient_view',
                                    params: {
                                        id: item.subject.reference
                                    }
                                },
                                requestedBy: {
                                    state: 'users-view',
                                    params: {
                                        id: item.orderer.reference
                                    }
                                }
                            }
                        };
                    });
                    $scope.miDiagnosticOrdersListView.push(itemDiagnosticList);
                }).catch($log.error);
            });
        }).catch(function(err) {
            $log.error(err);
        });
    } else {
        loadDiagnosticOrder();
    }

    $scope.searchData = function(data) {
        loadDiagnosticOrder(data);
    };

    $scope.deleteDiagnosticOrder = function(diagnosticOrderIndex) {
        var id = $scope.diagnostic_order_list[diagnosticOrderIndex]._id;
        $http.delete(config.api_url + '/api/diagnosticorders/' + id);
        $scope.diagnostic_order_list.splice(diagnosticOrderIndex, 1);
    };


    $scope.currentUser = userData.get('user');

    $scope.confirmDelete = function(itemToDelete) {
        diagnosticOrderService.deleteDiagnosticOrderById(itemToDelete._id).then(function() {
            $scope.diagnosticOrdersListView.splice($scope.diagnosticOrdersListView.indexOf(itemToDelete), 1);
        }).catch(function(deletePractitionerError) {
            $log.error('deletePractitionerError: ', deletePractitionerError);
        });
        $log.info($scope.selectedPractitioner);
    };
    
});
