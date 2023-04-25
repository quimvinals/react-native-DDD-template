import {
  getKeyByValue,
  extractKeys,
  reduceKeyByAttribute,
  enhance,
  getElement,
  renameKey,
} from './object';

describe('object', function () {
  it('getKeyByValue', function () {
    expect(getKeyByValue({ key: 'value' }, 'value')).toBe('key');
  });

  it('extractKeys', function () {
    const obj = {
      key1: {
        key2: 'val1',
        key3: {
          key4: 'val2',
        },
      },
      key5: 'val3',
    };

    expect(extractKeys(obj)).toStrictEqual(['key1.key2', 'key1.key3.key4', 'key5']);
  });

  it('reduceKeyByAttribute', function () {
    const object = {
      attributeA: { childX: 1, childY: 2 },
      attributeB: { childX: 3, childY: 4 },
      attributeC: { childX: 5, childZ: 6 },
    };

    expect(reduceKeyByAttribute(object, 'childY')).toStrictEqual({
      attributeA: 2,
      attributeB: 4,
    });
  });

  it('enhance', function () {
    const origin = {
      attributeA: { x: 1, y: 2 },
      attributeB: { x: 3, y: 4 },
      attributeC: { x: 5, y: 6 },
    };
    const override = {
      attributeB: { y: 6, z: 3 },
    };
    const enhancedOrigin = {
      attributeA: { x: 1, y: 2 },
      attributeB: { y: 6, z: 3 },
      attributeC: { x: 5, y: 6 },
    };
    const result = enhance([origin, override]);

    expect(result).toStrictEqual(enhancedOrigin);
  });

  describe('getElement', function () {
    const presets: string[] = ['primary', 'secondary'];

    it('with a non list preset', function () {
      expect(getElement<string>('secondary', 2)).toStrictEqual('secondary');
    });

    it('with a list of presets', function () {
      expect(getElement<string>(presets, 1)).toBe('secondary');
    });

    it('overflowing the presets list', function () {
      expect(getElement<string>(presets, 2)).toBeNull();
    });
  });

  it('renameKey', function () {
    const array = [
      {
        a: 100,
        x: 200,
      },
      {
        d: 100,
        foo: '100',
        q: 200,
      },
    ];
    const keysMap = {
      a: 'b',
      foo: 'bar',
    };
    expect(renameKey(array, keysMap)).toStrictEqual([
      {
        b: 100,
        x: 200,
      },
      {
        bar: '100',
        d: 100,
        q: 200,
      },
    ]);
  });
});
