/**
 * Shuffles array in place. ES6 version
 * Thanks to https://stackoverflow.com/a/6274381
 * @param {object[]} array a list of items.
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default shuffle;
