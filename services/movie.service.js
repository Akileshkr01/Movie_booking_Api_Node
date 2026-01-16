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
    const response = await Movie.findByIdAndDelete(id);
    return response;
}

/**
 * Service to fetch a single movie by ID with safety checks
 */
const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);
        
        if (!movie) {
            return {
                err: "No movie found for the corresponding id provided",
                code: 404
            };
        }
        
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
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    } catch (error) {
        return {
            err: error.message,
            code: 400
        };
    }
} 

/**
 * Service to fetch movies based on filters
 */
const fetchMovies = async (filter) => {
    try {
        let query = {};
        if (filter.name) {
            // Using regex makes searching more user-friendly (case-insensitive)
            query.name = { $regex: filter.name, $options: 'i' };
        }
        
        const movies = await Movie.find(query);

        // Check for empty array
        if (!movies || movies.length === 0) {
            return {
                err: 'Not able to find the queried movies',
                code: 404 // FIXED: Added comma above this line
            };
        }
        return movies; 
    } catch (error) {
        return {
            err: error.message,
            code: 500
        };
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie,
    fetchMovies
};