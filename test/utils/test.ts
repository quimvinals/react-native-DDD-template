export const testIdProps = (testId: string) => ({ accessibilityLabel: testId, testID: testId });

export const noop = () => null;

export const isTest = (): boolean => typeof __TEST__ !== 'undefined';

/**
 * Wait until all the promises are resolved
 * Use it only as last resource, not as a default solution.
 * By default, try to wait using testing library tools.
 */
export const flushPromises = (): Promise<any> => new Promise((resolve) => setImmediate(resolve));
