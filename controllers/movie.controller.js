const movieService = require('../services/movie.service'); 
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');

const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body);
        
        // Check if service returned a validation error object
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
        // Pass only the ID string as expected by your service
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

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie
};