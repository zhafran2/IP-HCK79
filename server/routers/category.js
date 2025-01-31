const express = require('express')
const CategoryController = require('../controllers/categorycontroller')
const router = express.Router()

router.get('/',CategoryController.getCategories)



module.exports = router
