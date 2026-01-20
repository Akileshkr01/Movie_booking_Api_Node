const { errorResponseBody } = require('../utils/responseBody');

const validateTheatreCreateRequest = (req, res, next) => {
    const { name, city, pincode } = req.body || {};

    if (!name || !city || !pincode) {
        return res.status(400).json({
            ...errorResponseBody,
            err: "name, city and pincode are required"
        });
    }

    next();
};

const validateUpdateMoviesRequest = (req, res, next) => {
    const { movieIds, insert } = req.body || {};

    if (typeof insert !== 'boolean') {
        return res.status(400).json({
            ...errorResponseBody,
            err: "'insert' must be a boolean value"
        });
    }

    if (!Array.isArray(movieIds) || movieIds.length === 0) {
        return res.status(400).json({
            ...errorResponseBody,
            err: "movieIds must be a non-empty array"
        });
    }

    next();
};

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
};
