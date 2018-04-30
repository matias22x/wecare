describe('login', function() {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;
    var loginMock = require("./mocks/login-mock.js");
    this.timeout(110000);
    before(function() {
        browser.clearMockModules();
        var width = 1920;
        var height = 1080;
        browser.driver.manage().window().setSize(width, height);
        browser.addMockModule('loginBackendMock', loginMock.loginBackendMock);
        browser.get(browser.baseUrl + '/#/', 3000);
        browser.waitForAngular();
    });
    after(function() {
        browser.executeScript('document.getElementById("slide-out").scrollTop = 2000').then(function() {
            element(by.css('[ui-sref="logout"]')).click();
        });
    });
    it('should login', function(done) {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.model('login_data.username'))), 10000);
        element(by.model('login_data.username')).sendKeys('test');
        element(by.model('login_data.password')).sendKeys('12345678');
        element(by.css('button[type="submit"]')).click();

        browser.wait(EC.visibilityOf(element(by.css('[ui-sref="users-create"]'))), 10000);
        var userNames = element.all(by.repeater('user in userlist').column('user.username'));
        var userRow = element.all(by.repeater('user in userlist'));
        var currentUser = userRow.last();
        var username = userNames.last();
        expect(username.getText()).to.eventually.equal("test");
        done();
    });
});
