import { equal } from 'assert';

export const checkIsDisplayedAndEnabled = async (
        fieldLabel, 
        field, 
        expect: { displayed: boolean, enabled: boolean } = { displayed: true, enabled: true }) => {
    const displayed = await field.isDisplayed();
    equal(displayed, expect.displayed, `${fieldLabel} should be displayed`);
    const toggleButtonStatus = await field.isEnabled();
    equal(toggleButtonStatus, expect.enabled, `${fieldLabel} should be enabled`);
}