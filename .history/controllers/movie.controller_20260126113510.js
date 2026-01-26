const movieService = require('../services/movie.service'); 
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const {} = require('../')
const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body);
        
        if (response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err,
                message: "Validation failed on a few parameters of the request body"
            });
        } 

        return res.status(201).json({
            ...successResponseBody,
            data: response,
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
        return res.status(500).json({
            ...errorResponseBody,
            err: err.message
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);
        
        if (!response) {
            return res.status(404).json({
                ...errorResponseBody,
                message: "Movie not found to delete"
            });
        }

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

const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovie(req.params.id, req.body);
        
        if (response.err) {
            return res.status(response.code || 400).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully updated the movie"
        });
    } catch (err) {
        return res.status(500).json({
            ...errorResponseBody,
            err: err.message
        });
    }
}

const getMovies = async (req, res) => {
    try {
        // FIXED: Corrected the service call path
        const response = await movieService.fetchMovies(req.query);
        
        if (response.err) {
            return res.status(response.code || 500).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        // FIXED: Used spread operator to avoid global object mutation
        return res.status(200).json({
            ...successResponseBody,
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
}

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getMovies 
};