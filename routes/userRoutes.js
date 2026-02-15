const express = require('express')
const router = express.Router()
const {signUserUp, logUserIn} = require('../controllers/userController')

router.post('/signup', signUserUp)
router.post('/login', logUserIn)

module.exports = router