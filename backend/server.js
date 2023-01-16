require('dotenv').config()



const express = require("express")
const mongoose = require("mongoose")
const bp = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
// express app
const app = express();
const cardRoutes = require('./routes/card')

app.use(express.static('uploads'))

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// to fixed req.body undefined
app.use(express.json())
app.use(express.urlencoded())

//cors
app.use(cors())

// routes
app.use('/api/workouts/', cardRoutes)

//body-parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

mongoose.connect(process.env.MONG_URI)
.then(() => {
    // listen for request 
    app.listen(process.env.PORT , () => {
        console.log("connected to db & listening on port 4000")
    })
})
.catch((error) => {
    console.log(error)
})





