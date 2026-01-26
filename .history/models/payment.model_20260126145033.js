const mongoose = require('mongoose');
const {PAYMENT_STATUS} = require('../utils/constants');
const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Booking'
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:[PAYMENT_STATUS.pending,PAYMENT_STATUS.failed,PAYMENT_STA]
        },
        default:""
    }
},{timestamps: true});

const Payment = mongoose.model('Payment',paymentSchema);
module.exports= Payment;