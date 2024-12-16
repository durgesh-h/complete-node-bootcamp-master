const express = require('express');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: { users },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
