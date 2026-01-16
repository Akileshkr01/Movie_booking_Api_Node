const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        // Handle Mongoose Schema Validation errors
        if (error.name === 'ValidationError') {
            let err = {};
            // Fixed: Ensuring 'key' is used consistently
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err: err, code: 422 };
        }
        
        console.error("Error in Theatre Service:", error);
        throw error; // Let the controller catch other types of errors
    }
};

module.exports = {
    createTheatre 
};
