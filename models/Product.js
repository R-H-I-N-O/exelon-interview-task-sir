const mongoose = require("mongoose");

// create schema for product
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    ratings: {
        type: Number,
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;