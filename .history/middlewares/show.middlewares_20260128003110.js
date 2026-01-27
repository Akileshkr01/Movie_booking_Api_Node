const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
    // validate theatre id 
    if (!req.body.theatreId) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "No theatre provided"
        });
    }

    if (!ObjectId.isValid(req.body.theatreId)) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "Invalid theatre id"
        });
    }

    // validate movie presence
    if (!req.body.movieId) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "No movie provided"
        });
    }

    if (!ObjectId.isValid(req.body.movieId)) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "Invalid movie id"
        });
    }

    // validate timing presence 
    if (!req.body.timing) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "No timing provided"
        });
    }

    // validate noOfSeats presence
    if (!req.body.noOfSeats) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "No seat info provided"
        });
    }

    // validate price presence
    if (!req.body.price) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "No price information provided"
        });
    }

    next();
};

const validateShowUpdateRequest = async (req,res,next) => {
    if(req.body.theatreId || req.body.movieId) {
        errorResponseBody.err = "we cannot update theatre or movie for an already added show ";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}   

module.exports = {
    validateCreateShowRequest,
    validateShowUpdateRequest
};
