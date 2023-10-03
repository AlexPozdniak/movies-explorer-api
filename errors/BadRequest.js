// Define a custom error class named "BadRequest" that extends the built-in "Error" class.
class BadRequest extends Error {
  constructor(message) {
    super(message);
    // Call the constructor of the parent "Error" class with the provided error message.
    this.statusCode = 400; // Set the HTTP status code for this error to 400 (Bad Request).
  }
}

module.exports = BadRequest;
// Export the "BadRequest" class for use in other parts of the application.
