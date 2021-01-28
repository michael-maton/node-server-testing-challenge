const db = require("../../database/dbConfig");

module.exports = {
  add,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db("avengers");
}

function getById(id) {
  return null;
}

async function add(avenger) {
  const [id] = await db("avengers").insert(avenger);
  return db("avengers").where({ id }).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db("avengers").delete().where({ id });
}
