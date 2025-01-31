

function errorHandler(error,req,res,next) {
let status = 500
let message = "Internal Server Error"

if (error.name === "EmailRequired") {
    status = 401
    message = "Email is required"
} else if (error.name === "PasswordRequired") {
    status = 401
    message = "Password is required"
} else if (error.name === "Unauthenticated") {
    status = 401
    message = "Email or Password is Invalid"
}
else if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    status = 400
    message = error.errors[0].message
}
else if (error.name === "Forbidden") {
    status = 403
    message = "You're not authorized"
}
else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    status = 401
    message = "Invalid token"
}
else if(error.name === "GoogleFailed" ) {
    status = 402
    message = "Sorry, Login Using Google Account Failed"
}
else if(error.name === "NotFound") {
    status = 404
    message = "Your Request is Not Found"
}
res.status(status).json({
    message
})
}


module.exports = errorHandler