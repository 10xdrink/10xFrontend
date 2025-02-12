// src/seeds/seedProducts.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const productsData = require('../components/productDummyData/Data.Dummy');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB Connected for Seeding');
    await Product.deleteMany(); // Clear existing products

    // Add accordion data to each product if not already present
    const productsWithAccordion = productsData.map(product => ({
      ...product,
      accordion: {
        details: "This is detailed information about the product.",
        shipping: "Shipping details go here.",
        returns: "Return policy details go here.",
      },
      isActive: true, // Ensure products are active upon seeding
      createdAt: new Date(),
    }));

    await Product.insertMany(productsWithAccordion);
    console.log('Products Seeded Successfully');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
