// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRouter = require('./routes/routes'); // adjust the path as necessary

app.use(apiRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports=app;