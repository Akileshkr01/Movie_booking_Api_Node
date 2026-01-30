const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const {STATUS,BOOKING_STATUS,PAYMENT_STATUS} = require('../utils/constants');


const createPayment = async (data) => {
    try{
        const booking = await Booking.findById(data.bookingid);
        if(!booking){
            throw{
                err:'No booking found',
                code: STATUS.NOT_FOUND
            }
        }
        let bookingTime = booking.createdAt;
        let currentTime = Date.now();
        //calculatew how many minutes are remaining 
        let minutes = Math.floor(((currentTime - bookingTime )/1000)/60);
        if(minutes > 5){
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }
        const payment = await Payment.create({
            bookingId: data.bookingId,
            amount:data.amount
        });
        if(payment.amount > booking.totalCost){
            payment.status = PAYMENT_STATUS.failed;
        }
        if(!payment || payment.status === PAYMENT_STATUS.failed){
            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();
            return nooking;
        }
        payment.status = 
    }

}