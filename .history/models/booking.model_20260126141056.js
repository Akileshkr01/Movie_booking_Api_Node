const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 
    },
    
})