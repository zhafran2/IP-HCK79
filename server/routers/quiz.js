


const express = require('express')
const QuizController = require('../controllers/quizcontroller')
const Authorization = require('../middlewares/authorization')
const router = express.Router()

router.get('/',QuizController.getAllQuestions)
router.get('/api',QuizController.QuizAPIIo)
router.post('/',QuizController.createQuestions)
router.post('/gemini', QuizController.AiQuestions)
router.get('/:id',QuizController.getById)
router.put('/:id',Authorization, QuizController.editQuestions)
router.delete('/:id',Authorization, QuizController.deleteQuestions)

module.exports= router