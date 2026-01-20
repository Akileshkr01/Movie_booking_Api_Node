const Theatre = require('../models/theatre.model');

/**
 * Create a theatre
 */
const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err, code: 422 };
        }
        throw error;
    }
};

/**
 * Delete theatre by ID
 */
const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if (!response) {
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            };
        }
        return response;
    } catch (error) {
        return {
            err: "Invalid ID format or database error",
            code: 400
        };
    }
};

/**
 * Get theatre by ID
 */
const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            return {
                err: "No theatre found for the given id",
                code: 404
            };
        }
        return response;
    } catch (error) {
        return {
            err: "Invalid ID format or database error",
            code: 400
        };
    }
};

/**
 * Get all theatres with filters & pagination
 */
const getAllTheatres = async (data) => {
    try {
        const query = {};
        const options = {};

        // Filtering
        if (data?.city) query.city = data.city;
        if (data?.pincode) query.pincode = data.pincode;
        if (data?.name) query.name = data.name;

        // Pagination
        if (data?.limit) {
            options.limit = parseInt(data.limit, 10);
        }

        // skip is treated as page number
        if (data?.skip !== undefined) {
            const perPage = options.limit || 10;
            options.skip = parseInt(data.skip, 10) * perPage;
        }

        return await Theatre.find(query, null, options);
    } catch (error) {
        console.error("Error in getAllTheatres Service:", error);
        throw error;
    }
};

/**
 * Update theatre details
 */
const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return {
                err: "No theatre found for the given id",
                code: 404
            };
        }
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err, code: 422 };
        }

        if (error.name === 'CastError') {
            return { err: "Invalid Theatre ID format", code: 400 };
        }

        throw error;
    }
};

/**
 * Updates movies in a theatre's movies list.
 * Can either add or remove movies based on the `insert` flag.
 *
 * @param {String} theatreId - The ID of the theatre to update
 * @param {Array} movieIds - Array of movie IDs to add/remove
 * @param {Boolean} insert - If true, movies are added; if false, movies are removed
 * @returns {Object} - Updated theatre document or an error object
 */
const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
    try {
        // 1️ Check if the theatre exists
        const theatre = await Theatre.findById(theatreId);
        if (!theatre) {
            return {
                err: "No theatre found for the given id",
                code: 404
            };
        }

        // 2️ Prepare the update query based on insert/remove
        const updateQuery = insert
            ? { $addToSet: { movies: { $each: movieIds } } }  // Add movies
            : { $pull: { movies: { $in: movieIds } } };      // Remove movies

        // 3️ Perform the update and return the updated document
        const updatedTheatre = await Theatre.findByIdAndUpdate(
            theatreId,
            updateQuery,
            {
                new: true,          //  Return the updated theatre
                runValidators: true // Ensure valid data
            }
        ).populate('movies');       // Populate movies field for full objects

        // 4️ Return the updated theatre
        return updatedTheatre;

    } catch (error) {
        // 5️ Handle invalid IDs
        if (error.name === 'CastError') {
            return {
                err: "Invalid Theatre ID format",
                code: 400
            };
        }

        // 6️⃣ Log unexpected errors for debugging
        console.error("Error in updateMoviesInTheatre:", error);
        throw error;
    }
};


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatre
};
