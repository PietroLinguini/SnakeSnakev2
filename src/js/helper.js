export const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

/**
 * @param {Array} arr An array
 * @returns A random element of {@link arr}
 */
export const getRandomElement = arr => arr[randomInt(0, arr.length - 1)];

/**
 * Used to convert a string to a box-like array.
 * @param {String} str The string to convert.
 * @returns {[row: number, column: number]} The array constructed from {@link str}.
 */
export const parseBox = str => str.split(",", 2).map(s => +s);
