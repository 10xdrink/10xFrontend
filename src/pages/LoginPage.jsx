// src/pages/LoginPage.jsx

import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import LoginBG from "../assets/LoginBG.png"; // Ensure this image exists
import { useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Show/Hide password state
  const [showPassword, setShowPassword] = useState(false);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const response = await login(email, password);
    if (!response.success) {
      setError(response.message || "Login failed.");
    }
    // No need to navigate here; handled in AuthContext
  };

  // Handle Google OAuth login
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setError(
        "API URL is not defined. Please check your environment variables."
      );
      return;
    }
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBG})` }}
    >
      <Helmet>
        <title>Login | 10X Energy Drink</title>
        <meta name="description" content="Sign in to your 10X account to manage orders, view purchase history, and access exclusive offers." />
        <meta name="keywords" content="10X login, energy drink account, customer login, sign in, user account" />
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[600px]">
        <SwitchTransition>
          <CSSTransition key="login" timeout={300} classNames="fade">
            <div>
              <h2 className="text-4xl font-bold mb-4 quantico-bold-italic">
                Log In
              </h2>
              <p className="mb-8 text-lg pt-sans-regular">
                Enter your details below.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-2 border-2 border-black rounded ${
                      error ? "border-red-500" : "border-black"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      // Eye Icon (Visible)
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      // Eye Off Icon (Hidden)
                      <i className="fa-solid fa-eye-slash"></i>
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded"
                >
                  LOG IN
                </button>
                <div className="learn-more">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3 text-lg flex items-center justify-center space-x-2 shadow-md border border-[#0821D2] quantico-bold-italic transition duration-300 rounded"
                  >
                    <i className="fa-brands fa-google"></i>
                    <span>LOG IN WITH GOOGLE</span>
                  </button>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-bold hover:underline pt-sans-regular"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
              <div className="text-center mt-4 pt-sans-regular">
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-sm font-bold hover:underline pt-sans-bold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default LoginPage;

