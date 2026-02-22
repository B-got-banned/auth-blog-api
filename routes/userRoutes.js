const express = require('express')
const router = express.Router()
const {signUserUp, logUserIn, refreshToken} = require('../controllers/userController')

router.post('/signup', signUserUp)
router.post('/login', logUserIn)
router.post('/refresh-token', refreshToken)

module.exports = router