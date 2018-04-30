'use strict';
angular.module('adistalApp')
    .controller('diagnosticReportListCtrl', function($scope, $http, config, $q, userData, $log, diagnosticReportService, procedureRequestService, moment, $translate, $rootScope, utilities, $stateParams, $document) {
        $scope.properties = ['Title', 'Created At', 'RequestedBy', 'AnsweredBy', 'Status'];
        $scope.diagnosticReportListView = [];
        $rootScope.title = $translate.instant('DIAGNOSTIC_REPORTS');
        var modalMjs = $document.find('#modal_end_call').modal();
        if ($stateParams.end_call === 'return_call') {
            modalMjs.modal('open');
        }
        $rootScope.description = $translate.instant('DIAGNOSTIC_REPORTS_ARE_MADE_FROM_DIAGNOSTIC_ORDERS') + $translate.instant('DIAGNOSTIC_ORDERS');
        function prepareDiagnosticReportList(resp) {
            $scope.diagnostic_report_list = resp;
            var list = [];
            if ($rootScope.isPractitionerLender()) {
                $scope.myReportListView = [];
            }
            $scope.diagnostic_report_list.map(function(item, index) {
                var performerPractitioner = item.performer.find(function(itemPerformer) {
                    return itemPerformer.role.text !== 'Organization';
                });
                var requester = item.basedOn[0].reference.requester ? item.basedOn[0].reference.requester.agent.display : '-';
                var status = item.basedOn[0].reference.status ? item.basedOn[0].reference.requester.status : '-';
                list.push({
                    _id: item._id,
                    title: item.identifier[0].value,
                    createdAt: moment(item.createdAt).format('DD/ MM/ YYYY'),
                    answeredBy: performerPractitioner.actor.display,
                    requestedBy: requester,
                    status: $translate.instant(status)
                });
                if ($scope.myReportListView && (performerPractitioner.actor.reference === userData.get('user')._id)) {
                    $scope.myReportListView.push(list[index]);
                }
            });
            return list;
        }

        function loadDiagnosticReport(data) {
            var organizationId = userData.get('currentOrganization').reference;
            var typePractitioner = userData.get('user').role && userData.get('user').role.sub_role;
            return $q(function(resolve) {
                if(data && organizationId) {
                    data = utilities.parseData(data);
                    return resolve(diagnosticReportService.searchReportRequestsRoute(data, organizationId, typePractitioner));
                }

                if(data && !organizationId) {
                    data = utilities.parseData(data);
                    return resolve(diagnosticReportService.searchReportRequestsRoute(data));
                }

                if(!data && organizationId) {
                    return resolve(diagnosticReportService.searchReportRequestsRoute(null, organizationId, typePractitioner));
                }
                return resolve(diagnosticReportService.searchReportRequestsRoute());
            })
            .then(function(resp) {
                $scope.diagnostic_report_list = resp.data;
                $scope.diagnosticReportListView = prepareDiagnosticReportList(resp.data.data);
                return $scope.diagnosticReportListView;
            }).catch(function(err) {
                $log.error(err);
            });
        }

        loadDiagnosticReport();

        $scope.searchData = function(data) {
            return loadDiagnosticReport(data);
        };

        $scope.currentUser = userData.get('user');

        $scope.confirmDelete = function(itemToDelete) {
            diagnosticReportService.deleteDiagnosticReportById(itemToDelete._id).then(function() {
                $scope.diagnosticReportListView.splice($scope.diagnosticReportListView.indexOf(itemToDelete), 1);
                $scope.myReportListView.splice($scope.myReportListView.indexOf(itemToDelete), 1);
            }).catch(function(deletePractitionerError) {
                $log.error('deletePractitionerError: ', deletePractitionerError);
            });
            $log.info($scope.selectedPractitioner);
        };
    });
