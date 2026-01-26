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
    timing:{
        type:String,
        required:true
    },
    noOfSeats:{
        type:Number,
        required:true
    },
    totalCost:{
        type:Number
    },
    status:{
        type:String,
        required:true,
        enum: {
            values:["IN_PROCESS","CANCELLED","SUCCESSFULL"],
            message:"Invalid booking status"
        },
        default:"IN_PROCESS"
    }
})