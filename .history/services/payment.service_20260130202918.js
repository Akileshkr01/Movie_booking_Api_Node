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
    }
}