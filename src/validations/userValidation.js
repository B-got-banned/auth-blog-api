const Joi = require('joi')
const signUpSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

const validateSignUp = (req, res, next) => {
  const {error} = signUpSchema.validate(req.body)
  if(error) return res.status(400).json({Error: error.details[0].message})
  
  next()
}
const logInSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
const validateLogIn = (req, res, next) => {
  const {error} = logInSchema.validate(req.body)
  if(error) return res.status(400).json({Error: error.details[0].message})

  next()
}

module.exports = {validateSignUp, validateLogIn}