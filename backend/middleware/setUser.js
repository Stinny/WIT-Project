const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function setUser(req, res, next) {
  const authHeader = req.header('Authorization'); //proper way to access request headers
  const token = authHeader && authHeader.split(' ')[1];

  //DEBUG
  //console.log(token);

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) req.user = null;
      req.user = user;
    });
  }

  next();
}

module.exports = { setUser };
