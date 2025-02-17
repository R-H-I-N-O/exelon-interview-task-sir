const Product = require('../models/Product');

// create a new product in the db
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);    
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get product details from the db
const getProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, sortBy } = req.query;
    const filter = {};
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    const sort = {};
    if (sortBy) sort[sortBy] = 1;

    const products = await Product.find(filter).sort(sort);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// updating product from the db
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// deleting product from the db. 
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };