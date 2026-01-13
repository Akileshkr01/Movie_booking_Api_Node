const Movie = require('../models/movie.model');
const movieService = require('../services/movie.service'); 

const errorResponseBody = {
    err: {},
    data: {},
    message: "Something went wrong",
    success: false
};

const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully processed the request",
    success: true
};

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            ...successResponseBody,
            data: movie,
            message: 'Successfully created a new movie'
        });
    } catch (err) {
        return res.status(500).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const response = await movieService.getMovieById(req.params.id);
        
        if (response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(200).json({
            ...successResponseBody,
            data: response
        });
    } catch (err) {
        return res.status(500).json(errorResponseBody);
    }
};

const deleteMovie = async (req, res) => {
    try {
        const response = await Movie.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully deleted the movie'
        });
    } catch (err) {
        return res.status(500).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

module.exports = {
    createMovie,
    getMovie,
    deleteMovie
};