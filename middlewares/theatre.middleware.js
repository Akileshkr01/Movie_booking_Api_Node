const { errorResponseBody } = require('../utils/responseBody');
console.log('Loaded theatre.middleware.js from:', __filename);

const validateTheatreCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'The name of the theatre is not present'
        });
    }

    if (!req.body.pincode) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'The pincode of the theatre is not present'
        });
    }

    if (!req.body.city) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'The city of the theatre is not present'
        });
    }

    next();
};

const validateUpdateMoviesRequest = async (req, res, next) => {
    if (req.body.insert === undefined) {
        return res.status(400).json({
            ...errorResponseBody,
            err: "The 'insert' parameter is missing"
        });
    }

    if (!Array.isArray(req.body.movieIds) || req.body.movieIds.length === 0) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Valid movieIds array is required'
        });
    }

    next();
};

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
};
