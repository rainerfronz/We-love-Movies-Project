if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// const pinoHttp = require('pino-http');
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Middleware
// app.use(pinoHttp());
app.use(cors());
app.use(express.json());

// Routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not found handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
