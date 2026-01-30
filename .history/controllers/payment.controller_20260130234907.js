const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;

const create = async (req, res) => {
    try {
        console.log('📝 Payment request body:', req.body);
        
        // optional: validate bookingId early
        if (!req.body.bookingId || !ObjectId.isValid(req.body.bookingId)) {
            return res.status(STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                message: 'Invalid booking id'
            });
        }

        console.log('✅ Calling payment service...');
        const response = await paymentService.createPayment(req.body);
        console.log('✅ Payment service response:', response);

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

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: 'Booking completed successfully',
            data: response
        });

    } catch (error) {
        console.error('❌ Payment controller error:', error);
        
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

        // validate payment id
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
        console.error('❌ Get payment error:', error);
        
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

module.exports = {
    create,
    getPaymentDetailsById 
};