// services/billDeskService.js

const crypto = require('crypto');
const axios = require('axios');
const jose = require('node-jose'); // You'll need to install this: npm install node-jose
const logger = require('../utils/logger');
const Transaction = require('../models/Transaction');

// BillDesk API configuration
const BILLDESK_CONFIG = {
  // Core credentials - EXACT values for UAT environment
  merchantId: process.env.BILLDESK_MERCHANT_ID || 'BDUATV2APT',
  clientId: process.env.BILLDESK_SECURITY_ID || 'bduatv2kaptsj',
  securityId: process.env.BILLDESK_SECURITY_ID || 'bduatv2kaptsj', // Adding this explicitly
  
  // Encryption and signing keys (using existing passwords)
  encryptionKey: process.env.BILLDESK_ENCRYPTION_PASSWORD || '4u4akYDyOojgMwgU8xr464yOMmtM2cPe',
  signingKey: process.env.BILLDESK_SIGNING_PASSWORD || 'xkUzRJ8b3u2z5dmzc0wlAgPFiLQrBsbf',
  checksum: process.env.BILLDESK_SIGNING_PASSWORD || 'xkUzRJ8b3u2z5dmzc0wlAgPFiLQrBsbf',
  
  // Key IDs for JOSE
  encryptionKeyId: process.env.BILLDESK_ENCRYPTION_KEY_ID || 'enc-key-1',
  signingKeyId: process.env.BILLDESK_SIGNING_KEY_ID || 'sign-key-1',
  
  // URLs - Using environment variables with fallbacks
  // IMPORTANT: BillDesk requires absolute URLs with https for production
  returnUrl: process.env.BILLDESK_RETURN_URL || 'http://localhost:5173/payment/return',
  localReturnUrl: 'http://localhost:5173/payment/return',
  webhookUrl: process.env.BILLDESK_WEBHOOK_URL || 'http://localhost:5000/api/payments/billdesk/webhook',
  
  // API endpoints - Updated to match documentation
  baseUrl: process.env.BILLDESK_BASE_URL || 'https://uat1.billdesk.com/u2',
  createOrderUrl: '/payments/ve1_2/orders/create',
  retrieveTransactionUrl: '/payments/ve1_2/transactions/get',
  createRefundUrl: '/payments/ve1_2/refunds/create',
  
  // Direct payment URL for UAT environment
  paymentUrl: process.env.BILLDESK_PAYMENT_URL || 'https://uat1.billdesk.com/pgidsk/PGIMerchantRequestHandler',
  sdkJsUrl: 'https://uat1.billdesk.com/u2/assets/js/billdesksdk.js', // Not used in direct approach
  
  // SDK Configuration
  flowType: 'payments',
  crossButtonHandling: 'Y',
  
  // Constants
  currency: '356', // INR
  itemCode: 'DIRECT'
};

// Log the configuration (with sensitive data masked)
logger.info('BillDesk Configuration:');
logger.info(`- Merchant ID: ${BILLDESK_CONFIG.merchantId}`);
logger.info(`- Payment URL: ${BILLDESK_CONFIG.paymentUrl}`);
logger.info(`- Return URL: ${BILLDESK_CONFIG.returnUrl}`);
logger.info(`- Webhook URL: ${BILLDESK_CONFIG.webhookUrl}`);

/**
 * Generates a unique trace ID for request tracking
 * @returns {string} - Trace ID
 */
