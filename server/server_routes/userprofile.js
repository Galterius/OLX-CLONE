const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/UserProfileController');
const auth = require('../middleware/auth');

router.get('/userprofile/:id', auth, userProfileController.getCurrentUser);
router.put('/userprofile/:id', auth, userProfileController.updateCurrentUser);

module.exports = router;
