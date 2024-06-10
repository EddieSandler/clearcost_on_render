// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRouter = require('./routes/routes'); // adjust the path as necessary
const corsWhitelist = ['https://clearcost-on-render-frontend.onrender.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use('/api',apiRouter);
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});

module.exports=app;


























// // server.js
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const apiRouter = require('./routes/routes'); // adjust the path as necessary

// app.use('/api',apiRouter);
// const PORT = process.env.PORT ||3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port:${PORT}`);
// });

// module.exports=app;