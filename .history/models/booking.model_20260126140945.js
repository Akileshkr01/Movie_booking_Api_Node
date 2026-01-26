const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Aggregate
    }
})