const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body);

        return res.status(201).json({
            ...successResponseBody,
            data: response,
            message: "Successfully registered a user"
        });

    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err
        }
        return res.status(400).json({
            ...errorResponseBody,
            err: error.message || error
        });
    }
};

module.exports = {
    signup
};
