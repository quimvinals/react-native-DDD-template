import { capitalize, capitalizeWords, uppercase, ellipsize } from './string';

describe('capitalize function', function () {
  it("transforms to upper case the word's 1st letter", function () {
    const test = 'lorem';
    const result = capitalize(test);

    expect(result).toBe('Lorem');
  });

  it('transforms return empty string if parameter is not a string', function () {
    const result = capitalize(1 as any);
    expect(result).toBe('');
  });
});

describe('capitalizeWords function', function () {
  it("transforms to upper case the word's 1st letter", function () {
    const test = 'lorem ipsum sit amet';
    const result = capitalizeWords(test);

    expect(result).toBe('Lorem Ipsum Sit Amet');
  });

  it('transforms return empty string if parameter is not a string', function () {
    const result = capitalizeWords(1 as any);
    expect(result).toBe('');
  });
});

describe('uppercase function', function () {
  it("transforms to upper case the word's 1st letter", function () {
    const test = 'lorem ipsum sit amet';
    const result = uppercase(test);

    expect(result).toBe('LOREM IPSUM SIT AMET');
  });

  it('transforms return empty string if parameter is not a string', function () {
    const result = uppercase(1 as any);
    expect(result).toBe('');
  });
});

describe('ellipsize', function () {
  const maxLength = 10;

  it('with a short string', function () {
    expect(ellipsize('lorem', maxLength)).toBe('lorem');
  });

  it('with a long string', function () {
    expect(ellipsize('lorem ipsum', maxLength)).toBe('lorem i...');
  });

  it('with a custom ellipsis', function () {
    expect(ellipsize('lorem ipsum', maxLength, '///')).toBe('lorem i///');
  });
});
