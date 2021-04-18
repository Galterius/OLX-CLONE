const multer = require('multer')

//define storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `uploads/images/${req.body.name}`)
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})
const store = multer({storage: storage})