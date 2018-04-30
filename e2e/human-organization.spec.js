describe("Human Organization", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var humanorganizationMock = require("./mocks/organization-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('organizationBackendMock', humanorganizationMock.organizationBackendMock);
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
    it("should create an Human organization", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="organization_abm"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="organization_add"]'))), 9000);

        element(by.css('[ui-sref="organization_add"]')).click();

        browser.wait(EC.visibilityOf(element(by.model('name'))), 8000);

        element(by.model('name')).sendKeys('test');

        element(by.css('[ng-click="saveOrganization()"]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ng-click="$ctrl.editRedirect(item._id)"]'))), 6000);
        element(by.css('[ng-click="$ctrl.editRedirect(item._id)"]')).click();

        browser.wait(EC.visibilityOf(element(by.model("name"))), 5000);
        expect(element(by.model('name')).getAttribute('text')).to.eventually.equal(null);
        done();

    });
});
