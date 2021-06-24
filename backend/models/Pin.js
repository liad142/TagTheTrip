const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        min: 3
    },
    desc: {
        type: String,
        require: true,
        min: 3

    },
    rating: {
        type: String,
        require: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    }

}, {timestamps: true}) //timestamps מוסיף אוטומי בעת היצירה של היוזר תאריך

module.exports = mongoose.model("Pin", PinSchema)
