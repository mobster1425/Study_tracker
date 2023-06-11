//import express from 'express';
const express = require('express');
const router = express.Router();
const rateLimiter=require('express-rate-limit');
//import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});


//import { register,login,logout } from '../controllers/userController';
//import authenticateUser from '../middleware/auth.js';
const { login, register,logout } = require("../controllers/userController");


router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
//router.get('/logout', logout);


//export default router;
module.exports=router;