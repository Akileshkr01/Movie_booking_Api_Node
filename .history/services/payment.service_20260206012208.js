const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const PAYMENT_TIME_LIMIT_MINUTES = 5;

const createPayment = async (data) => {
    const booking = await Booking.findById(data.bookingId);
    
    if (!booking) {
        throw {
            err: 'No booking found',
            code: STATUS.NOT_FOUND
        };
    }
    
   
    if (booking.status === BOOKING_STATUS.successfull) {
        throw {
            err: 'Booking already completed, cannot make a new payment against it',
            code: STATUS.FORBIDDEN
        };
    }

    const bookingTime = booking.createdAt.getTime();
    const currentTime = Date.now();

    const minutesElapsed = Math.floor((currentTime - bookingTime) / (1000 * 60));

    if (minutesElapsed > PAYMENT_TIME_LIMIT_MINUTES) {
        booking.status = BOOKING_STATUS.expired;
        await booking.save();
        return booking;
    }

    const payment = await Payment.create({
        bookingId: data.bookingId,
        amount: data.amount,
        status: PAYMENT_STATUS.pending
    });

    if (payment.amount !== booking.totalCost) {
        payment.status = PAYMENT_STATUS.failed;
        booking.status = BOOKING_STATUS.cancelled;

        await payment.save();
        await booking.save();
        return booking;
    }

    payment.status = PAYMENT_STATUS.success;
    // ✅ Changed: successful → successfull (double L)
    booking.status = BOOKING_STATUS.successfull;

    await payment.save();
    await booking.save();

    // Return populated booking with all details
    const populatedBooking = await Booking.findById(booking._id)
        .populate('userId')
        .populate('movieId')
        .populate('theatreId');

    return populatedBooking;
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