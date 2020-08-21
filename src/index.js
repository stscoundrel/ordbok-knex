const { setupDB, getKnex } = require('./database/setup.js')
const dictionary = require('./services/dictionary.js')
const { chunkArray } = require('./utils/utils.js')

/**
 * Create database tables.
 * Insert words into tables.
 */
const createDB = async (clientConf) => {
  try {
    const { knex } = await setupDB(clientConf)
    const words = await dictionary.getAll()

    await insertWords(words.norse, 'norse', knex)
    await insertWords(words.english, 'english', knex)

    knex.destroy()
    return { status: true }
  } catch (err) {
    return { status: false, err }
  }
}

/**
 * Insert words into DB.
 * Chunk into smaller arrays to avoid errors.
 */
const insertWords = async (words, table, knex) => {
  const chunks = chunkArray(words, 100)

  for (let i = 0; i < chunks.length; i += 1) {
    await knex(table).insert(chunks[i])
  }
}

module.exports = {
  getKnex,
  createDB,
}
