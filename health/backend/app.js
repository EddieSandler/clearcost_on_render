// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/routes'); // Adjust the path as necessary
const db = require('./db'); // Ensure this is properly set up

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Enable CORS for all routes

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
