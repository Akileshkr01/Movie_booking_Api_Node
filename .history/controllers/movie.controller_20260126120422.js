const movieService = require('../services/movie.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');

const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body);

        if (response.err) {
            return res.status(response.code || STATUS.UNPROCESSABLE_ENTITY).json({
                ...errorResponseBody,
                err: response.err,
                message: "Validation failed on a few parameters of the request body"
            });
        }

        return res.status(STATUS.CREATED).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully created a new movie'
        });
    } catch (err) {

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json()
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const response = await movieService.getMovieById(req.params.id);

        if (response.err) {
            return res.status(response.code || STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });
    } catch (err) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);

        if (!response) {
            return res.status(STATUS.NOT_FOUND).json({
                ...errorResponseBody,
                message: "Movie not found to delete"
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully deleted the movie'
        });
    } catch (err) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovie(req.params.id, req.body);

        if (response.err) {
            return res.status(response.code || STATUS.BAD_REQUEST).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response,
            message: "Successfully updated the movie"
        });
    } catch (err) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const getMovies = async (req, res) => {
    try {
        const response = await movieService.fetchMovies(req.query);

        if (response.err) {
            return res.status(response.code || STATUS.INTERNAL_SERVER_ERROR).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: response
        });
    } catch (err) {
        console.error(err);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getMovies
};
