const Joi = require('joi')
const createPostSchema = Joi.object({
    title: Joi.string().min(5).max(200).required(),
    opening: Joi.string().min(3).default("An interesting post!"),
    subhead: Joi.string().min(5).required(),
    content: Joi.string().min(20).required()
  })

const validateArticle = (req, res, next) => {
  const {error} = createPostSchema.validate(req.body)
  if(error) return res.status(400).json({Error: "Please provide post title, subhead and content."})
  
  next()
}
const updatePostSchema =  Joi.object({
      title: Joi.string().min(5).optional(),
      opening: Joi.string().min(5).optional(),
      subhead: Joi.string().min(5).optional(),
      content: Joi.string().min(20).optional()
   })
const validateUpdate = (req, res, next) => {
  const {error} = updatePostSchema.validate(req.body)
  if(error || !req.body) return res.status(400).json({Error: "Please provide information to be replaced."})

  next()
}

module.exports = {validateArticle, validateUpdate}