const Movie = require('../models/movie.model');

/**
 * 
 * @param  data ->object containing details of the new movie to be deleted
 * @returns -> returns the new movie obhject created
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
 * 
 * @param  id -> id which will be used to identify the movie to be deleted
 * @returns ->object containing details  of the movie deleted
 */
const deleteMovie = async (id) => {
    try {
       const response = await Movie.findByIdAndDelete(id);
       if(!response){
        return{
            err: "No movie record found for the id provided",
            code:404
        }
       }
    return response; 
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    
}

/**
 * 
 * @param id -> id which will be used to identify the movie to be fetched
 * @returns -> object containing movie fetched
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
 * 
 * @param  id -> id which will be used to identify the movie to be updated
 * @param  data -> object that contains actual data which is to be updated in the db
 * @returns -> returns the new updated movie details
 */

const updateMovie = async (id, data) => {
    try {
        // new: true returns the updated document instead of the old one
        // runValidators: true ensures the update follows the Schema rules
        const movie = await Movie.findByIdAndUpdate(id, data, { 
            new: true, 
            runValidators: true 
        });

        // FIXED: Handle case where ID is valid format but movie doesn't exist
        if (!movie) {
            return {
                err: "No movie found for the given ID",
                code: 404
            };
        }

        return movie;
    } catch (error) {
        // Handle Mongoose Schema Validation errors (e.g., empty required fields)
        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            
            return {
                err: err, // FIXED: Return the specific field errors
                code: 422 // Using 422 (Unprocessable Entity) for validation
            };
        }

        // Handle CastError (Invalid ID format)
        if (error.name === 'CastError') {
            return {
                err: "Invalid ID format provided",
                code: 400
            };
        }

        console.error("Internal Service Error:", error);
        throw error;
    }
};

/**
 * 
 * @param  filter -> filter will help us in filtering  out data based on the conditionals it contains
 * @returns -> returns an object containing all the movies fetched based on the filter
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