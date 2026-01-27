const {STATUS} = require('../utils/constants');
const {errorResponseBody} = require('../utils/responseBody');

const validateCreateShowRequest = async (req,res,next) => {
    // validate theatre id 
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate timing presence 
    if(!req.body.timing){
        errorResponseBody.err = "No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate noOfseats presence
    if(!req.body.noOfSeats){
        errorResponseBody.err ="No seat info provided";
        return res.status(status.BAD_REQUEST).json(errorResponseBody);
    }
    //validate price presence
    if(!req.body.price){
        errorResponseBody.err = ""
    }
}

