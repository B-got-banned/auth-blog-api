require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')
const hashPassword = require('../utils/bcrypt')
const config = require('../config/config')

const signUserUp = async (req, res, next) => {
  try {
    const {name, email, password} = req.body

    const existingUser = await userModel.findOne({email: email})
    if(existingUser) return res.status(400).json({Error: "User already exists. :/"})

    const hashed = await hashPassword(password)

    const user = new userModel({
      name: name,
      email: email,
      password: hashed
    })

    await user.save()
    return res.status(200).json({Message: "User registered successfully! :D"})
  } catch (error) {
      next(error)
  }
}

const logUserIn = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email: email})
    if(!user) return res.status(404).json({Error: "User does not exist :/"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({Error: "Invalid credentials :/"})
    
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    // const token = jwt.sign({userId: user._id, name: user.name}, config.jwtString, {expiresIn: '7d'})
    const responseUser = {name: user.name, id: user._id, email: user.email}

    return res.status(200).json({Message: `Welcome back, ${user.name}. Here are your details`, responseUser, accessToken})
  } catch (error) {
      next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.status(401).json({Message: "Unauthorized"})

  const user = await userModel.findOne({refreshToken})
  if(!user) return res.status(401).json({Message: "Unauthorized"})
  
  const decoded = jwt.verify(refreshToken, config.jwtRefresh)
  if(decoded.userId !== user.id.toString()) return res.status(401).json({Message: "Unauthorized :("})

  const newAccessToken = generateAccessToken(user)
  const newRefreshToken = generateRefreshToken(user)

  user.refreshToken = newRefreshToken
  await user.save()

  res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({accessToken: newAccessToken})
  } catch (error) {
      next(error)
  }
}

module.exports = {signUserUp, logUserIn, refreshToken}