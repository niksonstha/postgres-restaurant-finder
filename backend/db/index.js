const { Pool } = require("pg");

// Create a new pool using your PostgreSQL credentials
const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
