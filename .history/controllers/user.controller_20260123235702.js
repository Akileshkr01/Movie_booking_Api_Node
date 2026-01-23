const userService = require("../services/user.service");
const { successResponseBody, errorResponseBody } = require("../utils/responseBody");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ ...successResponseBody, message: "Fetched all users", data: users });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ...errorResponseBody, message: error.message || "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ ...successResponseBody, message: "Fetched user by ID", data: user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ...errorResponseBody, message: error.message || "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUserRoleOrStatus(req.body, req.params.id);
    res.status(200).json({ ...successResponseBody, message: "Updated user successfully", data: updated });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ...errorResponseBody, message: error.message || "Failed to update user" });
  }
};

module.exports = { getUsers, getUserById, updateUser };
