require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { reqLogger, errLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ratelimiter');
const errorhandler = require('./middlewares/errorhandler');
const router = require('./routes/index.js');

const { DB_URL } = process.env;
const PORT = 3000;

const app = express();

// Middlewares
app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(DB_URL);

// Request logging
app.use(reqLogger);

// Crash test route
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Rate limiter middleware
app.use(limiter);

// API routes
app.use(router);

// Error logging
app.use(errLogger);

// Celebrate error handling
app.use(errors());

// Custom error handling middleware
app.use(errorhandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
