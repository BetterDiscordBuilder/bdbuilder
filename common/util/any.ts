export function switchCase<T>(caze: any, cases: any[], defaultValue?: T): T {
    for (const caseTest of cases) {
        if (Array.isArray(caseTest)) {
            const [tester, value] = caseTest;

            if (typeof tester === "function") {
                if (tester(caze)) return value;
            } else if (Object.is(caze, tester)) return value;
        } else if (typeof caseTest === "object") {
            if (typeof caseTest.test === "function") {
                if (caseTest.test(caze)) return caseTest.value;
            } else if (Object.is(caze, caseTest.test)) return caseTest.value;
        }
    }

    return defaultValue;
};