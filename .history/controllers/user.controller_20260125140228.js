const userService = require("../services/user.service");
const {errorResponseBody,successResponseBody} = require('../utils/responseBody');
const{} = require('../utils/constants')
const update = async (req, res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(
            req.body,
            req.params.id
        );

        return res.status(STATUS.OK).json({
            success: true,
            message: "Successfully updated the user",
            data: response
        });

    } catch (error) {
        if (error.err) {
            return res.status(error.code || 400).json({
                success: false,
                err: error.err,
                data: {}
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: "Internal Server Error",
            data: {}
        });
    }
};

module.exports = {
    update
};
