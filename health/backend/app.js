// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/routes'); // Adjust the path as necessary
const db = require('./db'); // Ensure this is properly set up
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
// const { SECRET_KEY } = require("../config");
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: process.env.SECRET_KEY, // Replace with your secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true, // Set to true for HTTPS connections
        httpOnly: true, // Prevent client-side script from accessing the cookie
        domain: 'https://backend-service-rjwj.onrender.com', // Replace with your backend domain
        sameSite: 'strict', // Strict or lax based on your requirements
      },
    })
  );

const corsOptions = {
    origin: 'https://clearcost-on-render-frontend.onrender.com', // Replace with your frontend domain
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    credentials: true, // To allow cookies to be sent with cross-origin requests
  };

  app.use(cors(corsOptions));
// app.use(cors());  // Enable CORS for all routes

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
