const jwt = require("jsonwebtoken")

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
}
const generateRefreshToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
}

module.exports = {generateAccessToken, generateRefreshToken}