/**
 * Chunk array into smaller bits.
 */
const chunkArray = (original, limit) => {
  const chunkedArrays = [];

  while (original.length > 0) {
    chunkedArrays.push(original.splice(0, limit))
  }

  return chunkedArrays;
}

module.exports = {
  chunkArray,
}
