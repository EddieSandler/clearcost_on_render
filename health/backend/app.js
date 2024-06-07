const express = require('express');
const app = express();
const db=require('db')
const routes = require('./routes/routes');  // Adjust the path as necessary
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


const cors = require('cors');
app.use(cors());  // Enable CORS for all routes


app.use(express.json());
app.use('/api', routes);

module.exports = app;
