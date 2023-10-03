const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const NotAuthorized = require('../errors/NotAuthorized');
const Forbidden = require('../errors/Forbidden');
const {
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  BAD_REQUEST_ERROR_MESSAGE,
  NOT_FOUND_ERROR,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  BAD_REQUEST_ERROR,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR,
} = require('../utils/constans');

// Middleware function for handling errors
module.exports = (err, req, res, next) => {
  // Handle Mongoose CastError and ValidationError
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: BAD_REQUEST_ERROR_MESSAGE });
  }

  // Handle DocumentNotFoundError
  if (err instanceof DocumentNotFoundError) {
    return res
      .status(NOT_FOUND_ERROR)
      .send({
        message: NOT_FOUND_ERROR_MESSAGE,
      });
  }

  // Handle custom NotFound
  if (err instanceof NotFound) {
    return res.status(NOT_FOUND_ERROR).send({ message: err.message });
  }

  // Handle NotAuthorized error
  if (err instanceof NotAuthorized) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: err.message });
  }

  // Handle Conflict error
  if (err instanceof Conflict) {
    return res.status(CONFLICT_ERROR).send({ message: err.message });
  }

  // Handle custom BadRequest error
  if (err instanceof BadRequest) {
    return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
  }

  // Handle Forbidden error
  if (err instanceof Forbidden) {
    return res.status(FORBIDDEN_ERROR).send({ message: err.message });
  }

  // Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({ message: CONFLICT_ERROR_MESSAGE });
  }

  // Handle generic server error
  res.status(SERVER_ERROR).send(SERVER_ERROR_MESSAGE);

  return next();
};
