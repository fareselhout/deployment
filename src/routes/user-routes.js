const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user-controller.js");
const validateUser = require("../middlewares/input-validator.js");
const ROLES_LIST = require("../config/roles_list.js");
const verifyRoles = require("../middlewares/verify-roles.js");

router.get("/user", getAllUsers);
router.get("/user/:id", getUserByID);
router.post("/user", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateUser, createUser);
router.put("/user/:id", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateUser, updateUser);
router.delete("/user/:id", verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;