// src/pages/RegisterPage.jsx

import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import RegisterBG from "../assets/LoginBG.png"; // Ensure this image exists
import { useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      // Removed 'termsAgreed' as per request
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces.")
        .required("Name is required."),
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .matches(
          /[A-Z]/,
          "Password must contain at least one uppercase letter."
        )
        .matches(
          /[a-z]/,
          "Password must contain at least one lowercase letter."
        )
        .matches(/[0-9]/, "Password must contain at least one number.")
        .matches(
          /[!@#$%^&*]/,
          "Password must contain at least one special character (!@#$%^&*)."
        )
        .required("Password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
        .required("Please confirm your password."),
      // Removed 'termsAgreed' validation
    }),
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const response = await register(
          values.name.trim(),
          values.email.trim(),
          values.password
        );
        if (response.success) {
          setStatus({
            success: "Registered successfully! Redirecting to login...",
          });
          resetForm();
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus({ error: response.message || "Registration failed." });
        }
      } catch (error) {
        setStatus({
          error: "An unexpected error occurred. Please try again later.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle Google OAuth registration
  const handleGoogleRegister = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      formik.setStatus({
        error:
          "API URL is not defined. Please check your environment variables.",
      });
      return;
    }
    window.location.href = `${apiUrl}/auth/google`;
  };

  // Password strength calculation function
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return strength;
  };

  // Show/hide password state variables
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${RegisterBG})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[600px]">
        <SwitchTransition>
          <CSSTransition key="register" timeout={300} classNames="fade">
            <div>
              <h2 className="text-4xl font-bold mb-4 quantico-bold-italic">
                Sign Up
              </h2>
              <p className="mb-8 text-lg pt-sans-regular">
                Create a new account below.
              </p>

              {/* Display Success Message */}
              {formik.status && formik.status.success && (
                <p className="text-green-500 mb-4">{formik.status.success}</p>
              )}

              {/* Display Error Message */}
              {formik.status && formik.status.error && (
                <p className="text-red-500 mb-4">{formik.status.error}</p>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...formik.getFieldProps("name")}
                    className={`w-full px-4 py-2 border-2 rounded ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>

                {/* Email Input */}
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
                    name="email"
                    {...formik.getFieldProps("email")}
                    className={`w-full px-4 py-2 border-2 rounded ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      {...formik.getFieldProps("password")}
                      className={`w-full px-4 py-2 border-2 rounded ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        // Eye Icon (Visible)
                        <i class="fa-solid fa-eye"></i>
                      ) : (
                        // Eye Off Icon (Hidden)
                        <i class="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.password}
                    </p>
                  ) : null}
                  {/* Password Strength Indicator */}
                  {formik.values.password && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded h-2">
                        <div
                          className={`h-2 rounded ${
                            getPasswordStrength(formik.values.password) <= 2
                              ? "bg-red-500"
                              : getPasswordStrength(formik.values.password) ===
                                3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${
                              (getPasswordStrength(formik.values.password) /
                                5) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">
                        Password Strength:{" "}
                        {getPasswordStrength(formik.values.password) <= 2
                          ? "Weak"
                          : getPasswordStrength(formik.values.password) === 3
                          ? "Moderate"
                          : "Strong"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      {...formik.getFieldProps("confirmPassword")}
                      className={`w-full px-4 py-2 border-2 rounded ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showConfirmPassword ? (
                        // Eye Icon (Visible)
                        <i class="fa-solid fa-eye"></i>
                      ) : (
                        // Eye Off Icon (Hidden)
                        <i class="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded ${
                    formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Sending..." : "SIGN UP"}
                </button>

                {/* Google OAuth Button */}
                <div className="learn-more">
                  <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="w-full py-3 text-lg flex items-center justify-center space-x-2 shadow-md border border-[#0821D2] quantico-bold-italic transition duration-300 rounded"
                  >
                    <i className="fa-brands fa-google"></i>
                    <span>SIGN UP WITH GOOGLE</span>
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p className="pt-sans-regular">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-sm font-bold hover:underline pt-sans-bold"
                  >
                    Log In
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

export default RegisterPage;