const generateTraceId = () => {
  return `TRC-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

/**
 * Generates a timestamp in the format required by BillDesk
 * @returns {string} - Timestamp in YYYYMMDDHHMMSS format
 */
const generateTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
 * Encrypts the payload using JOSE JWE
 * @param {Object} payload - The payload to encrypt
 * @returns {Promise<string>} - Encrypted payload
 */
const encryptPayload = async (payload) => {
  try {
    // Convert payload to string if it's an object
    const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : payload;
    
    // Create a key from the encryption key
    const key = await jose.JWK.asKey({
      kty: 'oct',
      k: Buffer.from(BILLDESK_CONFIG.encryptionKey).toString('base64'),
      alg: 'A256GCM',
      use: 'enc'
    });
    
    // Create JWE header
    const header = {
      alg: 'dir',
      enc: 'A256GCM',
      kid: BILLDESK_CONFIG.encryptionKeyId,
      clientid: BILLDESK_CONFIG.clientId
    };
    
    // Encrypt the payload
    const jwe = await jose.JWE.createEncrypt({ format: 'compact', fields: header }, key)
      .update(payloadString)
      .final();
    
    return jwe;
  } catch (error) {
    logger.error(`Error encrypting payload: ${error.message}`);
    throw new Error(`Encryption failed: ${error.message}`);
  }
};

/**
 * Signs the encrypted payload using JOSE JWS
 * @param {string} encryptedPayload - The encrypted payload to sign
 * @returns {Promise<string>} - Signed encrypted payload
 */
const signPayload = async (encryptedPayload) => {
  try {
    // Create a key from the signing key
    const key = await jose.JWK.asKey({
      kty: 'oct',
      k: Buffer.from(BILLDESK_CONFIG.signingKey).toString('base64'),
      alg: 'HS256',
      use: 'sig'
    });
    
    // Create JWS header
    const header = {
      alg: 'HS256',
      kid: BILLDESK_CONFIG.signingKeyId,
      clientid: BILLDESK_CONFIG.clientId
    };
    
    // Sign the encrypted payload
    const jws = await jose.JWS.createSign({ format: 'compact', fields: header }, key)
      .update(encryptedPayload)
      .final();
    
    return jws;
  } catch (error) {
    logger.error(`Error signing payload: ${error.message}`);
    throw new Error(`Signing failed: ${error.message}`);
  }
};

/**
 * Verifies the signature of a response from BillDesk
 * @param {string} signedResponse - The signed response from BillDesk
 * @returns {Promise<string>} - The verified encrypted payload
 */
const verifySignature = async (signedResponse) => {
  try {
    // Create a key from the signing key
    const key = await jose.JWK.asKey({
      kty: 'oct',
      k: Buffer.from(BILLDESK_CONFIG.signingKey).toString('base64'),
      alg: 'HS256',
      use: 'sig'
    });
    
    // Verify the signature
    const result = await jose.JWS.createVerify(key).verify(signedResponse);
    
    return result.payload.toString();
  } catch (error) {
    logger.error(`Error verifying signature: ${error.message}`);
    throw new Error(`Signature verification failed: ${error.message}`);
  }
};

/**
 * Decrypts the verified payload from BillDesk
 * @param {string} encryptedPayload - The encrypted payload
 * @returns {Promise<Object>} - The decrypted payload
 */
const decryptPayload = async (encryptedPayload) => {
  try {
    // Create a key from the encryption key
    const key = await jose.JWK.asKey({
      kty: 'oct',
      k: Buffer.from(BILLDESK_CONFIG.encryptionKey).toString('base64'),
      alg: 'A256GCM',
      use: 'enc'
    });
    
    // Decrypt the payload
    const result = await jose.JWE.createDecrypt(key).decrypt(encryptedPayload);
    
    // Parse the decrypted payload
    return JSON.parse(result.payload.toString());
  } catch (error) {
    logger.error(`Error decrypting payload: ${error.message}`);
    throw new Error(`Decryption failed: ${error.message}`);
  }
};

/**
 * Makes a request to BillDesk API
 * @param {string} endpoint - The API endpoint
 * @param {Object} payload - The payload to send
 * @returns {Promise<Object>} - The response from BillDesk
 */
const makeRequest = async (endpoint, payload) => {
  try {
    // Generate trace ID and timestamp
    const traceId = generateTraceId();
    const timestamp = generateTimestamp();
    
    // Encrypt and sign the payload
    const encryptedPayload = await encryptPayload(payload);
    const signedPayload = await signPayload(encryptedPayload);
    
    // Set up headers
    const headers = {
      'Content-Type': 'application/jose',
      'Accept': 'application/jose',
      'BD-Traceid': traceId,
      'BD-Timestamp': timestamp
    };
    
    // Make the request
    const url = `${BILLDESK_CONFIG.baseUrl}${endpoint}`;
    logger.info(`Making request to ${url}`);
    logger.info(`Request headers: ${JSON.stringify(headers)}`);
    
    const response = await axios.post(url, signedPayload, { headers });
    
    // Verify and decrypt the response
    const verifiedResponse = await verifySignature(response.data);
    const decryptedResponse = await decryptPayload(verifiedResponse);
    
    logger.info(`Response received from BillDesk: ${JSON.stringify(decryptedResponse)}`);
    
    return decryptedResponse;
  } catch (error) {
    logger.error(`Error making request to BillDesk: ${error.message}`);
    if (error.response) {
      logger.error(`Response status: ${error.response.status}`);
      logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    throw new Error(`BillDesk API request failed: ${error.message}`);
  }
};

/**
 * Creates a BillDesk order
 * @param {Object} order - Order object from database
 * @returns {Promise<Object>} - BillDesk order response
 */
const createOrder = async (order) => {
  try {
    logger.info('Creating BillDesk order');
    
    // Get the amount from the order - ensure we get the correct amount field
    const orderAmount = order.finalAmount || order.totalAmount || order.amount || 0;
    
    logger.info(`Using order amount: ${orderAmount}`);
    
    // Strict validation to ensure we have a valid, positive amount
    if (!orderAmount || isNaN(orderAmount) || orderAmount <= 0) {
      logger.error(`Invalid order amount: ${orderAmount}`);
      throw new Error('Invalid order amount. Amount must be greater than zero.');
    }
    
    const { orderNumber, customer } = order;
    
    // Generate a unique reference ID (order ID in your system)
    const bdOrderId = orderNumber || `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Get customer details
    let customerName = 'Customer';
    let customerEmail = 'customer@example.com';
    let customerPhone = '1234567890';
    
    // If there's a customer ID on the order, try to get their details
    if (customer) {
      try {
        // Assuming you have a User model or similar to fetch customer details
        const User = require('../models/User');
        const customerDetails = await User.findById(customer);
        
        if (customerDetails) {
          customerName = customerDetails.name || customerName;
          customerEmail = customerDetails.email || customerEmail;
          customerPhone = customerDetails.phone || customerPhone;
        }
      } catch (err) {
        logger.warn('Error fetching customer details, using defaults:', err.message);
      }
    }
    
    // Create the message string according to BillDesk specifications
    const msg = constructMessage(bdOrderId, orderAmount, customerName, customerEmail, customerPhone);
    
    // Generate checksum for the message
    const checksum = generateChecksum(msg);
    
    // Prepare the data for BillDesk SDK
    const sdkData = {
      merchantId: BILLDESK_CONFIG.merchantId,
      securityId: BILLDESK_CONFIG.securityId,
      paymentUrl: BILLDESK_CONFIG.paymentUrl,
      returnUrl: BILLDESK_CONFIG.returnUrl,
      message: msg,
      checksum: checksum,
      flowType: BILLDESK_CONFIG.flowType,
      crossButtonHandling: BILLDESK_CONFIG.crossButtonHandling,
      sdkJsUrl: BILLDESK_CONFIG.sdkJsUrl
    };
    
    // Create a transaction record
    const transaction = new Transaction({
      orderNumber: bdOrderId,
      order: order._id, // This is required by the schema
      paymentMethod: 'billdesk', // This is required by the schema
      amount: orderAmount,
      status: 'pending',
      metadata: {
        requestMessage: msg,
        checksum: checksum
      }
    });
    
    await transaction.save();
    
    // Return the SDK data along with transaction details
    return {
      success: true,
      orderNumber: bdOrderId,
      transactionId: transaction._id,
      sdkData: sdkData
    };
  } catch (error) {
    logger.error(`Error creating BillDesk order: ${error.message}`);
    throw new Error(`BillDesk order creation failed: ${error.message}`);
  }
};

