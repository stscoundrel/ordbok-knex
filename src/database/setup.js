const Knex = require('knex')
const knexConf = require('./knexfile.js')

/**
 * Setup DB with migrations.
 */
const setupDB = async (clientConfig) => {
  const knex = getKnex(clientConfig)

  try {
    await migrateTables(knex)
    return { status: true, knex }
  } catch (err) {
    return { status: false, err }
  }
}

/**
 * Get Knex instance.
 */
const getKnex = (clientConf) => {
  const config = getConfig(clientConf)
  const knex = Knex(config)

  return knex
}

/**
 * Combine base config with client conf.
 * Allows client to give own DB details,
 * but keeps our migrations folder.
 */
const getConfig = (clientConf) => {
  const overrides = clientConf

  if (overrides.migrations) {
    delete overrides.migrations
  }

  return { ...knexConf, ...overrides }
}

/**
 * Migrate tables for the data.
 */
const migrateTables = async (knex) => {
  await knex.migrate.latest()
}

module.exports = {
  setupDB,
  getKnex,
}
