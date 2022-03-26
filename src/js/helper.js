export const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

/**
 * @param {Array} arr An array
 * @returns A random element of {@link arr}
 */
export const getRandomElement = arr => arr[randomInt(0, arr.length - 1)];
