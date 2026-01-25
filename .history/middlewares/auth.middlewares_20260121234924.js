const {errorResponseBody} = require('../utils/responseBody');


const validateSignupRequest = async (req,res,next) => {
    //validate name of the user
    if(!req.body.name){
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    //
}







module.exports = {

}