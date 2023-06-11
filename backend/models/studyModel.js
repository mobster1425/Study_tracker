//import { mongoose } from "mongoose"
const mongoose = require('mongoose');
const StudySchema = new mongoose.Schema(
    {
      startTime: {
        type: String,
        required: [true, "Please select a valid sleep time"],
      },
      endTime: {
        type: String,
        required: [true, "Please select a valid wake up time"],
      },
      date: {
        type: Date,
        required: [true, "The date is not valid"],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
       
        ref: "User",
        required: [true,"Please provide a user"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Study= mongoose.model("Study", StudySchema);

  module.exports=Study;