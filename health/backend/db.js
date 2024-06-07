const { Client } = require("pg");
require('dotenv').config();

// Assuming 'medical_pricing' is indeed your database name
let dbName = "medical_pricing";

let db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3000  // Default port for PostgreSQL
});

db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database:', dbName);
  }
});

module.exports = db;
