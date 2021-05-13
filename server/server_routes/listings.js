const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const auth = require('../middleware/auth');
const validateListing = require('../middleware/validations');
const owner = require('../middleware/owner');
const listingController = require('../controllers/ListingsController');
const upload = require('../middleware/imageupload');

router.get('/listings', catchAsync(listingController.getListings));

router.post(
  '/listings',
  auth,
  upload.array('images', 12),
  validateListing,
  catchAsync(listingController.createListing),
);

router.get('/listings/:id', catchAsync(listingController.getOneListing));

router.put(
  '/listings/:id',
  auth,
  owner.listingOwner,
  catchAsync(listingController.updateListing),
);

router.delete(
  '/listings/:id',
  auth,
  owner.listingOwner,
  catchAsync(listingController.deleteListing),
);

module.exports = router;
