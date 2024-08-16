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
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)

    res.json(product)

  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchProducts = asyncHandler(async(req, res) => {
  
  try {

    const product = await Product.find({})

    res.json(product)
    
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
    
  }

})

export { addProduct, updateProduct, removeProduct , fetchProducts};
