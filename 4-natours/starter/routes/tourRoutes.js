const express = require('express');
const app = express();
const {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const router = express.Router();

// router.param('id', checkID);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/tour-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopTours, getAllTour);
router.route('/').get(getAllTour).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
