const express = require('express');
const app = express();
const {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const router = express.Router();

router.route('/').get(getAllTour).post(createTour);
app.use((req, res, next) => {
  console.log('Hello from the middleware!👋');
  next();
});

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
