import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select one...");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData((prev) => ({ ...prev, country }));
    setIsCountryOpen(false);
    setSearchTerm(""); // Clear search term when a country is selected
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation rules
    if (!formData.name.trim()) newErrors.name = "Name on invoice is required.";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "Expiry date must be in MM/YY format.";
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{5}$/.test(formData.zip))
      newErrors.zip = "ZIP code must be 5 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate processing time
      setTimeout(() => {
        navigate("/thank-you");
      }, 2000); // Redirect after 2 seconds
    }
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row px-20 py-20 bg-gray-100 min-h-screen">
      {/* Left Side Form */}
      <div className="md:w-1/2 pr-8">
        <h2 className="text-5xl font-bold mb-6 quantico-bold-italic uppercase text-black">
          Complete Your Order:
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Form Fields */}
          <div>
            <label className="block  pt-sans-regular mb-1" htmlFor="name">
              Name on Invoice
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-3 border outline-none  pt-sans-regular ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block  pt-sans-regular mb-1" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength="16"
              className={`w-full p-3 border outline-none  pt-sans-regular ${
                errors.cardNumber ? "border-red-500" : "border-black"
              }`}
              value={formData.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block  pt-sans-regular mb-1" htmlFor="expiry">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                maxLength="5"
                className={`w-full p-3 border outline-none  pt-sans-regular ${
                  errors.expiry ? "border-red-500" : "border-black"
                }`}
                value={formData.expiry}
                onChange={handleChange}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block  pt-sans-regular mb-1" htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                maxLength="3"
                className={`w-full p-3 border outline-none  pt-sans-regular ${
                  errors.cvv ? "border-red-500" : "border-black"
                }`}
                value={formData.cvv}
                onChange={handleChange}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block  pt-sans-regular mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-3 border outline-none  pt-sans-regular ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Styled Dropdown for Country */}
          <div className="mb-6">
            <label className="block  pt-sans-regular mb-2" htmlFor="country">
              Country
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-black text-black py-3 px-4 pr-8 leading-tight text-left"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
              >
                {selectedCountry}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
              {isCountryOpen && (
                <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border p-4 border-t-0 border-black">
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full p-4 border border-black mb-2 outline-none  pt-sans-regular"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <ul className="max-h-40 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <li
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {country}
                      </li>
                    ))}
                    {filteredCountries.length === 0 && (
                      <li className="p-2 text-gray-500">No countries found.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Address Fields */}
          <div>
            <label
              className="block  pt-sans-regular mb-1"
              htmlFor="streetAddress"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              className={`w-full p-3 border outline-none   pt-sans-regular ${
                errors.streetAddress ? "border-red-500" : "border-black"
              }`}
              value={formData.streetAddress}
              onChange={handleChange}
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.streetAddress}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="w-1/3">
              <label className="block  pt-sans-regular mb-1" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`w-full p-3 border outline-none  pt-sans-regular ${
                  errors.city ? "border-red-500" : "border-black"
                }`}
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block  pt-sans-regular mb-1" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className={`w-full p-3 border outline-none  pt-sans-regular ${
                  errors.state ? "border-red-500" : "border-black"
                }`}
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block  pt-sans-regular mb-1" htmlFor="zip">
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                maxLength="5"
                className={`w-full p-3 border outline-none  pt-sans-regular ${
                  errors.zip ? "border-red-500" : "border-black"
                }`}
                value={formData.zip}
                onChange={handleChange}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Right Side Cart Summary */}
      <div className="md:w-1/2 pl-8">
        <h2 className="text-3xl font-bold mb-6"></h2>
        <div className="bg-white p-8 shadow-lg">
          {cartItems.length === 0 ? (
            <p className="text-center text-black pt-sans-regular p-8">
              Your cart is empty.
              <div className="flex justify-center items-center mb-6 mt-2">
                <Link to={"/products"}>
                  <button className="quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                    GO TO SHOP
                  </button>
                </Link>
              </div>
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.variant}-${item.packaging}`}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-28 h-auto object-cover mr-4"
                  />
                  <div>
                    <h3 className="nimbusL-bol text-2xl uppercase text-black">
                      {item.title}
                    </h3>
                    <p className="text-black mt-2 pt-sans-regular">
                      {item.variant} <i class="fa-solid fa-angle-right"></i>{" "}
                      {item.packaging}
                    </p>
                    <span className="text-black mt-2 pt-sans-regular">
                      Quantity: {item.quantity}
                    </span>{" "}
                    {/* Added quantity here */}
                  </div>
                </div>
                <span className="pt-sans-bold text-black">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))
          )}
          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
            <span className="nimbusL-bol uppercase">Total</span>
            <span className="pt-sans-bold text-black">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-12">
            <Link to="/products" className="mr-4">
              <div className="learn-more">
                <button
                  className={`shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out ${
                    cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="button"
                  disabled={cartItems.length === 0} // Disable when cart is empty
                >
                  Cancel
                </button>
              </div>
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || cartItems.length === 0} // Disable when cart is empty or when submitting
              className={`quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out ${
                isSubmitting || cartItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Complete Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
