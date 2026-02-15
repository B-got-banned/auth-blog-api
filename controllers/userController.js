const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

const signUserUp = async (req, res, next) => {
  try {
    const signUpSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    const {error} = signUpSchema.validate(req.body)
    if(error) return res.status(400).json({Error: error.details[0].message})

    const {name, email, password} = req.body

    const existingUser = await userModel.findOne({email: email})
    if(existingUser) return res.status(400).json({Error: "User already exists. :/"})

    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(password, salt)

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
    const logInSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    const {error} = logInSchema.validate(req.body)
    if(error) return res.status(400).json({Error: error.details[0].message})

    const {email, password} = req.body
    const user = await userModel.findOne({email: email})
    if(!user) return res.status(404).json({Error: "User does not exist :/"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({Error: "Invalid credentials :/"})

    const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '7d'})
    const responseUser = {name: user.name, id: user._id, email: user.email}

    return res.status(200).json({Message: `Welcome back, ${user.name}. Here are your details`, responseUser, token})
  } catch (error) {
      next(error)
  }
}

module.exports = {signUserUp, logUserIn}