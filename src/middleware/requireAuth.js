const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const config = require('../config/config')

const requireAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  if(!authHeader || !authHeader.startsWith('Bearer')) return res.status(401).json({Message: "Access denided. No token provided."})

  const token = authHeader.split(' ')[1]

  try{
    const payload = jwt.verify(token, config.jwtString)

    const user = await userModel.findById(payload.userId)
    if(!user) return res.status(404).json({Error: "User does not exist :/"})
    req.user = user
    next()
  }
  catch(error){
    console.log(error)
    return res.status(400).json({Error: "Invalid or expired token :("})
  }
}

module.exports = requireAuth