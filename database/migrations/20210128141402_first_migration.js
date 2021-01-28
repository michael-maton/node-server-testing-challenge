exports.up = function (knex) {
  return knex.schema.createTable("avengers", (tbl) => {
    tbl.increments();
    tbl.string("superhero", 128).notNullable().unique();
    tbl.string("power", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("avengers");
};
