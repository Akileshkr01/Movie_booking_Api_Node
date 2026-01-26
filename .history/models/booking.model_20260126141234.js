const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Theatre
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Movie
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:User
    },
    timing:
})