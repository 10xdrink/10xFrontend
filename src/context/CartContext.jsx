// src/context/CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext); // Consume AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Optional: To store error messages


  const isAuthenticated = !!user;

  // Fetch cart whenever the user changes and is authenticated
  useEffect(() => {
    if (authLoading) {
      console.log('Auth is loading. Waiting to fetch cart...');
      return;
    }

    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartTotal(0);
      console.log('User not authenticated. Cart is empty.');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, authLoading]);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  // Function to fetch cart items from the backend
  const fetchCart = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get('/cart');
      if (response.data) {
        // Depending on your API response structure, adjust accordingly
        if (response.data.items) {
          setCartItems(response.data.items);
          console.log('Fetched cart items:', response.data.items);
        } else if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
          console.log('Fetched cart items (alternative key):', response.data.cartItems);
        } else {
          // If the API returns a different structure or confirmation message
          console.log('Cart fetched successfully, but no items found.');
          setCartItems([]);
          setCartTotal(0);
        }

        if (response.data.totalAmount !== undefined) {
          setCartTotal(response.data.totalAmount);
          console.log('Cart total set to:', response.data.totalAmount);
        } else if (response.data.total !== undefined) {
          setCartTotal(response.data.total);
          console.log('Cart total set to (alternative key):', response.data.total);
        } else {
          // Calculate total from items if not provided
          const calculatedTotal = response.data.items
            ? response.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : 0;
          setCartTotal(calculatedTotal);
          console.log('Cart total calculated:', calculatedTotal);
        }
      } else {
        throw new Error('Cart data not found in response.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCartItems([]);
        setCartTotal(0);
        console.log('Cart not found, initializing empty cart.');
      } else if (error.response && error.response.status === 401) {
        // Unauthorized access - token might be invalid or expired
        setCartItems([]);
        setCartTotal(0);
        setError('Session expired. Please log in again.');
        console.log('Unauthorized access. Clearing cart.');
      } else {
        console.error('Failed to fetch cart:', error);
        // setError('Your Cart is empty.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to add an item to the cart
  const addToCart = async (item) => {
    if (!isAuthenticated) {
      console.log('Add to Cart Attempt: User not authenticated.');
      setError('Please log in or sign up to add items to the cart.');
      return;
    }

    setError(null); // Reset error state
    try {
      // Log the item being added for debugging
      console.log('Adding to cart:', item);

      const response = await api.post('/cart/add', {
        productId: item.id, // Assuming 'item.id' is the product ID
        variant: item.variant,
        packaging: item.packaging, // Ensure this is a string
        quantity: item.quantity,
      });

      if (response.data) {
        // Update cartItems based on response
        if (response.data.items) {
          setCartItems(response.data.items);
          console.log('Item added to cart:', response.data.items);
        } else if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
          console.log('Item added to cart (alternative key):', response.data.cartItems);
        } else {
          // If the API returns a success message without items
          console.log('Item added successfully, but no cart items returned.');
          // Optionally, refetch the cart
          await fetchCart();
        }

        if (response.data.totalAmount !== undefined) {
          setCartTotal(response.data.totalAmount);
          console.log('Cart total set to:', response.data.totalAmount);
        } else if (response.data.total !== undefined) {
          setCartTotal(response.data.total);
          console.log('Cart total set to (alternative key):', response.data.total);
        } else {
          // Calculate total from items if not provided
          const calculatedTotal = response.data.items
            ? response.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : cartTotal;
          setCartTotal(calculatedTotal);
          console.log('Cart total calculated:', calculatedTotal);
        }
      } else {
        throw new Error('Cart data not found in response after adding item.');
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
        console.log('Unauthorized access while adding to cart.');
      } else {
        setError(error.response?.data?.message || 'Failed to add item.');
      }
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (productId, variant, packaging, delta) => {
    if (!isAuthenticated) {
      console.log('Update Quantity Attempt: User not authenticated.');
      setError('Please log in or sign up to update cart items.');
      return;
    }

    setError(null); // Reset error state
    try {
      // Find the current item using the correct product ID from the populated product object
      const currentItem = cartItems.find(
        (item) =>
          item.product &&
          item.product._id.toString() === productId &&
          item.variant === variant &&
          item.packaging === packaging
      );

      if (!currentItem) {
        console.error('Item not found in cart:', { productId, variant, packaging });
        setError('Item not found in cart.');
        return;
      }

      const newQuantity = currentItem.quantity + delta;
      console.log(
        `Updating quantity for item: ${productId}, variant: ${variant}, packaging: ${packaging}, delta: ${delta}, newQuantity: ${newQuantity}`
      );

      if (newQuantity < 1) {
        // Optionally, remove the item if quantity drops below 1
        await removeFromCart(productId, variant, packaging);
        return;
      }

      const response = await api.put('/cart/update', {
        productId: productId,
        variant: variant,
        packaging: packaging, // Send packaging
        quantity: newQuantity,
      });

      if (response.data) {
        // Update cartItems based on response
        if (response.data.items) {
          setCartItems(response.data.items);
          console.log('Cart updated:', response.data.items);
        } else if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
          console.log('Cart updated (alternative key):', response.data.cartItems);
        } else {
          // If the API returns a success message without items
          console.log('Cart updated successfully, but no cart items returned.');
          // Optionally, refetch the cart
          await fetchCart();
        }

        if (response.data.totalAmount !== undefined) {
          setCartTotal(response.data.totalAmount);
          console.log('Cart total set to:', response.data.totalAmount);
        } else if (response.data.total !== undefined) {
          setCartTotal(response.data.total);
          console.log('Cart total set to (alternative key):', response.data.total);
        } else {
          // Calculate total from items if not provided
          const calculatedTotal = response.data.items
            ? response.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : cartTotal;
          setCartTotal(calculatedTotal);
          console.log('Cart total calculated:', calculatedTotal);
        }
      } else {
        throw new Error('Cart data not found in response after updating quantity.');
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
        console.log('Unauthorized access while updating cart.');
      } else {
        setError(error.response?.data?.message || 'Failed to update cart.');
      }
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (productId, variant, packaging) => {
    if (!isAuthenticated) {
      console.log('Remove from Cart Attempt: User not authenticated.');
      setError('Please log in or sign up to remove items from the cart.');
      return;
    }

    setError(null); // Reset error state
    try {
      console.log(`Removing from cart: productId=${productId}, variant=${variant}, packaging=${packaging}`);
      const response = await api.delete('/cart/remove', {
        data: { productId: productId, variant, packaging },
      });

      if (response.data) {
        // Update cartItems based on response
        if (response.data.items) {
          setCartItems(response.data.items);
          console.log('Item removed from cart:', response.data.items);
        } else if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
          console.log('Item removed from cart (alternative key):', response.data.cartItems);
        } else {
          // If the API returns a success message without items
          console.log('Item removed successfully, but no cart items returned.');
          // Optionally, refetch the cart
          await fetchCart();
        }

        if (response.data.totalAmount !== undefined) {
          setCartTotal(response.data.totalAmount);
          console.log('Cart total set to:', response.data.totalAmount);
        } else if (response.data.total !== undefined) {
          setCartTotal(response.data.total);
          console.log('Cart total set to (alternative key):', response.data.total);
        } else {
          // Calculate total from items if not provided
          const calculatedTotal = response.data.items
            ? response.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : cartTotal;
          setCartTotal(calculatedTotal);
          console.log('Cart total calculated:', calculatedTotal);
        }
      } else {
        throw new Error('Cart data not found in response after removing item.');
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
        console.log('Unauthorized access while removing from cart.');
      } else {
        setError(error.response?.data?.message || 'Failed to remove item.');
      }
    }
  };

  // Function to clear all items from the cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      console.log('Clear Cart Attempt: User not authenticated.');
      setError('Please log in or sign up to clear the cart.');
      return;
    }

    setError(null); // Reset error state
    try {
      console.log('Clearing the cart.');
      const response = await api.delete('/cart/clear');

      if (response.data) {
        // Depending on your API response structure, adjust accordingly
        // If the API confirms the cart is cleared without returning items
        setCartItems([]);
        setCartTotal(0);
        console.log('Cart cleared.');

        // Optionally, if the API returns confirmation, handle it
        if (response.data.message) {
          console.log('Clear cart message:', response.data.message);
        }
      } else {
        // If the API doesn't return data, assume success
        setCartItems([]);
        setCartTotal(0);
        console.log('Cart cleared successfully without response data.');
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
        console.log('Unauthorized access while clearing cart.');
      } else {
        setError(error.response?.data?.message || 'Failed to clear cart.');
      }
    }
  };

  // Function to clear all items from the cart with confirmation
  const confirmClearCart = async () => {
    const confirmed = window.confirm('Are you sure you want to clear the cart?');
    if (confirmed) {
      await clearCart();
    }
  };

  // Function to toggle the visibility of the cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        confirmClearCart, // Provide the confirmation function
        cartTotal,
        isCartOpen,
        toggleCart,
        loading,
        error, // Optional: Provide error state to consumers
      }}
    >
      {children}
    </CartContext.Provider>
  );
};