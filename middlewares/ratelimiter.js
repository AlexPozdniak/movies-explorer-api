const rateLimit = require('express-rate-limit');

// Create a rate limiter middleware with the following configuration:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes in milliseconds - Defines the time window for rate limiting.
  max: 100, // Maximum number of requests allowed within the defined windowMs.
  message: 'Too many requests from this IP, please try again in 15 minutes', // Error message to send when rate limit is exceeded.
});

// Export the rate limiter middleware for use in an Express application.
module.exports = limiter;
