import { parseBoolean } from './';

describe('parseBoolean function', function () {
  it('returns "true" when input string is "1"', function () {
    const shouldBeTrue = parseBoolean('1');

    expect(shouldBeTrue).toBeTruthy();
  });

  it('returns "true" when input string is "True"', function () {
    const shouldBeTrue = parseBoolean('True');

    expect(shouldBeTrue).toBeTruthy();
  });

  it('returns "true" when input string is "true"', function () {
    const shouldBeTrue = parseBoolean('true');

    expect(shouldBeTrue).toBeTruthy();
  });

  it('returns "false" when input string is "false', function () {
    const shouldBeFalse = parseBoolean('false');

    expect(shouldBeFalse).toBeFalsy();
  });
});
