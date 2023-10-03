// Define a custom error class named "Forbidden" that extends the built-in "Error" class.
class Forbidden extends Error {
  constructor(message) {
    super(message);
    // Call the constructor of the parent "Error" class with the provided error message.
    this.statusCode = 403; // Set the HTTP status code for this error to 403 (Forbidden).
  }
}

module.exports = Forbidden;
// Export the "Forbidden" class for use in other parts of the application.
