// Define a custom error class named "NotAuthorized" that extends the built-in "Error" class.
class NotAuthorized extends Error {
  constructor(message) {
    super(message);
    // Call the constructor of the parent "Error" class with the provided error message.
    this.statusCode = 401; // Set the HTTP status code for this error to 401 (Unauthorized).
  }
}

module.exports = NotAuthorized;
// Export the "NotAuthorized" class for use in other parts of the application.
