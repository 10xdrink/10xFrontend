// src/context/ProductContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getProducts, getProductById } from '../utils/api';
import { toast } from 'react-toastify'; // Optional: For user notifications

// Create the ProductContext
export const ProductContext = createContext();

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  // State to hold all products
  const [products, setProducts] = useState([]);

  // State to hold individual product details
  const [productDetails, setProductDetails] = useState({});

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all products from the backend.
   */
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again later.');
      toast.error('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch a single product by ID from the backend.
   *
   * @param {string} id - The ID of the product to fetch.
   */
  const fetchProduct = async (id) => {
    // Check if product details are already fetched
    if (productDetails[id]) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [id]: data,
      }));
    } catch (err) {
      console.error(`Failed to fetch product with ID ${id}:`, err);
      setError('Failed to load product details. Please try again later.');
      toast.error('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Optionally, you can add more functions here for creating, updating,
   * or deleting products if your backend supports these operations.
   */

  // Fetch all products when the provider mounts
  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        loading,
        error,
        fetchAllProducts,
        fetchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
