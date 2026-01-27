const Show = require('../models/show.model');
const {STATUS} = require('../utils/constants');

const createShow = async (data) => {
    try {
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            
        }
    }
}
