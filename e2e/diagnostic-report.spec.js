describe("Diagnostic report ", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var diagnosticreportMock = require("./mocks/diagnostic-report-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('diagnosticreportBackendMock', diagnosticreportMock.diagnosticreportBackendMock);
        var width = 1920;
        var height = 1080;
        browser.driver.manage().window().setSize(width, height);
        browser.get(browser.baseUrl + '/#/login', 3000);
        browser.waitForAngular();
    });
    after(function() {
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="logout"]')).click();
        });
    });
    it("should create an diagnosticRepor", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="diagnostic_report_order({diagnostic_order_id:diagnosticOrder._id})"]'))), 9000);
        element(by.css('[ui-sref="diagnostic_report_order({diagnostic_order_id:diagnosticOrder._id})"]')).click();
        browser.executeScript('document.getElementById("slide-out").scrollBottom = 2000').then(function() {
            browser.wait(EC.visibilityOf(element(by.model('data.conclusion'))), 6000);
            element(by.model('data.conclusion')).sendKeys('testingAdistaltestingAdistaltestingAdistal');
            element(by.css('[ng-click="saveDiagnosticReport()"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.id("acept_modal"))), 5000);
        element(by.id("acept_modal")).click();
        browser.setLocation('report_view/582c84fc0d992e1545206545');
        browser.wait(EC.visibilityOf(element(by.model('data.conclusion'))), 6000);
        expect(element(by.model('data.conclusion')).getAttribute('value')).to.eventually.equal('testingAdistaltestingAdistaltestingAdistal');
        done();

    });
});
