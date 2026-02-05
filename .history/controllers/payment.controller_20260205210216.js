const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Theatre = require

const create = async (req, res) => {
    try {
        // optional: validate bookingId early
        if (!req.body.bookingId || !ObjectId.isValid(req.body.bookingId)) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: 'Invalid booking id'
            });
        }

        const response = await paymentService.createPayment(req.body);

        if (response.status === BOOKING_STATUS.expired) {
            return res.status(STATUS.GONE).json({
                ...errorResponseBody,
                err: 'The payment took more than 5 minutes to get processed, hence your booking expired',
                data: response
            });
        }

        if (response.status === BOOKING_STATUS.cancelled) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: 'The payment failed due to some reason, booking was not successful',
                data: response
            });
        }






        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Booking completed successfully',
            data: response
        });

    } catch (error) {
        if (error.err && error.code) {
            return res.status(error.code).json({
                ...errorResponseBody,
                err: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};


const getPaymentDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        // validate payment id
        if (!ObjectId.isValid(id)) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: 'Invalid payment id'
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
                err: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};


const getAllPayment = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user._id);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Successfully fetched all the payments',
            data: response
        });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            message: error.message || 'Failed to fetch payments',
            err: error
        });
    }
};

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayment
};