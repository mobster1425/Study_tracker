const Study = require('../models/studyModel.js');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel.js');

const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require('../errors/index.js');
const checkPermissions = require('../utils/checkPermissions.js');
const mongoose = require('mongoose');


const moment=require('moment');
// helper
const removeTime = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };


  const createStudy=async (req,res)=>{
   const {startTime,endTime,date}=req.body;
console.log(req.body);
   if(!startTime || !endTime || !date)
   {
    throw new BadRequestError("invalid input");
   }

     const user=await User.findById(req.user.id);
     if(!user){
        throw new BadRequestError("User not found !")
     }
     /*
     const parsedDate = moment(date, "MM-DD-YYYY");
     if (!parsedDate.isValid()) {
        throw new BadRequestError("Invalid date format. Please provide a valid date in the format MM-DD-YYYY");
      }
    */
    //  const transformedDate = removeTime(parsedDate.toDate());
    
// const transformedDate = parsedDate.format('YYYY-MM-DD');


// const transformedDate = removeTime(new Date(date));
console.log("before parsed date");
const validDateFormats = ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"];
const parsedDate = moment.utc(date, validDateFormats,true);
  if (!parsedDate.isValid()) {
    /*
    throw new BadRequestError(
      "Invalid date format. Please provide a valid date in the format MM-DD-YYYY"
    );
    */
    const errorMessage =
    "Invalid date format. Please provide a valid date in the format MM-DD-YYYY";
  console.log(`Error: ${errorMessage}`);
  throw new BadRequestError(errorMessage);
  }
  console.log("afer parsed date");
console.log(parsedDate);
 
 const transformedDate = parsedDate.local().format("YYYY-MM-DD");

console.log(`transformed date is = ${transformedDate}`);
  // check if entry for that date already exists
  const study = await Study.find({ user: req.user.id, date: transformedDate });

  if (study.length > 0) {
    //res.status(412);
    throw new BadRequestError("There is already a sleep entry for that date!");
  }


const newstudy=await Study.create({
    startTime,
    endTime,
    date:transformedDate,
    user:req.user.id,
})
console.log(`new study detail is = ${newstudy}`);
res.status(StatusCodes.CREATED).json({ newstudy });
  }


  const getStudyEntries=async (req,res)=>{
    console.log(req.user.id);
    console.log("hey get studies entries entry point");
    const user=await User.findById({_id:req.user.id});

//optional params how many study entries in days back since today

    const daysBack=parseInt(req.query.daysBack || 7);

    if(!user){
        throw new UnAuthenticatedError("unauthenticated user");
    }
    console.log("hey get studies entries middle point after user authentication validation");
//calculate days substracted with days back
const startFilteredDate=new Date().setDate(new Date().getDate() - daysBack);




console.log(`filtered date = ${startFilteredDate}`);
console.log("before fetching study entries");
const studyEntries = await Study.find();
  console.log("after fetching studies entries");
console.log(`study entries = ${studyEntries}`);
//const studyEntries=await Study.find({user:req.user.id});

res.status(StatusCodes.OK).json(studyEntries);

  }

  module.exports={createStudy,getStudyEntries};

  /*
{
    user: req.user.id,
    date: { $gte: startFilteredDate, $lt: new Date() },
  }).sort({
    date: -1,
  }

  */