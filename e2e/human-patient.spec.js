describe("Human Patient ", function(selenium) {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var humanpatientMock = require("./mocks/patient-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('patientBackendMock', humanpatientMock.patientBackendMock);
        var width = 1920;
        var height = 1080;
        browser.driver.manage().window().setSize(width, height);
        browser.get(browser.baseUrl + '/#/login', 2000);
        browser.waitForAngular();
    });
    after(function() {
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="logout"]')).click();
        });
    });
    it("should create an Human patient ", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="patient_abm"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="patient_add"]'))), 8000);
        element(by.css('[ui-sref="patient_add"]')).click();

        browser.wait(EC.visibilityOf(element(by.model('patient.name[0].text'))), 6000);

        element(by.model('patient.name[0].text')).sendKeys('test');
        element(by.model('patient.name[0].use')).sendKeys('100');

        element(by.model('patient.identifier[0].value')).sendKeys('12345678');
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ng-click="savePatient(false)"]')).click();
        });

        browser.wait(EC.visibilityOf(element(by.css("[ng-click='$ctrl.editRedirect(item._id)']"))), 5000);
        element(by.id("editRedirect")).click();

        browser.wait(EC.visibilityOf(element(by.model("patient.name[0].text"))), 10000);
        expect(element(by.model('patient.name[0].text')).getAttribute('text')).to.eventually.equal(null);
        done();
    });
});
