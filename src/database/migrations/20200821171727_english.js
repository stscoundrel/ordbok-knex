const up = (knex) => knex.schema
  .createTable('english', (table) => {
    table.increments('id').primary()
    table.string('word')
    table.string('definition')
    table.string('startsWith')
  })

const down = (knex) => knex.schema
  .dropTableIfExists('english')

module.exports = {
  up,
  down,
}
