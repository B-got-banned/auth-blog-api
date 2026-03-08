const multer = require("multer")

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  console.error(error.stack || "")
  const status = error.status || 500
  if(error instanceof multer.MulterError){
    res.status(400).json({Error: "File upload error. File may be too large :("})
  }
  res.status(status).json({Error: error.message || "Something went wrong :("})
}

module.exports = errorHandler