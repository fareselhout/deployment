const {
    getAllUsersService,
    getUserByIDService,
    createUserService,
    updateUserService,
    deleteUserService
} = require("../models/user-model.js");

// Standardized response function 

const handelResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handelResponse(res, 200, "Users fetched successfully", users);
    }
    catch (err) {
        next(err);
    }
}

const getUserByID = async (req, res, next) => {
    try {
        const user = await getUserByIDService(req.params.id);
        if (!user) return handelResponse(res, 404, "User not found");
        handelResponse(res, 200, "User fetched successfully", user);
    }
    catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const newUser = await createUserService(name, email);
        handelResponse(res, 201, "User created successfully", newUser);
    }
    catch (err) {
        next(err);
    }

}
const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id, name, email);
        if (!updatedUser) return handelResponse(res, 404, "User not found");
        handelResponse(res, 201, "User updated successfully", updatedUser);
    }
    catch (err) {
        next(err);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) return handelResponse(res, 404, "User not found");
        handelResponse(res, 201, "User deleted successfully", deletedUser);
    }
    catch (err) {
        next(err);
    }
}


module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}