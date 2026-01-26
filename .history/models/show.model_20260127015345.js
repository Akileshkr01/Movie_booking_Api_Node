const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    theatreId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    movieId: {
        type
    }
})