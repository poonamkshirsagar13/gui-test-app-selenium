
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import { equal } from 'assert';

const ELEMENT_LOCATORS = {
    aboutLink: By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[3]'),
    aboutCardHeader: By.xpath('//*[@id="root"]/div/div[2]/div/div/h1'),
    aboutCardBody: By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[1]'),
    aboutCardButton: By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[2]/button'),
    aboutCardButtonLabel: By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[2]/button'),
}

describe('About Page Tests', () => {
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
        const aboutLink = await driver.findElement(ELEMENT_LOCATORS.aboutLink);
        await aboutLink.click();
    });

    afterEach(async () => {
        console.log('Finishing it...');
    });

    it('should have correct page header on About Page', async () => {
        console.log('Testing...should not have incorrect page header');
        const header = await driver.findElement(ELEMENT_LOCATORS.aboutCardHeader).getText();
        equal(header, 'About Us', 'Page header should be "About Us"');
    });
})   