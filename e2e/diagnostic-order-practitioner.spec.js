describe("Diagnostic Order Practitioner", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var diagnosticOrderMock = require("./mocks/diagnostic-order-practitioner-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('diagnosticorderBackendMock', diagnosticOrderMock.diagnosticorderBackendMock);
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
    it("should create an diagnosticOrder login as practitioner", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        element(by.css('[ui-sref="patient_abm"]')).click();

        browser.wait(EC.visibilityOf(element(by.css('[ng-click="$ctrl.editRedirect(item._id)"]'))), 9000);
        element(by.css('[ng-click="$ctrl.editRedirect(item._id)"]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="procedure_new({patient_id:patient._id})"]'))), 8000);
        element(by.css('[ui-sref="procedure_new({patient_id:patient._id})"]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[href="#solicitud"]'))), 8500);
        element(by.css('[href="#solicitud"]')).click();
        browser.wait(EC.visibilityOf(element(by.model('identifier[0].system'))), 7000);
        element(by.model('identifier[0].system')).sendKeys('nikola teslaaaa\n');
        browser.executeScript('document.getElementById("type-request").style.display = "block"').then(function() {
            $$('option').get(1).click();
            return browser.executeScript('document.getElementById("patient-gender").style.display = "block"');
        })
        .then(function(e) {
            $$('option').get(3).click();
            return browser.executeScript('document.getElementById("specialty").style.display = "block"');
        }).then(function(){
            $$('option').get(4).click();
            return;
        }).then(function(){
            browser.wait(EC.visibilityOf(element(by.css('[ng-click="closeExplication()"]'))), 6000);
            element(by.css('[ng-click="closeExplication()"]')).click();
            element(by.css('[ng-click="saveDiagnosticOrder()"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.id("acept_modal"))), 3000);
        element(by.id("acept_modal")).click();
        browser.wait(EC.visibilityOf(element(by.css('[ng-click="$ctrl.viewRedirect(item._id)"]'))), 4500);
        element(by.css('[ng-click="$ctrl.viewRedirect(item._id)"]')).click()
        browser.wait(EC.visibilityOf(element(by.model("subject.display"))), 5000);
        expect(element(by.model('subject.display')).getAttribute('value')).to.eventually.equal('aasd');
        done();

    });
});
