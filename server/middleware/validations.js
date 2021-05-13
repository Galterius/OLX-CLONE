const listingSchima = require('../schemas/validationsSchemas');

const validateListing = (req, res, next) => {
  console.log(req.body);
  const { error } = listingSchima.validate(req.body);
  if (error) {
    const msg = error.details.map((elements) => elements.message).join(',');
    console.log(msg);
  }
  next();
};

module.exports = validateListing;
