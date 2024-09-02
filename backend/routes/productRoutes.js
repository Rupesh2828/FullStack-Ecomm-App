import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filteredProducts
} from "../controllers/productController.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, checkId, addProductReview);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)  
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, formidable(), removeProduct);

router.route("/filtered-products").post(filteredProducts)  

export default router;
