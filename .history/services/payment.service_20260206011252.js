const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const PAYMENT_TIME_LIMIT_MINUTES = 5;

const createPayment = async (data) => {
    console.log('🔍 Creating payment for booking:', data.bookingId);
    
    const booking = await Booking.findById(data.bookingId);
    
    if (!booking) {
        throw {
            err: 'No booking found',
            code: STATUS.NOT_FOUND
        };
    }
    
    console.log('✅ Booking found:', booking);
    
    if (booking.status === BOOKING_STATUS.successful) {
        throw {
            err: 'Booking already completed, cannot make a new payment against it',
            code: STATUS.FORBIDDEN
        };
    }

    const bookingTime = booking.createdAt.getTime();
    const currentTime = Date.now();

    const minutesElapsed = Math.floor((currentTime - bookingTime) / (1000 * 60));
    console.log(`⏱️ Minutes elapsed: ${minutesElapsed}`);

    if (minutesElapsed > PAYMENT_TIME_LIMIT_MINUTES) {
        console.log('⏰ Booking expired');
        booking.status = BOOKING_STATUS.expired;
        await booking.save();
        return booking;
    }

    console.log('💳 Creating payment...');
    const payment = await Payment.create({
        bookingId: data.bookingId,
        amount: data.amount,
        status: PAYMENT_STATUS.pending
    });
    console.log('✅ Payment created:', payment);

    console.log(`💰 Comparing - Payment: ${payment.amount}, Booking: ${booking.totalCost}`);
    
    if (payment.amount !== booking.totalCost) {
        console.log('❌ Amount mismatch');
        payment.status = PAYMENT_STATUS.failed;
        booking.status = BOOKING_STATUS.cancelled;

        await payment.save();
        await booking.save();
        return booking;
    }

    console.log('✅ Updating statuses...');
    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successful;

    await payment.save();
    await booking.save();
    console.log('✅ Saved successfully');

    console.log('🔄 Populating booking...');
    try {
        const populatedBooking = await Booking.findById(booking._id)
            .populate('userId')
            .populate('movieId')
            .populate('theatreId');
        
        console.log('✅ Populated booking:', populatedBooking);
        return populatedBooking;
    } catch (populateError) {
        console.error('❌ Populate error:', populateError);
        // Return unpopulated booking if populate fails
        return booking;
    }
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

const getAllPayments = async () => {
    try {
        const payments = await Payment
            .find()
            .populate('bookingId');

        return payments;
    } catch (error) {
        throw {
            err: 'Failed to fetch payments',
            code: STATUS.INTERNAL_SERVER_ERROR
        };
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments
};