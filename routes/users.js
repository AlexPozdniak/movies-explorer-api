// Import necessary modules and controllers
const usersRouter = require('express').Router();
const { updateUser } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const validation = require('../middlewares/validation');

// Define routes for user-related operations
usersRouter.get('/me', getUser); // Route to retrieve user profile information

usersRouter.patch('/me', validation.validateUser, updateUser); // Route to update user profile

module.exports = usersRouter; // Export the usersRouter for use in the application
