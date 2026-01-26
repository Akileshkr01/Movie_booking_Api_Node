console.log('Loaded theatre.middleware.js from:', __filename);

const { STATUS } = require('../utils/constants');

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};

/**
 * Validate create movie request
 */
const validateMovieCreateRequest = (req, res, next) => {

    if (!req.body.name) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie name is required'
        });
    }

    if (!req.body.description) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie description is required'
        });
    }

    if (!req.body.casts || !Array.isArray(req.body.casts) || req.body.casts.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie casts is required'
        });
    }

    if (!req.body.trailerUrl) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie trailerUrl is required'
        });
    }

    if (!req.body.releaseDate) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie releaseDate is required'
        });
    }

    if (!req.body.director) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...badRequestResponse,
            err: 'Movie director is required'
        });
    }

    next();
};

module.exports = {
    validateMovieCreateRequest
};