/**
 * Constructs the message string according to BillDesk specifications
 * @param {string} refId - Reference ID (your order ID)
 * @param {number} amount - Amount in paise (smallest unit)
 * @param {string} customerName - Customer name
 * @param {string} customerEmail - Customer email
 * @param {string} customerPhone - Customer phone
 * @returns {string} - Message string
 */



function constructMessage(refId, amount, customerName, customerEmail, customerPhone) {
  // Format amount to 2 decimal places without decimal point (e.g., 100.00 -> 10000)
  if (amount === undefined || amount === null || isNaN(amount)) {
    logger.error(`Invalid amount provided: ${amount}`);
    throw new Error('Invalid amount for BillDesk payment');
  }
  
  // Format amount as integer in paise (multiply by 100 and remove decimal)
  // BillDesk expects amount in paise (smallest unit) without decimals
  const formattedAmount = Math.round(parseFloat(amount) * 100).toString();
  
  logger.info(`Formatting amount: ${amount} -> ${formattedAmount} paise`);
  
  // Ensure customer details are properly formatted - no special characters allowed
  const sanitizedCustomerName = (customerName || 'Customer').trim().replace(/[^a-zA-Z0-9 ]/g, '');
  const sanitizedCustomerEmail = (customerEmail || 'customer@example.com').trim();
  const sanitizedCustomerPhone = (customerPhone || '1234567890').trim().replace(/\D/g, '');
  
  // Create message according to BillDesk embedded SDK specifications
  // IMPORTANT: Order of parameters must match EXACTLY what BillDesk expects for UAT
  const messageComponents = [
    BILLDESK_CONFIG.merchantId,  // Merchant ID
    refId,                       // Reference ID (your order ID)
    formattedAmount,             // Amount in paise (e.g., Rs. 100.00 = 10000)
    'INR',                       // Currency (must be INR for Indian transactions)
    sanitizedCustomerName,       // Customer name
    sanitizedCustomerEmail,      // Customer email
    sanitizedCustomerPhone,      // Customer phone
    BILLDESK_CONFIG.returnUrl,   // Return URL - must be absolute URL
    'DIRECT'                     // Payment mode - DIRECT for embedded SDK
  ];
  
  // Join with pipe character as per BillDesk specifications
  const message = messageComponents.join('|');
  
  // Log for debugging
  logger.info('BillDesk message components:', JSON.stringify(messageComponents));
  logger.info('Final BillDesk message:', message);
  
  return message;
}

