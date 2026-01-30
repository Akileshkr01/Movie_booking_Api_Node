const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const PAYMENT_TIME_LIMIT_MINUTES = 5;

const createPayment = async (data) => {
    console.log('🔍 Payment service - Finding booking:', data.bookingId);
    
    const booking = await Booking.findById(data.bookingId);

    if (!booking) {
        console.log('❌ No booking found');
        throw {
            err: 'No booking found',
            code: STATUS.NOT_FOUND
        };
    }

    console.log('✅ Booking found:', booking);

    const bookingTime = booking.createdAt.getTime();
    const currentTime = Date.now();

    // minutes elapsed since booking
    const minutesElapsed = Math.floor((currentTime - bookingTime) / (1000 * 60));
    console.log(`⏱️ Minutes elapsed: ${minutesElapsed}`);

    if (minutesElapsed > PAYMENT_TIME_LIMIT_MINUTES) {
        console.log('⏰ Booking expired');
        booking.status = BOOKING_STATUS.expired;
        await booking.save();
        return booking;
    }

    console.log('💳 Creating payment record...');
    const payment = await Payment.create({
        bookingId: data.bookingId,
        amount: data.amount,
        status: PAYMENT_STATUS.pending
    });
    console.log('✅ Payment created:', payment);

    console.log(`💰 Comparing amounts - Payment: ${payment.amount}, Booking: ${booking.totalCost}`);
    
    if (payment.amount !== booking.totalCost) {
        console.log('❌ Amount mismatch - Payment failed');
        payment.status = PAYMENT_STATUS.failed;
        booking.status = BOOKING_STATUS.cancelled;

        await payment.save();
        await booking.save();
        return booking;
    }

    console.log('✅ Payment successful');
    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successful;

    await payment.save();
    await booking.save();

    return booking;
};


const getPaymentById = async (id) => {
    const payment = await Payment
        .findById(id)
        .populate('bookingId');

    if (!payment) {
        throw {
            err: 'No payment record found',
            code: STATUS.NOT_FOUND
        };
    }

    return payment;
};


module.exports = {
    createPayment,
    getPaymentById
};