const up = (knex) => knex.schema
  .createTable('english', (table) => {
    table.increments('id').primary()
    table.string('word')
    table.string('definition')
    table.string('type')
    table.string('gender')
    table.string('branch')
    table.string('startsWith')
  })

const down = (knex) => knex.schema
  .dropTableIfExists('english')

module.exports = {
  up,
  down,
}
