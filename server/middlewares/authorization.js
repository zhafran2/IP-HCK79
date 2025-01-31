const {Quiz} = require('../models')

async function Authorization(req,res,next) {
    try {
        const {id} = req.params
        const quiz = await Quiz.findByPk(id)
        if(!quiz) {
            throw {name: `NotFound`}
        }
        if(quiz.userId !== req.user.id) {
            throw {name: `Forbidden`}
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = Authorization