// src/components/CustomDropdown.jsx

import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  label,
  selectedOption,
  setSelectedOption,
  options,
  placeholder = "Select one...",
  name,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="mb-6" ref={dropdownRef}>
      <label className="block pt-sans-regular mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className={`w-full bg-white border border-black text-black py-3 px-4 pr-8 leading-tight text-left ${
            error ? "border-red-500" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption)?.label
            : placeholder}
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border p-4 border-t-0 border-black">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-black mb-2 outline-none pt-sans-regular"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionSelect(option)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options found.</li>
              )}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomDropdown;
