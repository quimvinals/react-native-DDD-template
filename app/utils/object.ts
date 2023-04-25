import { mergeAll, flatten, reduce, assoc, keys } from 'ramda';

/**
 * Search in an object the key corresponding to a value
 *
 * @param obj Object where we are going to search the key
 * @param value Value to search
 */
export function getKeyByValue(obj: object, value: any) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

/**
 * Creates a list of string from an object, to represent all the keys
 * with the format ['key1.key2','key1.key3']
 *
 * @param obj Object to generate the list
 * @param keyPrefix Add a prefix to each key
 * @param separator Separator to use between keys
 */
export function extractKeys(obj: object, keyPrefix = '', separator = '.'): string[] {
  const combinedKeys = [];
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    if (typeof obj[key] === 'string') {
      if (key.includes('_plural')) {
        return;
      }
      combinedKeys.push(keyPrefix + key);
    } else {
      combinedKeys.push(...extractKeys(obj[key], keyPrefix + key + separator));
    }
  });

  return combinedKeys;
}

/**
 * Creates a new object formed by the keys which has the attribute passed.
 * Each key value will be the value of that attribute.
 *
 * @param obj Target object which has the desired attribute
 * @param attribute Attribute to return.
 */
export function reduceKeyByAttribute(obj: object, attribute: string) {
  return Object.keys(obj).reduce(function (accum, key) {
    const item = obj[key];

    if (attribute in item) {
      accum[key] = item[attribute];
    }

    return accum;
  }, {});
}

/**
 * Mix two or more objects.
 *
 * @param {object[]} objects The array of objects to mix.
 */
export const enhance = <T extends object>(objects: object[]): T => {
  return mergeAll(flatten(objects)) as T;
};

/**
 * If element is an array, return the element[index]. If not, return element
 * @param element Array or default value for the preset.
 * @param index Item to access in case preset is an array.
 */
export function getElement<T>(element: T | T[], index: number): T {
  if (Array.isArray(element)) {
    return element.length > index ? element[index] : null;
  } else {
    return element;
  }
}

/**
 * Given an array an a map of key:string -> value:string, rename the key properties in each
 * object in the array for the value.
 * @param array Array to rename
 * @param keysMap Map of renamings
 */
export function renameKey<T>(array: T[], keysMap: Record<string, string>): T[] {
  return array.map((obj: T) =>
    reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {} as T, keys(obj)),
  );
}
