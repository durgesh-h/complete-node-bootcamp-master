const express = require('express');
const app = express();
const Tours = require('../models/tourModels');
const Tour = require('../models/tourModels');
// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTour = async (req, res) => {
  try {
    const tours = await Tours.find();
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tours: newTour,
  //       },
  //     });
  //   },
  // );
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tours.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // res.status(200).json({ status: 'Success', data: { tour } });
};

exports.updateTour = async (req, res) => {
  try {
    const tours = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // res.status(200).json({ status: 'Success', data: { tour } });
};

exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // res.status(204).json({ status: 'Success', data: null });
};
