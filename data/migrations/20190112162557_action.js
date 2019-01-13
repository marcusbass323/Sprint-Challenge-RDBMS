
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', table => {
      table.increment();
      table.string('action_description').notNullable();
      table.string('notes').notNullable();
      table.boolean('complete').notNullable();

  })
};

exports.down = function(knex, Promise) {
  
};
