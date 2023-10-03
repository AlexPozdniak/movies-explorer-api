// Define a custom error class named "NotFound" that extends the built-in "Error" class.
class NotFound extends Error {
  constructor(message) {
    super(message);
    // Call the constructor of the parent "Error" class with the provided error message.
    this.statusCode = 404; // Set the HTTP status code for this error to 404 (Not Found).
  }
}

module.exports = NotFound; // Export the "NotFound" class for use in other parts of the application.
