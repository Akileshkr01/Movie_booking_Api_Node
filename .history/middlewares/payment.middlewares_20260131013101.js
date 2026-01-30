const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const { Types: { ObjectId } } = require('mongoose').Types;

const verifyPaymentCreateRequest = (req, res, next) => {
    const { bookingId, amount } = req.body;

    // validate booking id presence
    if (!bookingId) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'No booking id received'
        });
    }

    // validate correct booking id
    if (!ObjectId.isValid(bookingId)) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'Invalid booking id'
        });
    }

    // validate amount presence and correctness
    if (amount === undefined || amount === null) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'No amount sent'
        });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: 'Invalid amount'
        });
    }

    // everything is fine
    next();
};

module.exports = {
    verifyPaymentCreateRequest
};

