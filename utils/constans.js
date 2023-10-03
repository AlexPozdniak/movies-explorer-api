// Define constants for HTTP status codes
const OK = 200;
const CREATED_OK = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const FORBIDDEN_ERROR = 403;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;

// Define error messages and other constants
const SERVER_ERROR_MESSAGE = 'Server error';
const BAD_REQUEST_ERROR_MESSAGE = 'Invalid data';
const NOT_FOUND_ERROR_MESSAGE = 'User not found';
const AUTHORIZED_REQUIRE_ERROR_MESSAGE = 'Authorization required';
const OK_SIGNOUT_ERROR_MESSAGE = 'Goodbye';
const NOT_FOUND_PAGE_ERROR_MESSAGE = 'Page not found';
const CONFLICT_ERROR_MESSAGE = 'Email already registered';
const FORBIDDEN_ERROR_MESSAGE = 'Access denied';
const UNAUTHORIZED_ERROR_MESSAGE = 'Invalid email or password';
const NOT_FOUND_MOVIE_MESSAGE = 'Movie not found';

// Export the constants and error messages for use in the application
module.exports = {
  OK,
  CREATED_OK,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  OK_SIGNOUT_ERROR_MESSAGE,
  AUTHORIZED_REQUIRE_ERROR_MESSAGE,
  NOT_FOUND_PAGE_ERROR_MESSAGE,
};
