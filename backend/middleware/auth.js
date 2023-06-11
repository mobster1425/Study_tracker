/*
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index.js');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
   // const testUser = payload.userId === '63628d5d178e918562ef9ce8';
    req.user = { id: payload.id };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

module.exports= auth;

*/

const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log('authentication failed invalid authorization header');
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Authorization sucessful : userid=',payload.id);
    // attach the user to the job routes
    //const testUser = payload.userId === '62f801d0510a7c1ed2312d52';
    req.user = { id: payload.id,name:payload.name };
    next();
  } catch (error) {
    console.log('authentication failed: ',error.message);
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;