// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRouter = require('./routes/routes'); // adjust the path as necessary

app.use('/api',apiRouter);
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});

module.exports=app;