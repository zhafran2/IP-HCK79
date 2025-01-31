const express = require('express')
const Authentication = require('../middlewares/authentication')

const router = express.Router()

router.use('/',require('./user'))
router.use(Authentication)
router.use('/quiz',require('./quiz'))
router.use('/categories',require('./category'))

module.exports = router