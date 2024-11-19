import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import { equal} from 'assert';
import { extractTextContentForElement } from '../utils/textContentUtils';
import { checkIsDisplayedAndEnabled } from './counter.helper';

const ELEMENT_LOCATOR = {
    INPUT_BOX: By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[2]/input')
}

describe('Counter Page Tests', () => {
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
        const aboutLink = await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/nav/div/div/a[2]'));
        await aboutLink.click();
    });

    afterEach(async () => {
        console.log('Finishing it...');
    });

    it
    ('should have correct card header on Counter Page', async () => {
        console.log('Testing...should not have incorrect card header');
        const cardHeader = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[1]')).getText();
        equal(cardHeader, 'Counter Card', 'Card header should be "Counter Card"');
    });

    it('should have correct card body label on Counter Page', async () => {
        console.log('Testing...should not have incorrect card body');
        const cardBody1 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[1]'));
        const cardBodyContent1 = await extractTextContentForElement(driver, cardBody1, 0);
        equal(cardBodyContent1, 'Counter Value:', 'Card body should be "Counter Value:"');
        const cardBody2 = await driver.findElement(By.id('iValue')).getText();
        equal(cardBody2, 'Value', 'Card body should be "Value"');
        const cardBody3 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div[3]/label')).getText();
        const increment ="Enable Input Increment Value";
        equal(cardBody3, increment, `Card body should be "${increment}"`);
    });
    it('should have correct card body button label on Counter Page', async () => {
        console.log('Testing...should not have incorrect card body button');
        const cardButtonLabel1 = await driver.findElement(By.id('increment')).getText();
        equal(cardButtonLabel1, 'Increment', 'Card body button label should be "Increment"');
        const cardButtonLabel2 = await driver.findElement(By.id('decrement')).getText();
        equal(cardButtonLabel2, 'Decrement', 'Card body button label should be "Decrement"');
        const cardButtonLabel3 = await driver.findElement(By.id('reset')).getText();
        equal(cardButtonLabel3, 'Reset', 'Card body button label should be "Reset"');
    });

    it.only('should have correct card body button on Counter Page', async () => {
        console.log('Testing...should not have incorrect card body button');
        const counterBeforeClick = await driver.findElement(By.id('counterx')).getText();
        equal(counterBeforeClick, '0', 'Counter value should be "0"');
        const counterStart = parseInt(counterBeforeClick);
        const incrButton = await driver.findElement(By.id('increment'));
        const incrementValue = 7;
        for (let i = 0; i < incrementValue; i++) {
            incrButton.click();
        }
        const counterAfterClick = await driver.findElement(By.id('counterx')).getText();
        equal(counterAfterClick, counterStart + incrementValue, `Counter value should be "${counterStart+incrementValue}"`);
        const decrButton = await driver.findElement(By.id('decrement'));
        const decrementValue = 3;
        for (let i = 0; i < decrementValue; i++) {
            decrButton.click();
        }
        const counterAfterClick2 = await driver.findElement(By.id('counterx')).getText();
        equal(counterAfterClick2, counterStart+incrementValue-decrementValue, `Counter value should be "${counterStart+incrementValue-decrementValue}"`);
        console.log(`Counter value should be "${counterStart}"`);

        const resetButton = await driver.findElement(By.id('reset'));
        resetButton.click();
        const counterAfterClick3 = await driver.findElement(By.id('counterx')).getText();
        equal(counterAfterClick3, counterStart, `Counter value should be "${counterStart}"`);

        // check input box is displayed and disabled
        const input = await driver.findElement(ELEMENT_LOCATOR.INPUT_BOX);
        checkIsDisplayedAndEnabled("inputBox", input, { displayed: true, enabled: false });
        // const inputDisplayed = await input.isDisplayed();
        // equal(inputDisplayed, true, 'Input should be displayed');
        // console.log(`Input should be displayed`);
        // const inputIsDisabled = await input.isEnabled();
        // equal(inputIsDisabled, false, 'Input should not be enabled');


        // Check toggle is displayed and enabled
        const toggle = await driver.findElement(By.id('inlineCheckbox1'));
        checkIsDisplayedAndEnabled("toggle", toggle, { displayed: true, enabled: true });
        // const toggleButtonStatus = await toggle.isEnabled();
        // equal(toggleButtonStatus, true, 'Toggle should be enabled');
        // console.log(`Toggle should be enabled`);
        const toggleValue = await toggle.isSelected();
        equal(toggleValue, false, 'Toggle should be off by default');
        console.log(`Toggle should be off by default`);

        toggle.click();
        const toggleValueAfterClick = await toggle.isSelected();
        equal(toggleValueAfterClick, true, 'Toggle should be on after clicking');
        console.log('Toggle should be on after clicking');

        // recheck the input box value
        const inputIsEnabled = await input.isEnabled();
        equal(inputIsEnabled, true, 'Input should be enabled');
    });});
    