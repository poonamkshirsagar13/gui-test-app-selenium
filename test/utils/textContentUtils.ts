
export const extractTextContentForElement = async (driver, element, textNodeIndex = -1) => {
    if (textNodeIndex >-1) {
        const extractTextScript = 'return Array.from(arguments[0].childNodes).filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join("X0X")';
        const contentString = await driver.executeScript(extractTextScript, element);
        return contentString.split("X0X")[textNodeIndex];
    } else {
        const extractTextScript = 'return Array.from(arguments[0].childNodes).filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(" ")';
        return await driver.executeScript(extractTextScript, element);
    }
};