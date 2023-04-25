/**
 * Parse a string to boolean.
 *
 * @param {string} bool String to check.
 */
export function parseBoolean(bool: string) {
  return ['1', 'True', 'true'].includes(bool);
}
