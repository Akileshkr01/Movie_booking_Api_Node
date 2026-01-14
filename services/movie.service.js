const Movie = require('../models/movie.model');

/**
 * Service to create a movie with Mongoose validation error handling
 */
const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

/**
 * Service to delete a movie by ID
 */
const deleteMovie = async (id) => {
    // findByIdAndDelete is more reliable for direct ID deletion
    const response = await Movie.findByIdAndDelete(id);
    return response;
}

/**
 * Service to fetch a single movie by ID with safety checks
 */
const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);
        
        // Safety check: Check if movie exists BEFORE accessing its properties
        if (!movie) {
            return {
                err: "No movie found for the corresponding id provided",
                code: 404
            };
        }
        
        console.log("Movie found successfully:", movie._id);
        return movie;
    } catch (err) {
        return {
            err: "Invalid ID format provided or database error",
            code: 400
        };
    }
}

/**
 * Service to update movie details
 */
const updateMovie = async (id, data) => {
    try {
        // { new: true } returns the updated document instead of the old one
        // { runValidators: true } ensures the update follows the Schema rules
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    } catch (error) {
        return {
            err: error.message,
            code: 400
        };
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie
};