describe("Human Observation ", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var humanobservationMock = require("./mocks/observation-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('observationBackendMock', humanobservationMock.observationBackendMock);
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
    it("should create an Human observation ", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="observation_abm"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="observation_add"]'))), 10000);

        element(by.css('[ui-sref="observation_add"]')).click();

        browser.wait(EC.visibilityOf(element(by.model('status'))), 10000);

        element(by.model('status')).sendKeys('test');
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ng-click="saveObservation()"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.css("[ui-sref='observation_add({observation_id:item._id})']"))), 10000);


        element.all(by.repeater('item in observationList')).last().element(by.css("[ui-sref='observation_add({observation_id:item._id})']")).click();

        browser.wait(EC.visibilityOf(element(by.model("status"))), 10000);
        expect(element(by.model('status')).getAttribute('text')).to.eventually.equal(null);
        done();

    });
});
