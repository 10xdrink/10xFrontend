// src/routes/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductListingPage from "../pages/ProductListingPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage"; // Import the new page
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FAQPage from "../pages/FAQPage";
import ContactPage from "../pages/ContactPage";
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import ErrorPage from "../pages/ErrorPage";
import ThankYouPage from "../pages/ThankYouPage";
import AboutUs from "../pages/AboutUs";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import UserOrdersPage from "../pages/UserOrdersPage";
import EditAddress from "../pages/EditAddress";
import UserReview from "../components/UserReview";
import DeleteAccountPage from "../pages/DeleteAccountPage";
import DeleteAccountSuccessPage from "../pages/DeleteAccountSuccessPage";
import ConfirmDeleteAccountPage from "../pages/ConfirmDeleteAccountPage";



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/delete-account" element={<DeleteAccountPage />} />
      <Route path="/delete-account-success" element={<DeleteAccountSuccessPage />} />
      <Route
        path="/reset-password/:resetToken"
        element={<ResetPasswordPage />}
      />{" "}
      {/* Corrected path */}
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/edit-address" element={<EditAddress />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* Authentication Routes */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
                <Route path="/confirm-delete/:token" element={<ConfirmDeleteAccountPage />} />

      <Route
        path="/user-review"
        element={
          <ProtectedRoute requireAuth={true}>
            <UserReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <UserOrdersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
