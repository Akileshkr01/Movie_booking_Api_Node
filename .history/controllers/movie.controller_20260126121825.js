const movieService = require('../services/movie.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');

const createMovie = async (req, res) => {
    try {
        const movie = await movieService.createMovie(req.body);

        return res.status(STATUS.CREATED).json({
            ...successResponseBody,
            data: movie,
            message: 'Successfully created a new movie'
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: movie
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await movieService.deleteMovie(req.params.id);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: movie,
            message: 'Successfully deleted the movie'
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const updateMovie = async (req, res) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, req.body);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: movie,
            message: "Successfully updated the movie"
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await movieService.fetchMovies(req.query);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: movies
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
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
