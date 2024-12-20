const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErros');

// JWT Token Creator Function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(200).json({
    status: 'success',
    data: {
      token: token,
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) CHeck if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  //2) Check if the user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email or Password is incorrect!', 401));
  }
  //3) If everything is ok, send token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: 'Login success',
    token,
  });
});
