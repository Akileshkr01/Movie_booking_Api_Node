const userService = require("../services/user.service");
const {errorResponseBody,successResponseBody} = require('../utils/responseBody');
const{} = require('../utils/constants')
/**
 * Update user role or status - requires admin authentication
 */
const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await userService.updateUserRoleOrStatus(
            updateData,
            userId
        );

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: "Successfully updated the user",
            data: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        
        return res.status(error.statusCode || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            message: error.message || "Update failed",
            err: error.details || {}
        });
    }
};

module.exports = {
    update
};
