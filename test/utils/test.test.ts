import { testIdProps } from './test';

describe('test', function () {
  it('testIdProps', function () {
    expect(testIdProps('fake-id')).toStrictEqual({
      accessibilityLabel: 'fake-id',
      testID: 'fake-id',
    });
  });
});
