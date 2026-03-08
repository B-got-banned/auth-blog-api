const cloudinary = require('cloudinary').v2
const config = require('../config/config')

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudAPI,
  api_secret: config.cloudSecret
})

module.exports = cloudinary