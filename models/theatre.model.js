const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true
        },

       
        movies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie'
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Theatre', theatreSchema);
