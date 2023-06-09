const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnAuthenticatedError } = require('../errors');
const attachCookie = require('../utils/attachCookie');

const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      throw new BadRequestError('please provide all values');
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use');
    }
    const user = await User.create({ name, email, password });
  
    const token = user.createJWT();
   // attachCookie({ res, token });
    res.status(StatusCodes.CREATED).json({
        email: user.email,
        name: user.name,
        id:user._id,
        token,
    });
  };
  const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }
  
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    //attachCookie({ res, token });
    user.password = undefined;
  
    res.status(StatusCodes.OK).json({ id:user._id,
    name:user.name,
    email:user.email,
    token,
    });
  };

/*
  const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
  };

*/
  module.exports= {register,login};