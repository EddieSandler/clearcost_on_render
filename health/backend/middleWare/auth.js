const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = require("../config");
// const SECRET_KEY = process.env.SECRET_KEY;


//authenticates JWT for  all routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('authentication started')

  if (!token) {
    console.log('auth failing')
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    console.log('Authenticated user: ', req.user);
    next();
  } catch (err) {
    console.log('invalid token')
    res.status(400).send('Invalid Token');
  }
};

//authentication for Admin users, used for all Admin endpoints

const checkAdmin = (req, res, next) => {
  if (!req.user.isadmin) {
    return res.status(403).send('Admin access required');
  }
  next();
};

module.exports = { authenticateToken, checkAdmin };
