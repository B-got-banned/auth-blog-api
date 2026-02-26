const express = require('express')
const router = express.Router()
const {signUserUp, logUserIn, refreshToken} = require('../controllers/userController')
const { validateSignUp, validateLogIn } = require('../validations/userValidation')

router.post('/signup', validateSignUp, signUserUp)
router.post('/login', validateLogIn, logUserIn)
router.post('/refresh-token', refreshToken)

module.exports = router