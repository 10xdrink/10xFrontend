// src/App.jsx

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Navbar />
        <AppRoutes />
        <Footer />
        <Cart />
        <ToastContainer /> {/* Single instance of ToastContainer */}
      </ErrorBoundary>
      <BackToTopButton />
    </>
  );
}

export default App;
