const Theatre = require('../models/theatre.model');

/**
 * 
 * @param  data -> object containing details of the theatre to be created  
 * @returns  -> object with the new theatre details
 */
const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err: err, code: 422 };
        }
        throw error;
    }
};

/**
 * 
 * @param  id  -> the unique id using which we can identify the thatre to be deleted
 * @returns -> returns the deleted theatre object
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
 * 
 * @param  id  -> it is the unique _id based on which we will fetch a movie
 * @returns 
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
 * 
 * @param data -> the data to be used to filter out theatres based on the city /pincode 
 * @returns -> returns an object with the filtered content of theatres
 */
const getAllTheatres = async (data) => {
    try {
        let query = {};
        let options = {};

        // 1. Dynamic Filtering
        if (data?.city) query.city = data.city;
        if (data?.pincode) query.pincode = data.pincode;
        if (data?.name) query.name = data.name;

        // 2. Pagination Logic
        if (data?.limit) {
            options.limit = parseInt(data.limit);
        }

        if (data?.skip !== undefined) {
            // Default to 10 per page if limit is missing
            const perPage = options.limit || 10; 
            options.skip = parseInt(data.skip) * perPage;
        }

        // find(filter, projection, options)
        const response = await Theatre.find(query, null, options);
        return response;
    } catch (error) {
        console.error("Error in getAllTheatres Service:", error);
        throw error;
    }
};

/**
 * 
 * @param  id  -> the unique id to identify the theatre to be updated
 * @param  data -> data  object  to be used to update the theatre
 * @returns  -> it returns the new updated theatre object
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
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message; // Fixed property access
            });
            return { err, code: 422 }; // Ensure this is returned!
        }
        
        // Handle Invalid ID format
        if (error.name === 'CastError') {
            return { err: "Invalid Theatre ID format", code: 400 };
        }

        throw error;
    }
};

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre
};