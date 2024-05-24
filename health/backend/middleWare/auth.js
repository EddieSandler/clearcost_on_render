const jwt = require('jsonwebtoken');


const { SECRET_KEY } = require("../config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
const checkAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);

    if (!user.isAdmin) {
      return res.status(403).send('Admin access required');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};


module.exports = authenticateToken, checkAdmin;
