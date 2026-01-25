const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');

/**
 * Create Theatre
 */
const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if (response?.err) {
            return res.status(response.code || STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.CREATED).json({
            ...successResponseBody,
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

/**
 * Delete Theatre
 */
const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);

        if (response?.err) {
            return res.status(response.code || STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

/**
 * Get Single Theatre
 */
const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);

        if (response?.err) {
            return res.status(response.code || STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

/**
 * Get All Theatres
 */
const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatres(req.query);

        if (response?.err) {
            return res.status(response.code || STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response,
            message: "Successfully fetched all the theatres"
        });

    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: error.message
        });
    }
};

/**
 * Update Theatre
 */
const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(
            req.params.id,
            req.body
        );

        if (response?.err) {
            return res.status(response.code || STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

/**
 * Update Movies in Theatre
 */
const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );

        if (response?.err) {
            return res.status(response.code || STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

/**
 * Get Movies in a Theatre
 */
const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInAtheatre(req.params.id);

        if (response?.err) {
            return res.status(response.code || STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response,
            message: "Successfully fetched the movies for the theatre"
        });

    } catch (error) {
        console.error('Error in getMovies controller:', error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: error.message || 'Internal server error'
        });
    }
};

/**
 * Check Movie in Theatre
 */
const checkMovie = async (req, res) => {
    try {
        const { theatreId, movieId } = req.params;

        const response = await theatreService.checkMovieInATheatre(
            theatreId,
            movieId
        );

        if (response?.err) {
            return res.status(response.status || STATUS.BAD_REQUEST).json({
                success: false,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            success: true,
            message: "Successfully checked if movie is present in the theatre",
            data: {
                isMoviePresent: response.isMoviePresent
            }
        });

    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies,
    getMovies,
    checkMovie
};
