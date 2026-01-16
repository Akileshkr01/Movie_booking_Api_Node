const Theatre = require('../models/theatre.model');

/**
 * Creates a new theatre
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
 * Deletes a theatre by ID
 * Format matched to getTheatre
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
 * Fetches a single theatre by ID
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

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre
};