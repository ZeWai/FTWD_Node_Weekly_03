
exports.up = function(knex) {
  return knex.schema.createTable('notes', (table) =>{
      table.increments();
      table.string('content')
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.timestamps(false,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes')
};
