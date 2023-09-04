const express = require('express');
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tourController.js');
const router = express.Router();

router.param('id', checkId);

// Create a checkBody middleware
// Chech if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router.route('/').get(getTours).post(checkBody, createTour);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
