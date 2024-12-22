const express = require('express');
const productController = require('../controllers/productController'); // Correct import
const router = express.Router();

// CRUD routes for products
router.get('/products', productController.handleProducts); // List all products
router.get('/products/:id', productController.productdetail); // View a single product's details
router.get('/product-management', productController.productmanagement); // Manage products
router.post('/products', productController.productAdd); // Change route to match the form action
router.post('/products/update/:id', productController.productupdate); // Update a product
router.post('/products/delete/:id', productController.productdelete); // Delete a product

module.exports = router;
