// Import necessary modules and error classes
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const {
  CREATED_OK,
  NOT_FOUND_MOVIE_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/constans'); // Import constants
const Movie = require('../models/movie'); // Import the Movie model

// Controller function to get a list of films for the authenticated user
const getFilms = (req, res, next) => {
  const owner = req.user._id; // Get the user's ID from the request object
  // Find movies that belong to the user and send the data as a response
  Movie.find({ owner })
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      next(error); // Pass any errors to the error handling middleware
    });
};

// Controller function to create a new film record
const createFilm = (req, res, next) => {
  // Extract film details from the request body
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id; // Get the user's ID from the request object
  // Create a new Movie document with the provided details and owner information
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((data) => {
      res.status(CREATED_OK).send({ data }); // Respond with the created movie data
    })
    .catch((error) => {
      next(error); // Pass any errors to the error handling middleware
    });
};

// Controller function to delete a film by its ID
const deleteFilm = (req, res, next) => {
  const { _id } = req.params; // Get the movie ID from the request parameters
  const userId = req.user._id; // Get the user's ID from the request object
  // Find the movie by ID
  Movie.findOne({ _id })
    .then((movie) => {
      if (!movie) {
        // If the movie is not found, throw a NotFoundError
        throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
      }
      if (userId !== movie.owner._id.toString()) {
        // If the user doesn't own the movie, throw a Forbidden error
        throw new Forbidden(FORBIDDEN_ERROR_MESSAGE);
      }
      // If the user owns the movie, remove it by its ID
      Movie.findByIdAndRemove(_id)
        .then((data) => {
          if (!data) {
            // If the movie is not found (again), throw a NotFoundError
            throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
          }
          res.send({ data }); // Respond with the deleted movie data
        })
        .catch((error) => {
          next(error); // Pass any errors to the error handling middleware
        });
    })
    .catch((error) => {
      next(error); // Pass any errors to the error handling middleware
    });
};

// Export the controller functions for use in routes
module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};
