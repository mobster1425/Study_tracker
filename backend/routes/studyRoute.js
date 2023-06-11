//import express from 'express';
const express = require('express');
const router = express.Router();

//import { createStudy,getStudyEntries } from '../controllers/studyController';
const { getStudyEntries,createStudy } = require("../controllers/studyController");

router
  .route("/").post(createStudy).get(getStudyEntries)

module.exports = router;
