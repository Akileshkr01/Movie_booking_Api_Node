 const showService = require('../services/show.service');
 const {successResponseBody , errorResponseBody} = require('../utils/responseBody');
 const {STATUS} = require('../utils/constants');

 const create = async (req,res) => {
    try {
        const response = wawit showService.createShow(req.body);
        successResponseBody.message = "Successfully created the show";
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err){
            
        }
    }
 }