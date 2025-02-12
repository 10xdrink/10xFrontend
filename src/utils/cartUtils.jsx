// src/utils/cartUtils.js

export const getCartId = () => {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = `cart_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  };
  