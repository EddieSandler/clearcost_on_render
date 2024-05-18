const { Client } = require("pg");

// Assuming 'medical_pricing' is indeed your database name
let dbName = "medical_pricing";

let db = new Client({
  host: "/var/run/postgresql",  // Path to the directory containing the socket file
  database: dbName  // Database name
});

db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database:', dbName);
  }
});

module.exports = db;
