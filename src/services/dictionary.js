const { oldNorseToEnglish, englishToOldNorse } = require('old-norse-ordbok')

const getAll = async () => {
  const oldNorse = await oldNorseToEnglish()
  const english = await englishToOldNorse()

  return {
    english: formatWords(english),
    norse: formatWords(oldNorse),
  }
}

/**
 * Add "startsWith" propety to words
 * to match the DB schema.
 */
const formatWords = (words) => words.map((word) => ({
  ...word,
  startsWith: word.word.charAt(0).toLowerCase(),
}))

module.exports = {
  getAll,
}
