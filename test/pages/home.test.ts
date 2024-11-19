
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import { equal, notEqual } from 'assert';

describe('Home Page Tests', () => {
    let driver: WebDriver = undefined;

    beforeAll(async () => {
        console.log('Starting test...');

        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:4000');
    });

    
    afterAll(async () => {
        // wait for 5 before closing the browser
        driver.quit();
        console.log('Finishing test...');
    });

    beforeEach(async () => {
        console.log('Starting it...');
    });

    afterEach(async () => {
        console.log('Finishing it...');
    });

    it('should have correct page title on Home Page', async () => {
        console.log('Testing...should have correct page title');
        const title = await driver.getTitle();
        equal(title, 'GUI React App', 'Page title should be "GUI React App"');
    });

    it('should not have incorrect page title on Home Page', async () => {
        console.log('Testing...should not have incorrect page title');
        const title = await driver.getTitle();
        notEqual(title, 'GUI React AppX', 'Page title should be not "GUI React AppX"');
    });

    it('should have menu bar elements on Home Page', async () => {
        console.log('Testing...menu bar elements');
        const menubarElement1 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[1]')).getText();
        equal(menubarElement1, 'Home', 'Menu bar element 1 should be "Home"');
        const menubarElement2 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[2]')).getText();
        equal(menubarElement2, 'Counter', 'Menu bar element 2 should be "Counter"');
        const menubarElement3 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[3]')).getText();
        equal(menubarElement3, 'About', 'Menu bar element 3 should be "About"');
    });

    it('should have correct header on Home Page', async () => {
        console.log('Testing...should have correct page header');
        const header = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/h1')).getText();
        equal(header, 'Home', 'Page header should be "Home"');
    });

    it('should have correct header text on Home Page', async () => {
        console.log('Testing...should have correct header text');
        const header = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div')).getText();
        const expectedText = 'Home page, navigate to any of the above menu items to start application testing!!!';
        equal(header, expectedText, `Page header should be "${expectedText}"`);
    });
    
});
