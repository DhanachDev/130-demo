const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cardSchema = new Schema({ 
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String,
        required: false
    },
    cardFileName: {
        type: String,
        required: true
    },
    ready: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Cards', cardSchema)