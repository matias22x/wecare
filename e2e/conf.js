exports.config = {
    allScriptsTimeout: 1100000,
    specs: ['*.spec.js'],
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    baseUrl: 'http://localhost:4000'
};
