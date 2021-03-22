const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const auth = require('../middleware/auth')
const owner = require('../middleware/owner');

const listingController = require('../controllers/ListingsController');

router.get('/listings', catchAsync(listingController.getListings));

router.post('/listings', auth, catchAsync(listingController.createListing));

router.get('/listings/:id', catchAsync(listingController.getOneListing));

router.put('/listings/:id',auth, owner.listingOwner, catchAsync(listingController.updateListing));

router.delete('/listings/:id', auth, owner.listingOwner, catchAsync(listingController.deleteListing));

module.exports = router;