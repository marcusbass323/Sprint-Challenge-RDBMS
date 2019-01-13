
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', table =>{
      table.increments();
      table.string('name').notNullable().unique();
      table.string('description').notNullable;
      table.boolean(complete).notNullable();


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('project');
};
