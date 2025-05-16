// src/components/OrderDetailsModal.jsx

import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { convertAndFormatPrice } from '../utils/currencyUtils';

/**
 * OrderDetailsModal Component
 * Displays detailed information about a specific order in a modal.
 *
 * @param {Object} props - Component props
 * @param {Object} props.order - Order details
 * @param {Function} props.onClose - Function to close the modal
 *
 * @returns {JSX.Element} The rendered component
 */
const OrderDetailsModal = ({ order, onClose }) => {
  const modalRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Handle Esc key to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  // Handle click outside to close the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn"
      aria-modal="true"
      role="dialog"
      aria-labelledby="order-details-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-full overflow-y-auto transform transition-transform duration-300 scale-100"
        role="document"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-black to-[#0821D2] rounded-t-lg">
          <h2
            id="order-details-title"
            className="text-2xl font-bold text-white quantico-bold-italic"
          >
            Order Number - {order.orderNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Information */}
          <section aria-labelledby="order-info-title">
            <h3
              id="order-info-title"
              className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
            >
              Order Information
            </h3>
            <div className="space-y-3 quantico-regular text-lg text-gray-700">
              <p>
                <strong>Date:</strong> {format(new Date(order.createdAt), 'PPP')}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm quantico-bold-italic ${
                    order.status === 'delivered'
                      ? 'bg-green-600'
                      : order.status === 'processing' || order.status === 'shipped'
                      ? 'bg-blue-600'
                      : order.status === 'cancelled' || order.status === 'refunded'
                      ? 'bg-red-600'
                      : 'bg-yellow-600'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus.toUpperCase()}
              </p>
            </div>
          </section>

          {/* Items */}
          <section aria-labelledby="order-items-title">
            <h3
              id="order-items-title"
              className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
            >
              Items
            </h3>
            {order.items.length > 1 ? (
              <div className="relative">
                {/* Navigation Buttons */}
                <button
                  ref={prevRef}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-black to-[#0821D2] text-white p-2 rounded-full shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-[#0821D2] z-10"
                  aria-label="Previous Slide"
                >
                  &#8249;
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-[#0821D2] to-black text-white p-2 rounded-full shadow-md hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-[#0821D2] z-10"
                  aria-label="Next Slide"
                >
                  &#8250;
                </button>

                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  className="mySwiper"
                >
                  {order.items.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Product Image */}
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-full md:w-24 h-24 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
                        />

                        {/* Product Details */}
                        <div className="flex-1 quantico-regular text-lg text-gray-700">
                          <h4 className="font-semibold text-gray-800">{item.product.title}</h4>
                          {/* Horizontal Arrangement of Quantity, Variant, Packaging */}
                          <div className="flex flex-wrap space-x-4 mt-2 text-sm text-gray-600">
                            <span>
                              <strong>Quantity:</strong> {item.quantity}
                            </span>
                            <span>
                              <strong>Variant:</strong> {item.variant}
                            </span>
                            <span>
                              <strong>Packaging:</strong> {item.packaging}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="quantico-regular text-lg text-gray-700 mt-4 md:mt-0">
                          {convertAndFormatPrice((item.price || 0) * (item.quantity || 1))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Pagination Dots */}
                <div className="mt-4 flex justify-center">
                  {/* Swiper Pagination is already handled by Swiper's pagination prop */}
                </div>
              </div>
            ) : (
              <ul className="space-y-6">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
                    />

                    {/* Product Details */}
                    <div className="flex-1 quantico-regular text-lg text-gray-700">
                      <h4 className="font-semibold text-gray-800">{item.product.title}</h4>
                      {/* Horizontal Arrangement of Quantity, Variant, Packaging */}
                      <div className="flex flex-wrap space-x-4 mt-2 text-sm text-gray-600">
                        <span>
                          <strong>Quantity:</strong> {item.quantity}
                        </span>
                        <span>
                          <strong>Variant:</strong> {item.variant}
                        </span>
                        <span>
                          <strong>Packaging:</strong> {item.packaging}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="quantico-regular text-lg text-gray-700 mt-4 md:mt-0">
                      {convertAndFormatPrice((item.price || 0) * (item.quantity || 1))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Shipping Address */}
          <section aria-labelledby="addresses-title">
            <h3
              id="addresses-title"
              className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
            >
              Shipping Address
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold quantico-bold-italic mb-2 text-gray-700">
                Shipping Address
              </h4>
              <address className="not-italic quantico-regular text-base text-gray-600 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </address>
            </div>
          </section>

          {/* Order Summary */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.totalAmountINR}</span>
              </div>
              {order.discountINR > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discountINR}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingFee}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>₹{order.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {order.paymentDetails && order.paymentDetails.transactionId && (
            <section aria-labelledby="payment-details-title">
              <h3
                id="payment-details-title"
                className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
              >
                Payment Details
              </h3>
              <div className="space-y-2 quantico-regular text-lg text-gray-700">
                <p>
                  <strong>Transaction ID:</strong> {order.paymentDetails.transactionId}
                </p>
                <p>
                  <strong>Payment Fee:</strong> {convertAndFormatPrice(order.paymentDetails.fee)}
                </p>
              </div>
            </section>
          )}

          {/* Cancellation Reason */}
          {order.status === 'cancelled' && order.cancellationReason && (
            <section aria-labelledby="cancellation-reason-title">
              <h3
                id="cancellation-reason-title"
                className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
              >
                Cancellation Reason
              </h3>
              <p className="quantico-regular text-lg text-gray-700">{order.cancellationReason}</p>
            </section>
          )}

          {/* Tracking Information */}
          {order.trackingInfo && (
            <section aria-labelledby="tracking-info-title">
              <h3
                id="tracking-info-title"
                className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
              >
                Tracking Information
              </h3>
              <div className="space-y-2 quantico-regular text-lg text-gray-700">
                <p>
                  <strong>Carrier:</strong> {order.trackingInfo.carrier}
                </p>
                <p>
                  <strong>Tracking Number:</strong> {order.trackingInfo.trackingNumber}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong>{' '}
                  {format(new Date(order.trackingInfo.estimatedDelivery), 'PPP')}
                </p>
                {/* Tracking Link */}
                {order.trackingInfo.trackingUrl && (
                  <p>
                    <strong>Track Package:</strong>{' '}
                    <a
                      href={order.trackingInfo.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0821D2] hover:underline"
                    >
                      View Tracking Details
                    </a>
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Related Orders */}
          {order.relatedOrders && order.relatedOrders.length > 0 && (
            <section aria-labelledby="related-orders-title">
              <h3
                id="related-orders-title"
                className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
              >
                Related Orders
              </h3>
              <ul className="space-y-4">
                {order.relatedOrders.map((relatedOrder, idx) => (
                  <li
                    key={idx}
                    className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Related Order Image */}
                    <img
                      src={relatedOrder.thumbnail}
                      alt={relatedOrder.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md mr-4"
                    />

                    {/* Related Order Details */}
                    <div className="flex-1 quantico-regular text-lg text-gray-700">
                      <h4 className="font-semibold text-gray-800">{relatedOrder.title}</h4>
                      <p className="mt-1">
                        <strong>Order Number:</strong> {relatedOrder.orderNumber}
                      </p>
                      <p className="mt-1">
                        <strong>Status:</strong>{' '}
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm quantico-bold-italic ${
                            relatedOrder.status === 'delivered'
                              ? 'bg-green-600'
                              : relatedOrder.status === 'processing' || relatedOrder.status === 'shipped'
                              ? 'bg-blue-600'
                              : relatedOrder.status === 'cancelled' || relatedOrder.status === 'refunded'
                              ? 'bg-red-600'
                              : 'bg-yellow-600'
                          }`}
                        >
                          {relatedOrder.status.charAt(0).toUpperCase() +
                            relatedOrder.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Reviews */}
          {order.reviews && order.reviews.length > 0 && (
            <section aria-labelledby="reviews-title">
              <h3
                id="reviews-title"
                className="text-xl font-semibold quantico-bold-italic mb-4 text-gray-800 border-b pb-2"
              >
                Reviews
              </h3>
              <ul className="space-y-6">
                {order.reviews.map((review, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-2">
                      {/* Reviewer Avatar */}
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      {/* Reviewer Name and Rating */}
                      <div>
                        <p className="font-semibold text-gray-800">{review.user.name}</p>
                        <div className="flex items-center">
                          {/* Star Ratings */}
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.98 9.397c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Review Comment */}
                    <p className="text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Footer Close Button Section Removed as per user instruction */}
      </div>
    </div>
  );
};

// PropTypes for type checking
OrderDetailsModal.propTypes = {
  order: PropTypes.shape({
    orderNumber: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    shippingAddress: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          thumbnail: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
        variant: PropTypes.string.isRequired,
        packaging: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
    discount: PropTypes.number,
    finalAmount: PropTypes.number.isRequired,
    paymentDetails: PropTypes.shape({
      transactionId: PropTypes.string,
      fee: PropTypes.number,
    }),
    cancellationReason: PropTypes.string,
    trackingInfo: PropTypes.shape({
      carrier: PropTypes.string,
      trackingNumber: PropTypes.string,
      estimatedDelivery: PropTypes.string,
      trackingUrl: PropTypes.string,
    }),
    relatedOrders: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        orderNumber: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      })
    ),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsModal;

/**
 * Tailwind CSS Custom Animations
 *
 * To support the fade-in animation used in the modal, ensure that your `tailwind.config.js`
 * is extended with custom keyframes and animations as follows:
 *
 * // tailwind.config.js
 * module.exports = {
 *   // ...
 *   theme: {
 *     extend: {
 *       keyframes: {
 *         fadeIn: {
 *           '0%': { opacity: 0 },
 *           '100%': { opacity: 1 },
 *         },
 *         fadeOut: {
 *           '0%': { opacity: 1 },
 *           '100%': { opacity: 0 },
 *         },
 *         slideIn: {
 *           '0%': { transform: 'translateY(-10%)', opacity: 0 },
 *           '100%': { transform: 'translateY(0)', opacity: 1 },
 *         },
 *         slideOut: {
 *           '0%': { transform: 'translateY(0)', opacity: 1 },
 *           '100%': { transform: 'translateY(-10%)', opacity: 0 },
 *         },
 *       },
 *       animation: {
 *         fadeIn: 'fadeIn 0.5s ease-out forwards',
 *         fadeOut: 'fadeOut 0.5s ease-in forwards',
 *         slideIn: 'slideIn 0.5s ease-out forwards',
 *         slideOut: 'slideOut 0.5s ease-in forwards',
 *       },
 *     },
 *   },
 *   plugins: [],
 * };
 *
 * After updating the configuration, rebuild your Tailwind CSS to apply the new animations.
 */

/**
 * Component Features:
 * 
 * 1. **Swiper Integration:**
 *    - The Swiper library is used to create a responsive slider for the order items.
 *    - The `Navigation` and `Pagination` modules are imported to add navigation arrows and pagination dots.
 *    - Custom navigation buttons are implemented using `useRef` to position them outside the item box.
 *    - `slidesPerView` is set to `1` to ensure each slide displays a single, full-width item.
 *    - `spaceBetween` adds spacing between slides.
 *    - `pagination={{ clickable: true }}` enables clickable pagination dots.
 * 
 * 2. **Conditional Rendering:**
 *    - If there are multiple items (`order.items.length > 1`), items are displayed in a Swiper slider.
 *    - If there's only one item, it's displayed in a standard list format without the slider.
 *    - Related sections (payment details, tracking, related orders, reviews) only appear when data exists.
 */