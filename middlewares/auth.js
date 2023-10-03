// Import necessary modules and error classes
const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');
const { AUTHORIZED_REQUIRE_ERROR_MESSAGE } = require('../utils/constans');

// Import environment variables
const { NODE_ENV, JWT_SECRET } = process.env;

// Middleware function for authentication
const auth = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    // Verify the token using the JWT library and the secret key
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    // Attach the user's payload data to the request object
    req.user = payload;
    next(); // Proceed to the next middleware or route handler
  } catch (e) {
    // If there's an error during token verification, create a "NotAuthorized" error
    const err = new NotAuthorized(AUTHORIZED_REQUIRE_ERROR_MESSAGE);
    next(err); // Pass the error to the error handling middleware
  }
};

module.exports = {
  auth,
};
