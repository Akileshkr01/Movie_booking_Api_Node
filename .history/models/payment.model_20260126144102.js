const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.Object
    }
})