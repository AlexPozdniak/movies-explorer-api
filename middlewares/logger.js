const winston = require('winston');
const expressWinston = require('express-winston');

// Request logger middleware configuration
const reqLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }), // Log requests to 'request.log' file
  ],
  format: winston.format.json(), // Log format in JSON
});

// Error logger middleware configuration
const errLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }), // Log errors to 'error.log' file
  ],
  format: winston.format.json(), // Log format in JSON
});

// Export the request and error loggers for use in Express application
module.exports = {
  reqLogger, // Request logger middleware
  errLogger, // Error logger middleware
};
