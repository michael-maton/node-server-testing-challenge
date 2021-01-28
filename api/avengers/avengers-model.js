const db = require("../../database/dbConfig");

module.exports = {
    add,
    update,
    remove,
    getAll,
    getById,
  }
  
  function getAll() {
    return db('avengers')
  }
  
  function getById(id) {
    return null
  }
  
  async function add(hobbit) {
    return null
  }
  
  async function update(id, changes) {
    return null
  }
  
  function remove(id) {
    return null
  }
  