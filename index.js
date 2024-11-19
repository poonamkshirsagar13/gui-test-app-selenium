const { Builder, By, until } = require("selenium-webdriver");

const assert = require("assert");


async function counterTest() {
    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        //navigate to facebook login page
        await driver.get("http://localhost:4000/");

        await driver.wait(async () => {
            return await driver.executeScript('return document.readyState') === 'complete';
        }, 10000); // 10 seconds timeout
        await driver.sleep(3000);

        console.log("Page loaded");

        const pageTitle = await driver.getTitle();
        // assert usign node assertion
        assert.strictEqual(pageTitle, "GUI React App");
        let resetBtn = await driver.findElement(By.id("reset"));
        assert.equal(await resetBtn.isDisplayed(), true, "Reset button is displayed");

        let incBtn = await driver.findElement(By.id("increment"));
        assert.equal(await incBtn.isDisplayed(), true, "Increment button is displayed");

        let counterxDiv = await driver.findElement(By.id("counterx"));
        let initialCounterx = await counterxDiv.getText();
        console.log(`initialCounterx: ${initialCounterx}`);
        await incBtn.click();
        await incBtn.click();
        await incBtn.click();
        // await driver.executeScript("arguments[0].setAttribute('disabled', true);", incBtn)
        // await incBtn.click();
        let initialCounterxPlus3 = await counterxDiv.getText();
        console.log(`initialCounterxPlus3: ${initialCounterxPlus3}`);
        assert.equal(initialCounterxPlus3, Number(initialCounterx) + 3, "Increment button with 3 clicks not working");

        await resetBtn.click();
        let initialCounterxReset = await counterxDiv.getText();
        console.log(`initialCounterxReset: ${initialCounterxReset}`);
        assert.equal(initialCounterxReset, initialCounterx, "Reset button not working");


        let inlineCheckbox1 = await driver.findElement(By.id("inlineCheckbox1"));
        assert.equal(await inlineCheckbox1.isDisplayed(), true, "Inline checkbox 1 is displayed");
        assert.equal(await inlineCheckbox1.getAttribute("type"), "checkbox", "Inline checkbox 1 has type 'checkbox'");

        // find the input field and check its editability
        let iValueInput = await driver.findElement(By.id("iValue"));
        assert.equal(await iValueInput.isEnabled(), false, "Is input field disabled?");

        // find the inlineCheckbox1 checkbox and check its state
        assert.equal(await inlineCheckbox1.isEnabled(), true, "Inline checkbox 1 is enabled");

        // click on the inlineCheckbox1 checkbox to enable it
        await inlineCheckbox1.click();

        // find the input field and check its editability again
        iValueInput = await driver.findElement(By.id("iValue"));
        assert.equal(await iValueInput.isEnabled(), true, "Is input field enabled?");

        //   // Select input elements and fill them out
        //   await driver.findElement(By.id("email")).sendKeys("test3@gmail.com");
        //   await driver.findElement(By.id("password")).sendKeys("Password@12345");
        //   // Select login button and invoke click action
        //   //If login details are correct we wiil be redirected to the welcome page
        //   await driver.findElement(By.name("login")).click();
        //   //On succesful login get page title
        //   //Check page title, to confirm login was successful
        //   const pageTitle = await driver.getTitle();
        //   // assert usign node assertion
        //   assert.strictEqual(pageTitle, "Welcomepage");
        //   //Check if redirect to login page was successfull

        setTimeout(function () {
            driver.quit();
        }, 5000);
    } finally {
        //   await driver.quit();
    }
}


counterTest();

