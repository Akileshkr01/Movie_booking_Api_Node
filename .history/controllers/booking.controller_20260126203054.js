const {successResponseBody,errorResponseBody} = require('../utils/responseBody');
const bookingService = require('../services/booking.service');
const {STATUS} = require('../utils/constants');

const create = async(req,res) => {
    try {
        let userId = req.user;
        const response = bookingService.createBooking({...req.body,userId:userId});
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        return res.status
    } catch (error) {
        
    }
}