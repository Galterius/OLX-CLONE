const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      'C:/Users/Kadeno Solutions/Desktop/OLX-CLONE/client/public/uploads',
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.fieldname + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
