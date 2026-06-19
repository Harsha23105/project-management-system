const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = { generateToken, verifyToken, hashToken };
