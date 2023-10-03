// Import necessary modules and controllers
const filmsRouter = require('express').Router();
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');
const validation = require('../middlewares/validation');

// Define routes for movie-related operations
filmsRouter.get('/', getFilms); // Route to retrieve a list of films

filmsRouter.post('/', validation.validateFilm, createFilm); // Route to create a new film with input validation

filmsRouter.delete('/:_id', validation.validateFilmId, deleteFilm); // Route to delete a film by its ID with input validation

module.exports = filmsRouter; // Export the filmsRouter for use in the application
