import asyncHandler from "../middlewares/asyncHandler.js";
import { Product } from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    //we are using formidable thats why fields in here insted of body
    const { name, description, price, category, quantity, brand } = req.fields;

    //check validation

    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });

      case !description:
        return res.json({ error: "Description is required." });

      case !price:
        return res.json({ error: "Price is required." });

      case !category:
        return res.json({ error: "Category is required." });

      case !quantity:
        return res.json({ error: "Quantity is required." });

      case !brand:
        return res.json({ error: "Brand is required." });
    }

    const product = await Product.create({ ...req.fields });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });

      case !description:
        return res.json({ error: "Description is required." });

      case !price:
        return res.json({ error: "Price is required." });

      case !category:
        return res.json({ error: "Category is required." });

      case !quantity:
        return res.json({ error: "Quantity is required." });

      case !brand:
        return res.json({ error: "Brand is required." });
    }

    //.id is cause we provided id in route of update
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    console.log("Updated Product:", product);

    //removed save call
    // await product.save();

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    //countDocuments to count how many products match the keyword filter (if any).
    const count = await Product.countDocuments({ ...keyword });
    //only 6 products will be visible to frontend by limit and pageSize
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      //The total number of pages, calculated by dividing the total product count by pageSize
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(400);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      //comparing the user field in each review (which is an ObjectId) to the current user's ID. The toString() method is used to compare the ObjectIds as strings.
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product is already reviewed.");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      //The total number of reviews (product.numReviews) is updated based on the length of the reviews array.
      product.numReviews = product.reviews.length;

      //This is for getting overall/average rating of the product
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added successfully." });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
});

const filteredProducts = asyncHandler(async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;

    if (radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args);
    res.json(products);

  } catch (error) {
    console.error('Error fetching filtered products:', error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filteredProducts,
};
