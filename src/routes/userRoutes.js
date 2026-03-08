const express = require('express')
const router = express.Router()
const {signUserUp, logUserIn, refreshToken, uploadImage} = require('../controllers/userController')
const { validateSignUp, validateLogIn } = require('../validations/userValidation')
const upload = require('../middleware/upload')

router.post('/signup', upload.single("image"), validateSignUp, signUserUp)
router.post('/login', validateLogIn, logUserIn)
router.post('/refresh-token', refreshToken)
router.post('/upload', upload.single("image"), uploadImage) //will be changed for future updates

module.exports = router