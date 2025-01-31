

const express = require('express')
const UserController = require('../controllers/usercontroller')

const router = express.Router()

router.post('/register',UserController.Register)
router.post('/login' ,UserController.Login)
router.post('/google-login',UserController.GoogleLogin)
module.exports = router



