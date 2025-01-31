const jwt = require('jsonwebtoken')

const secret = process.env.SECRET


function SignToken(payload) {
return jwt.sign(payload,secret)
}


function VerifyToken(token) {
    return jwt.verify(token,secret)
}


module.exports = {SignToken,VerifyToken}