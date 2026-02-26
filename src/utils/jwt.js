const jwt = require("jsonwebtoken")
const config = require("../config/config")

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name
  }
  return jwt.sign(payload, config.jwtString, {expiresIn: '1h'})
}
const generateRefreshToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name
  }
  return jwt.sign(payload, config.jwtRefresh, {expiresIn: '7d'})
}

module.exports = {generateAccessToken, generateRefreshToken}