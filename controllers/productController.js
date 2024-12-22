const Product = require('../models/Product'); // Import the Product model
const Review = require('../models/Review'); 
// Display all products
const handleProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('productManagement', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
};


// Home Products route
const homeProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Fetch all reviews
    const reviews = await Review.find();  // Fetch all reviews from the database

    // Render the home page and pass both products and reviews
    res.render('home', { products, reviews });
  } catch (error) {
    console.error('Error fetching products or reviews:', error);
    res.status(500).send('Error fetching products or reviews');
  }
};


// Display details of a specific product
const productdetail = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('productDetails', { product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).send('Server error');
  }
};

// Render the product management page
const productmanagement = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('productManagement', { products });
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).send('Error loading products');
  }
};

// Add a product
const productupdate = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, image,buyLink } = req.body;

    await Product.findByIdAndUpdate(productId, { name, description, price, image,buyLink });

    res.redirect('/products'); // Redirect to the product list page
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Server error');
  }
};
const productAdd = async (req, res) => {
  try {
    const { name, description, price, image,buyLink } = req.body;

    // Create a new product and save it to the database
    const newProduct = new Product({ name, description, price, image,buyLink});
    await newProduct.save();

    res.redirect('/products'); // Redirect to the product management page
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product');
  }
};
// Delete a product
const productdelete = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);

    res.redirect('/products'); // Redirect to the product list page
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  handleProducts,
  productdetail,
  productmanagement,
  productupdate,
  productdelete,
  productAdd,
  homeProducts
};
