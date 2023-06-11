require('dotenv').config();
//import express from 'express';
const express = require('express');
const cors=require("cors");

const app=express();

//import dotenv from 'dotenv';
//dotenv.config();
//app.use(cors());

app.use(cors());

/*
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

*/


require('express-async-errors');
//import 'express-async-errors';
//import morgan from 'morgan';
const morgan=require('morgan');
/*
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import MongoSanitize from 'express-mongo-sanitize';

import cookieParser from 'cookie-parser';
*/
const {dirname}=require('path');
const {fileURLToPath}=require('url');
const path=require('path');

const helmet = require('helmet');
 const xss = require('xss-clean');
 const mongoSanitize = require('express-mongo-sanitize');
  const cookieParser = require('cookie-parser');

//routers
/*
import userRoute from './routes/userRoute';
import studyRoute from './routes/studyRoute';

//middleware
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authenticateUser from './middleware/auth';
*/
const userRoute=require('./routes/userRoute.js');
const studyRoute=require('./routes/studyRoute.js');


const notFoundMiddleware=require('./middleware/not-found.js');
const errorHandlerMiddleware=require('./middleware/error-handler.js');
const authenticateUser=require('./middleware/auth.js');
const mongoose = require('mongoose');

if(process.env.NODE_ENV != 'production'){
    app.use(morgan('dev'));
}


app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());


app.use('/api/v1/auth',userRoute);
app.use('/api/v1/study',authenticateUser,studyRoute);

app.get('/health', (req, res) => {
  res.send('ok')
})



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);












const port = process.env.PORT || 5000;
console.log(port);
/*
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
  */
  const url = process.env.MONGODB_URI

  console.log('connecting to', url)
  mongoose.connect(url)
    .then(result => {
      console.log('connected to MongoDB')
      console.log(port);
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })

    app.listen(port,( )=>{
        console.log(`Server running on port ${port}`)
        } );

//start();