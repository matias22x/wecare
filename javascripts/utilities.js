'use strict';

var utilitiesModule = angular.module('utilities', []);
utilitiesModule.factory('utilities', function(moment) {
    var utilities = {};
    utilities.formatDate = function(str) {
        if (/[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/.test(str)) {
            str = str.substr(0, 10);
            var sectionDate = str.split('-');

            var auxiliarDate = new Date();

            auxiliarDate.setFullYear(sectionDate[0]);
            auxiliarDate.setMonth(sectionDate[1] - 1);
            auxiliarDate.setDate(sectionDate[2]);
            str = auxiliarDate;
        }
        return str;
    };
    utilities.stringToDateRecursive = function(obj) {
        if (typeof obj === 'object') {
            Object.keys(obj).forEach(function(key) {
                if (obj[key] === null || obj[key] === '' || typeof obj[key] === 'undefined' || obj[key].length === 0) {
                    delete obj[key];
                } else {
                    obj[key] = utilities.stringToDateRecursive(obj[key]);
                }
            });
        } else {
            obj = utilities.formatDate(obj);
        }
        return obj;
    };
    utilities.validEmail = function(emailStr) {
        return emailStr && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}(.[a-zA-Z]{2,})?))$/).test(emailStr);
    };
    utilities.parseToTranslateKey = function parseToTranslateKey(word) {
        return word.toUpperCase().replace(/ /g, '_').replace(/([^A-Z'_'])/g, '');
    };
    utilities.validDates = [
        'DD/MM/YYYY',
        'DD/MM/YY',
        'DD/M/YYYY',
        'DD/M/YY',
        'D/MM/YYYY',
        'D/MM/YY',
        'D/M/YYYY',
        'D/M/YY',
        'DD-MM-YYYY',
        'DD-MM-YY',
        'DD-M-YYYY',
        'DD-M-YY',
        'D-MM-YYYY',
        'D-MM-YY',
        'D-M-YYYY',
        'D-M-YY'
    ];
    utilities.parseData = function(data) {
        var dataMoment = moment(data, utilities.validDates, true);
        if (dataMoment._isValid === true) {
            var dateStart = dataMoment.format();
            var dateEnd = dataMoment.add(1, 'day');
            dateEnd = dateEnd.format();
            data = {
                dateStart: dateStart,
                dateEnd: dateEnd
            };
        }else {
            data = {
                text: data
            };
        }
        return data;
    };
    utilities.getNameLiByTabName = function(tabName) {
        var listIdTabs = {
            general:      'generalLi',
            request:      'solicitudLi',
            fisical_exam: 'examen_fisicoLi',
            studies:      'estudiosLi',
            background:   'antecedentesLi',
            notes:        'notasLi'
        };
        return listIdTabs[tabName];
    };
    return utilities;
});
