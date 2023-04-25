/**
 * Capitalize first word of the string
 *
 * @param {string} word String
 */
export function capitalize(word: string) {
  return typeof word === 'string' ? word.replace(/^\w/, (w) => w.toUpperCase()) : '';
}

/**
 * Capitalize all words of a string
 *
 * @param {string} words String containing the words
 */
export function capitalizeWords(words: string) {
  return typeof words === 'string' ? words.replace(/(?:^|\s)\S/g, (w) => w.toUpperCase()) : '';
}

/**
 * Capitalize all characters of a string
 *
 * @param {string} words String containing the words
 */
export function uppercase(words: string): string {
  return typeof words === 'string' ? words.toUpperCase() : '';
}

/**
 * Ellipsize a string if it has more than n characters
 *
 * @param word String to ellipsize
 * @param maxLength Max length of the string
 * @param ellipsizeChars Characters to use in the ellipsis
 */
export function ellipsize(word: string, maxLength: number, ellipsizeChars = '...'): string {
  return word.length > maxLength ? word.substring(0, maxLength - 3) + ellipsizeChars : word;
}
