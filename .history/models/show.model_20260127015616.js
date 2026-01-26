const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    theatreId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timing: {
        tpe:String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    format: {
        type: String
    }
},{})