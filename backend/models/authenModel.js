const mongoose = require("mongoose")

const Schema = mongoose.Schema

const authenSchema = new Schema({ 
    key: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Authens', authenSchema)