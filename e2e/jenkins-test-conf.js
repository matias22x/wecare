'use strict';

exports.config = {
    allScriptsTimeout: 20000,
    getPageTimeout: 120000,
    specs: ['*.spec.js'],
    multiCapabilities: [
        {
            'browserName': 'phantomjs',
            'phantomjs.binary.path': require('phantomjs').path,
            'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
        }
    ],
    baseUrl: 'http://app:4000',
    mochaOpts: {
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'results/mochawesome-reports',
            inlineAssets: true
        },
        timeout: 620000
    },
    seleniumAddress: 'http://hub:4444/wd/hub',
    framework: 'mocha'
};
