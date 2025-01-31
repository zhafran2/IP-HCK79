if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()

const router = require('./routers/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorhandler')
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', (req,res) => {
    res.send("YAY, MY APP IS SUCCESSFULLY RUNNING")
})

app.use(router)
app.use(errorHandler)


module.exports = app