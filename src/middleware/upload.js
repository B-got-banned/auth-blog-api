const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

const storage = new cloudinaryStorage({
  cloudinary,
  params: {folder: 'uploads', allowed_formats: ['jpg', 'png', 'jpeg']}
})

const upload = multer({
  //dest: "uploads/", //For disk storage
  storage, //for memory storage
  limits: {fileSize: 3 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg']

    if(allowed.includes(file.mimetype)){
      cb(null, true)
    }
    else{
      const error = new Error("Only PNG and JPG images are allowed")
      error.status = 400
      cb(error)
    }
  }
})

module.exports = upload