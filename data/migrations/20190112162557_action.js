
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', table => {
      table.increments();
      table.string('action_description').notNullable();
      table.string('notes').notNullable();
      table.boolean('completed').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('action');

};
