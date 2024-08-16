import express from "express";
const router = express.Router()

import { createCategory, updateCategory, deleteCategory, listCategory, getCategoryById } from "../controllers/categoryController.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"

router.route("/").post(authenticate,authorizeAdmin,createCategory)
router.route("/categories").get(listCategory)
router.route("/:categoryId").put(authenticate,authorizeAdmin, updateCategory )
router.route("/:categoryId").delete(authenticate,authorizeAdmin,deleteCategory)
router.route("/:id").get(getCategoryById)

export default router;