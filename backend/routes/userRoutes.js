import {Router} from "express";
import { createUser, loginUser, logoutUser, getAllUsers,getCurrentUserProfile, updateCurrentUserProfile,deleteUserById,getUserById, updateUserById } from "../controllers/userController.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"

const router = Router()

router.route("/").post(createUser).get(authenticate,authorizeAdmin, getAllUsers);

// http://localhost:5000/api/users/login [FROM FE CHECK usersApiSlice file]

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

//Admin Routes
router.route("/:id")
.delete(authenticate,authorizeAdmin, deleteUserById)
.get(authenticate,authorizeAdmin, getUserById)
.put(authenticate,authorizeAdmin, updateUserById)

export default router;