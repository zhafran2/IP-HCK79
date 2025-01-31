const bcrypt = require('bcryptjs')



function HashPass(password) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function ComparePass(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}


module.exports = { HashPass, ComparePass }