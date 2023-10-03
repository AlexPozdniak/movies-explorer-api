// Import necessary modules and routers
const router = require('express').Router();
const usersRouter = require('./users');
const { login, createUser, signOut } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const validation = require('../middlewares/validation');
const filmsRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const {
  NOT_FOUND_PAGE_ERROR_MESSAGE,
} = require('../utils/constans');

// Set up routes and middleware for various API endpoints

router.post('/signin', validation.validateSignin, login); // Route for user sign-in with input validation

router.post('/signup', validation.validateSignup, createUser); // Route for user sign-up with input validation

router.use(auth);

router.use('/users', usersRouter); // Route for user-related endpoints with authentication

router.use('/movies', filmsRouter); // Route for movie-related endpoints with authentication

router.post('/signout', signOut); // Route for user sign-out with authentication

router.use('*', () => {
  throw new NotFound(NOT_FOUND_PAGE_ERROR_MESSAGE);
  // Handle requests for undefined routes with a "Not Found" error
});

module.exports = router; // Export the router for use in the application
