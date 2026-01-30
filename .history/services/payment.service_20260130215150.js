const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const createPayment = async (data) => {
    try {
        const booking = await Booking.findById(data.bookingId);

        if (!booking) {
            throw {
                err: 'No booking found',
                code: STATUS.NOT_FOUND
            };
        }

        // check booking expiry (5 minutes)
        const bookingTime = booking.createdAt.getTime();
        const currentTime = Date.now();
        const minutesElapsed = Math.floor((currentTime - bookingTime) / (1000 * 60));

        if (minutesElapsed > 5) {
            booking.status = BOOKING_STATUS.expired;
            await booking.save();

            throw {
                err: 'Booking has expired',
                code: STATUS.GONE // 410
            };
        }

        // validate payment amount
        if (data.amount !== booking.totalCost) {
            const failedPayment = await Payment.create({
                bookingId: booking._id,
                amount: data.amount,
                status: PAYMENT_STATUS.failed
            });

            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();

            throw {
                err: 'Payment amount mismatch',
                code: STATUS.BAD_REQUEST
            };
        }

        // create successful payment
        const payment = await Payment.create({
            bookingId: booking._id,
            amount: data.amount,
            status: PAYMENT_STATUS.success
        });

        booking.status = BOOKING_STATUS.successful;
        await booking.save();

        return {
            booking,
            payment
        };

    } catch (error) {
        throw error;
    }
};

const getPaymentById = async (id) => {
    try {
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
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPayment,
    getPaymentById
};
