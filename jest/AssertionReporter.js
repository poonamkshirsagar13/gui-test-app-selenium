class CustomReporter {
    onRunComplete(contexts, results) {
        results.testResults.forEach((testResult) => {
            testResult.testResults.forEach((assertionResult) => {
                if (assertionResult.status === 'passed') {
                    console.log(`[PASSED] ${assertionResult.title}`);
                }
            });
        });
    }
}

export default CustomReporter;