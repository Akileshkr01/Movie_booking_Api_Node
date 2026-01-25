const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const signup = async (req,res) => {
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully registered a user";
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(error)
    }
}
