// src/components/Cart.jsx

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { convertAndFormatPrice, convertUsdToInr } from '../utils/currencyUtils';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
    isCartOpen,
    toggleCart,
    loading,
    error,
  } = useContext(CartContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isCartOpen]);

  const handleClose = () => {
    setIsVisible(false);
    toggleCart();
  };

  useEffect(() => {
    if (!isVisible && isCartOpen) {
      // When visibility changes to false, start the timer to call toggleCart after transition
      const timer = setTimeout(() => {
        toggleCart();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, toggleCart, isCartOpen]);

  // Handle Esc key to close the cart
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isCartOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isCartOpen]);

  if (!isCartOpen && !isVisible) return null;

  // Determine the width and gradient color based on cart total
  const progressWidth =
    cartTotal >= 50 ? "100%" : `${(cartTotal / 50) * 100}%`;
  const progressGradient =
    cartTotal >= 50
      ? "bg-gradient-to-r from-[#D4FE4C] to-[#51A006]"
      : "bg-gradient-to-r from-[#0821D2] to-[#000000]";

  return (
    <div
      className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50"
      onClick={handleClose}
    >
      <div
        className={`bg-white w-[500px] flex flex-col h-full p-6 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-5xl font-bold italic uppercase quantico-bold-italic">
            MY CART
          </h2>
          <button onClick={handleClose} className="text-3xl focus:outline-none">
            <i className="fa-solid fa-xmark text-black"></i>
          </button>
        </div>

        {/* Free Shipping Progress Bar with Animation */}
        <div className="mb-6">
          <p className="text-black pt-sans-regular">
            {cartTotal >= 50
              ? "You're eligible for free shipping!"
              : "Nearly eligible for free shipping!"}
          </p>
          <div className="w-full bg-gray-300 rounded h-2 mt-2 overflow-hidden">
            <div
              className={`h-2 rounded transition-all duration-700 ease-out ${progressGradient}`}
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-center text-black pt-sans-regular">
                Your cart is empty
              </p>
              <Link to="/products">
                <button className="uppercase quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.variant}-${item.packaging}`}
                className="flex items-start bg-gradient-to-r from-[#FFFFFF] to-[#E6E6E6] rounded-lg p-4 shadow-md"
              >
                <div
                  className="w-24 h-24 flex-shrink-0 rounded flex items-center justify-center"
                  style={{ backgroundColor: "#A4E542" }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1 ml-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold nimbusL-bol uppercase">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold">
                      {convertAndFormatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <p className="text-sm text-black pt-sans-regular font-bold mt-1">
                    {item.quantity}x {item.variant} ({item.packaging})
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.variant,
                            item.packaging,
                            -1
                          )
                        }
                        className="px-3 py-1 border border-purple-500 text-purple-500 hover:bg-purple-100 focus:outline-none"
                        aria-label="Decrease Quantity"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="px-4 py-1 border border-purple-500 text-purple-500 text-lg quantico-bold-italic">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.variant,
                            item.packaging,
                            1
                          )
                        }
                        className="px-3 py-1 border border-purple-500 text-purple-500 hover:bg-purple-100 focus:outline-none"
                        aria-label="Increase Quantity"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          removeFromCart(item.product._id, item.variant, item.packaging)
                        }
                        className="text-purple-500 hover:text-purple-700 focus:outline-none"
                        aria-label="Remove Item"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="bottom-checkout p-4 mt-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex justify-between items-center mb-6">
              <p className="text-black pt-sans-bold font-bold">
                {cartItems.length} item{cartItems.length !== 1 && "s"}
              </p>
              <p className="text-xl font-bold pt-sans-regular">
                Cart Total:{" "}
                <span className="quantico-bold">{convertAndFormatPrice(cartTotal)}</span>
              </p>
            </div>
            <Link to="/checkout">
              <button className="mt-6 uppercase w-full quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                Checkout
              </button>
            </Link>
            <div className="learn-more mt-4 w-full">
              <button
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl w-full uppercase"
                type="button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
