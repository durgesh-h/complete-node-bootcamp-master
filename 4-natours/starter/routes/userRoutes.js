const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
