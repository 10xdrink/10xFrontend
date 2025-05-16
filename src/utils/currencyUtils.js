/**
 * Currency utility functions
 */

// Conversion rate from USD to INR (1 USD = ~83 INR as of current rate)
export const USD_TO_INR_RATE = 83;

/**
 * Converts a price from USD to INR
 * @param {number|string} usdPrice - Price in USD
 * @returns {number} - Price converted to INR
 */
export const convertUsdToInr = (usdPrice) => {
  // If the price is already a string and has the ₹ symbol, it's likely already in INR
  if (typeof usdPrice === 'string' && usdPrice.includes('₹')) {
    // Extract the number part and convert to number
    const numericValue = parseFloat(usdPrice.replace(/[^\d.-]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }
  
  // Convert string to number if needed
  const numericValue = typeof usdPrice === 'string' 
    ? parseFloat(usdPrice) 
    : usdPrice;
    
  if (typeof numericValue !== 'number' || isNaN(numericValue)) {
    return 0;
  }
  
  // Check if the value is likely already in INR (if it's over 1000 for a typical order)
  // This is a heuristic to avoid double-converting currencies
  if (numericValue >= 1000) {
    return numericValue;
  }
  
  return numericValue * USD_TO_INR_RATE;
};

/**
 * Formats a price in INR with the ₹ symbol and 2 decimal places
 * @param {number|string} price - Price to format
 * @returns {string} - Formatted price with ₹ symbol
 */
export const formatPriceINR = (price) => {
  // Convert to number first if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (typeof numPrice !== 'number' || isNaN(numPrice)) {
    return '₹0.00';
  }
  
  return `₹${numPrice.toFixed(2)}`;
};

/**
 * Formats a price in INR with the ₹ symbol and no decimal places, with thousands separator
 * @param {number|string} price - Price to format
 * @returns {string} - Formatted price with ₹ symbol and thousands separator
 */
export const formatPriceINRDisplay = (price) => {
  // Convert to number first if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (typeof numPrice !== 'number' || isNaN(numPrice)) {
    return '₹0';
  }
  
  // Use Indian formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(numPrice));
};

/**
 * Safely converts a price to INR (if needed) and formats it
 * @param {number|string} price - Price to convert and format
 * @returns {string} - Formatted price in INR with ₹ symbol
 */
export const convertAndFormatPrice = (price) => {
  // First determine if conversion is needed and convert
  const inrPrice = convertUsdToInr(price);
  // Then format the result
  return formatPriceINR(inrPrice);
};

/**
 * Converts a price to INR (if needed) and formats it for display with no decimals and thousands separator
 * @param {number|string} price - Price to convert and format
 * @returns {string} - Formatted price in INR with ₹ symbol
 */
export const convertAndFormatPriceDisplay = (price) => {
  const inrPrice = convertUsdToInr(price);
  return formatPriceINRDisplay(inrPrice);
}; 