function generateChecksum(msg) {
  try {
    logger.info('Generating checksum for message');
    
    // For BillDesk UAT, we need to ensure we're using the correct algorithm and format
    // BillDesk's documentation specifies to use HMAC-SHA256 with the signing password
    
    // Make sure we have the signing password
    if (!BILLDESK_CONFIG.signingKey) {
      throw new Error('Missing signing password for BillDesk checksum generation');
    }
    
    // Create HMAC using SHA-256 algorithm with the signing password
    const hmac = crypto.createHmac('sha256', BILLDESK_CONFIG.signingKey);
    
    // Update HMAC with the message
    hmac.update(msg);
    
    // Generate checksum - BillDesk expects lowercase hex
    const checksum = hmac.digest('hex').toLowerCase();
    
    // Log for debugging (but mask part of the checksum for security)
    const maskedChecksum = checksum.substring(0, 8) + '...' + checksum.substring(checksum.length - 8);
    logger.info(`Generated checksum for message (masked): ${maskedChecksum}`);
    
    return checksum;
  } catch (error) {
    logger.error(`Error generating checksum: ${error.message}`);
    throw new Error(`Failed to generate checksum for BillDesk payment: ${error.message}`);
  }
}

/**
  } catch (error) {
    logger.error(`Error retrieving transaction: ${error.message}`);
    throw new Error(`Failed to retrieve transaction: ${error.message}`);
  }
}

/**
 * Processes BillDesk webhook
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Processed webhook data
 */
async function processWebhook(req) {
  try {
    // Log the incoming webhook data for debugging
    logger.info(`BillDesk webhook received: ${JSON.stringify(req.body)}`);
    
    // Simple validation to ensure we have data
    if (!req.body || !req.body.msg) {
      throw new Error('No webhook data received');
    }
    
    // Parse the response - BillDesk sends a pipe-delimited string
    // Format: MerchantID|OrderID|TxnStatus|BillDeskTxnID|BankTxnID|TxnAmount|BankID|AuthStatus|TxnType|Currency|AdditionalInfo1|AdditionalInfo2|AdditionalInfo3|AdditionalInfo4|AdditionalInfo5|AdditionalInfo6|AdditionalInfo7|ErrorStatus|ErrorDescription|Checksum
    const responseData = req.body.msg;
    const responseFields = responseData.split('|');
    
    // Verify response checksum
    const receivedChecksum = responseFields[responseFields.length - 1];
    const dataToVerify = responseFields.slice(0, -1).join('|');
    const checksumToVerify = dataToVerify + '|' + BILLDESK_CONFIG.checksum;
    const calculatedChecksum = crypto.createHash('sha256').update(checksumToVerify).digest('hex');
    
    if (receivedChecksum !== calculatedChecksum) {
      logger.error('Invalid checksum in BillDesk webhook');
      throw new Error('Invalid checksum in webhook');
    }
    
    const merchantId = responseFields[0];
    const orderNumber = responseFields[1];
    const txnStatus = responseFields[2];
    const billDeskTxnId = responseFields[3];
    const bankTxnId = responseFields[4];
    const txnAmount = responseFields[5];
    
    // Validate merchant ID
    if (merchantId !== BILLDESK_CONFIG.merchantId) {
      logger.error(`Invalid merchant ID in webhook: ${merchantId}`);
      throw new Error('Invalid merchant ID in webhook');
    }
    
    // Find the transaction in our database
    const transaction = await Transaction.findOne({ orderNumber: orderNumber });
    
    if (!transaction) {
      logger.error(`Transaction not found for order number: ${orderNumber}`);
      throw new Error('Transaction not found');
    }
    
    // Update transaction status based on BillDesk response
    let status = 'pending';
    
    if (txnStatus === '0300') {
      status = 'success';
    } else if (txnStatus === '0399') {
      status = 'failed';
    } else if (txnStatus === '0002') {
      status = 'pending';
    } else {
      status = 'failed';
    }
    
    transaction.status = status;
    transaction.metadata = {
      ...transaction.metadata,
      billDeskResponse: responseData,
      billDeskTxnId: billDeskTxnId,
      bankTxnId: bankTxnId,
      txnAmount: txnAmount,
      authStatus: responseFields[7],
      errorStatus: responseFields[17],
      errorDescription: responseFields[18]
    };
    
    await transaction.save();
    logger.info(`Transaction status updated to ${status} for order: ${orderNumber}`);
    
    return { 
      success: true,
      orderNumber,
      status,
      transactionId: transaction._id
    };
  } catch (error) {
    logger.error(`BillDesk webhook processing failed: ${error.message}`);
    throw new Error(`BillDesk webhook processing failed: ${error.message}`);
  }
};

