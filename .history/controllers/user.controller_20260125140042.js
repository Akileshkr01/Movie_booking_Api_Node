const userService = require("../services/user.service");
const {errorResponseBody,su} = require('../utils/responseBody');

const update = async (req, res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(
            req.body,
            req.params.id
        );

        return res.status(200).json({
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

        return res.status(500).json({
            success: false,
            err: "Internal Server Error",
            data: {}
        });
    }
};

module.exports = {
    update
};
