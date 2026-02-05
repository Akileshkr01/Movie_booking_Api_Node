const paymentService = require('../services/payment.service');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;
const sendMail = require('../services/email.service');

const create = async (req, res) => {
    try {
        // Validate bookingId early
        if (!req.body.bookingId || !ObjectId.isValid(req.body.bookingId)) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                message: 'Invalid booking id'
            });
        }

        const response = await paymentService.createPayment(req.body);

        if (response.status === BOOKING_STATUS.expired) {
            return res.status(STATUS.GONE).json({
                ...errorResponseBody,
                message: 'The payment took more than 5 minutes to get processed, hence your booking expired',
                data: response
            });
        }

        if (response.status === BOOKING_STATUS.cancelled) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                message: 'The payment failed due to some reason, booking was not successful',
                data: response
            });
        }

        // Check populated fields
        const user = response.userId;
        const movie = response.movieId;
        const theatre = response.theatreId;

        console.log('🔍 User:', user);
        console.log('🔍 Movie:', movie);
        console.log('🔍 Theatre:', theatre);

        // Better error message showing which is missing
        const missing = [];
        if (!user) missing.push('User');
        if (!movie) missing.push('Movie');
        if (!theatre) missing.push('Theatre');

        if (missing.length > 0) {
            return res.status(STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                message: `${missing.join(', ')} not found in database. The booking references invalid IDs.`
            });
        }

        // Send confirmation email
        try {
            await sendMail(
                'Your booking is successful',
                user.email,
                `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successful. Your booking id is ${response._id}`
            );
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Don't fail the payment if email fails
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Booking completed successfully',
            data: response
        });

    } catch (error) {
        console.error('Payment error:', error);
        
        if (error.err && error.code) {
            return res.status(error.code).json({
                ...errorResponseBody,
                message: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            message: 'Internal server error'
        });
    }
};

const getPaymentDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                message: 'Invalid payment id'
            });
        }

        const response = await paymentService.getPaymentById(id);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Successfully fetched the booking and payment details',
            data: response
        });

    } catch (error) {
        if (error.err && error.code) {
            return res.status(error.code).json({
                ...errorResponseBody,
                message: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            message: 'Internal server error'
        });
    }
};

const getAllPayment = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments();

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Successfully fetched all the payments',
            data: response
        });
    } catch (error) {
        console.error('Get all payments error:', error);
        
        if (error.err && error.code) {
            return res.status(error.code).json({
                ...errorResponseBody,
                message: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            message: 'Failed to fetch payments'
        });
    }
};

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayment
};