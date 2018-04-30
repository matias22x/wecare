describe("Credit", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var creditMock = require("./mocks/credit-mock.js");
    before(function() {
        browser.clearMockModules();
        browser.addMockModule('creditBackendMock', creditMock.creditBackendMock);
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
    it("should create a credit.", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('brian');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.executeScript('document.getElementById("slide-out").scrollTop = 1000').then(function() {
            element(by.css('[ui-sref="credit"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="credit.edit"]'))), 10000);
        element(by.css('[ui-sref="credit.edit"]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ng-click="$ctrl.editIdentifier($index)"]'))), 10000);
        var identifier = element(by.css('[ng-click="$ctrl.editIdentifier($index)"]'));
        identifier.click();
        element(by.model('identifier.value')).sendKeys('value test');
        element(by.css('button[type="submit"]')).click();
        element.all(by.repeater('credit in credit_list')).last().element(by.css("[ui-sref='credit.edit({credit_id:credit._id})']")).click();
        identifier.click();
        browser.wait(EC.visibilityOf(element(by.model("identifier.value"))), 10000);
        expect(element(by.model('identifier.value')).getAttribute('value')).to.eventually.equal('value test');
        done();
    });
});
