const { listingSchima } = require('../schemas/validationsSchemas');

const validateListing = (req, res, next) => {
  const { error } = listingSchima.validate(req.body);
  console.log(req.body);
  if (error) {
    const msg = error.details.map((elements) => elements.message).join(',');
    console.log(msg);
  } else {
    next();
  }
};

module.exports = validateListing;
