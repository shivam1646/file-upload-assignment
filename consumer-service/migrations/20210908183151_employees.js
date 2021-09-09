
exports.up = function(knex) {
  return knex.schema.createTable('employee', table => {
    table.increments('id')
    table.string('name')
    table.string('phone')
    table.string('email')
    table.string('company')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('employee');
};