/**
 * Handles BillDesk transaction status from return URL
 * @param {Object} returnData - Return data from BillDesk
 * @returns {Promise<Object>} - Updated transaction status
 */
async function handleTransactionReturn(returnData) {
  try {
    // Log return data
    logger.info(`Processing BillDesk return data: ${JSON.stringify(returnData)}`);
    
    if (!returnData || !returnData.msg) {
      throw new Error('No return data received');
    }
    
    // Parse the response - BillDesk sends a pipe-delimited string
    const responseData = returnData.msg;
    const responseFields = responseData.split('|');
    
    // Verify response checksum
    const receivedChecksum = responseFields[responseFields.length - 1];
    const dataToVerify = responseFields.slice(0, -1).join('|');
    const checksumToVerify = dataToVerify + '|' + BILLDESK_CONFIG.checksum;
    const calculatedChecksum = crypto.createHash('sha256').update(checksumToVerify).digest('hex');
    
    if (receivedChecksum !== calculatedChecksum) {
      logger.error('Invalid checksum in BillDesk return data');
      throw new Error('Invalid checksum in return data');
    }
    
    const merchantId = responseFields[0];
    const orderNumber = responseFields[1];
    const txnStatus = responseFields[2];
    
    // Validate merchant ID
    if (merchantId !== BILLDESK_CONFIG.merchantId) {
      logger.error(`Invalid merchant ID in return data: ${merchantId}`);
      throw new Error('Invalid merchant ID in return data');
    }
    
    // Find the transaction in our database
    const transaction = await Transaction.findOne({ orderNumber: orderNumber });
    
    if (!transaction) {
      logger.error(`Transaction not found for order number: ${orderNumber}`);
      throw new Error('Transaction not found');
    }
    
    // Update transaction status based on BillDesk response
    let status = 'pending';
    
    if (txnStatus === '0300') {
      status = 'success';
    } else if (txnStatus === '0399') {
      status = 'failed';
    } else if (txnStatus === '0002') {
      status = 'pending';
    } else {
      status = 'failed';
    }
    
    transaction.status = status;
    transaction.metadata = {
      ...transaction.metadata,
      billDeskResponse: responseData,
      billDeskTxnId: responseFields[3] || '',
      bankTxnId: responseFields[4] || '',
      txnAmount: responseFields[5] || '',
      authStatus: responseFields[7] || '',
      errorStatus: responseFields[17] || '',
      errorDescription: responseFields[18] || ''
    };
    
    await transaction.save();
    logger.info(`Transaction status updated to ${status} for order: ${orderNumber}`);
    
    return { 
      success: true,
      orderNumber,
      status,
      transactionId: transaction._id
    };
  } catch (error) {
    logger.error(`BillDesk return data handling failed: ${error.message}`);
    throw new Error(`BillDesk return data handling failed: ${error.message}`);
  }
};

/**
 * Retrieves transaction status from BillDesk
 * @param {string} orderNumber - Order Number
 * @returns {Promise<Object>} - Transaction status
 */
const retrieveTransaction = async (orderNumber) => {
  try {
    logger.info(`Retrieving transaction status for order: ${orderNumber}`);
    
    // Find the transaction in our database
    const transaction = await Transaction.findOne({ orderNumber });
    
    if (!transaction) {
      logger.error(`Transaction not found for order number: ${orderNumber}`);
      throw new Error('Transaction not found');
    }
    
    // For BillDesk, we don't have a direct API to check status
    // We rely on webhook or redirect to update status
    // This is a placeholder for future implementation if BillDesk provides a status check API
    
    return {
      success: true,
      orderNumber,
      status: transaction.status,
      transactionId: transaction._id,
      metadata: transaction.metadata
    };
  } catch (error) {
    logger.error(`Error retrieving transaction status: ${error.message}`);
    throw new Error(`BillDesk transaction status retrieval failed: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  retrieveTransaction,
  processWebhook,
  handleTransactionReturn,
  BILLDESK_CONFIG
};
