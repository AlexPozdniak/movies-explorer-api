// Define a custom error class named "Conflict" that extends the built-in "Error" class.
class Conflict extends Error {
  constructor(message) {
    super(message);
    // Call the constructor of the parent "Error" class with the provided error message.
    this.statusCode = 409; // Set the HTTP status code for this error to 409 (Conflict).
  }
}

module.exports = Conflict; // Export the "Conflict" class for use in other parts of the application.
