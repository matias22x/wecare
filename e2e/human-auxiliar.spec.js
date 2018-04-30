describe("Human Auxiliar ", function() {
    var EC = protractor.ExpectedConditions;
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var auxiliarMock = require("./mocks/auxiliar-mock.js");

    before(function() {
        browser.clearMockModules();
        browser.addMockModule('auxiliarBackendMock', auxiliarMock.auxiliarBackendMock);
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
    it("should create an auxiliar", function(done) {
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 30000);
        element(by.model('login_data.username')).sendKeys('BRIAN');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('[type=submit]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="users"]'))), 9000);
        element.all(by.css('[ui-sref="users"]')).last().click();
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="users-create"]')).click();
        });
        browser.wait(EC.visibilityOf(element(by.model("user_data.username"))), 10000);
        element(by.model('user_data.username')).sendKeys('test1');
        element(by.model('user_data.password')).sendKeys('12345678');
        element(by.model('user_data.password_repeat')).sendKeys('12345678');
        element(by.model('user_data.email')).sendKeys('example@email.com');
        browser.executeScript('document.getElementById("rol").style.display = "block"').then(function() {
            $$('option').get(5).click();
            return browser.executeScript('document.getElementById("role_organization").style.display = "block"');
        }).then(function() {
            $$('option').get(8).click();
            return;
        });
        element(by.css('[ng-click="signup()"]')).click();
        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="users"]'))), 10000);
        element.all(by.css('[ui-sref="users"]')).last().click();
        browser.wait(EC.visibilityOf(element(by.repeater('user in userlist'))), 10000);
        element.all(by.repeater('user in userlist')).last().element(by.css("[ui-sref='users-view({id:user._id})']")).click();
        browser.wait(EC.visibilityOf(element(by.binding("user_data.username"))), 10000);
        expect(element(by.binding('user_data.username')).getText()).to.eventually.equal('BRIAN');
        expect(element(by.binding('user_data.type')).getText()).to.eventually.equal('Auxiliar');
        done();

    });
});
