import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import { addProduct, updateProduct,removeProduct, fetchProducts } from "../controllers/productController.js";

router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, formidable(), removeProduct)

export default router;
