// Import necessary modules and error classes
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const NotAuthorized = require('../errors/NotAuthorized');

// Import constants and environment variables
const {
  NOT_FOUND_ERROR_MESSAGE,
  AUTHORIZED_REQUIRE_ERROR_MESSAGE,
  OK_SIGNOUT_ERROR_MESSAGE,
} = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

// Controller function to create a new user
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // Hash the user's password for security
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((data) => {
      // Remove the password field from the user data before sending the response
      const user = User.findById(data._id).select('-password');
      return user;
    })
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      next(error); // Pass any errors to the error handling middleware
    });
};

// Controller function to update user information
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  // Update the user's information and return the updated data
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new NotFound(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// Controller function for user login
const login = (req, res, next) => {
  const { email, password } = req.body;
  // Find the user by email and check if the provided password matches
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorized(AUTHORIZED_REQUIRE_ERROR_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthorized(AUTHORIZED_REQUIRE_ERROR_MESSAGE));
          }
          return user;
        });
    })
    .then((user) => {
      // Generate a JWT token for authentication and set it as a cookie
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .status(200)
        .json({ token });
    })
    .catch((error) => {
      next(error);
    });
};

// Controller function to get user information
const getUser = (req, res, next) => {
  const { _id } = req.user;
  // Find the user by ID and send their data as a response
  User.findById({ _id })
    .then((data) => {
      if (!data) {
        throw new NotFound(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// Controller function to sign out the user by clearing the JWT cookie
const signOut = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', { httpOnly: true })
      .status(200)
      .send(OK_SIGNOUT_ERROR_MESSAGE);
  } catch (error) {
    next(error);
  }
};

// Export the controller functions for use in routes
module.exports = {
  createUser,
  updateUser,
  login,
  getUser,
  signOut,
};
