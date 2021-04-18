const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const auth = require('../middleware/auth')
const owner = require('../middleware/owner');
const listingController = require('../controllers/ListingsController');

const multer = require('multer')

//define storage
//WITH STORAGE ITS NOT WROKING AND I DONT KNOW WHY
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `/tmp/my-uploads/${req.body.name}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ dest: 'uploads'})



router.get('/listings', catchAsync(listingController.getListings));

router.post('/listings', auth, upload.single('image'), catchAsync(listingController.createListing));

router.get('/listings/:id', catchAsync(listingController.getOneListing));

router.put('/listings/:id',auth, owner.listingOwner, catchAsync(listingController.updateListing));

router.delete('/listings/:id', auth, owner.listingOwner, catchAsync(listingController.deleteListing));

module.exports = router;