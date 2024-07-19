const config = require("./utils/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

/* Route controllers */

const blogsRouter = require("./controllers/blogs");

/* Database Connection with Mongoose */

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI).then( () =>
{
	logger.info("Connected to MongoDB.");
}).catch( (error) =>
{
	logger.error("Error connecting to MongoDB:", error.message);
});


/* Middlewares */
app.use(cors());
//app.use(express.static('dist'));
app.use(express.json());

/* Morgan middleware */
morgan.token("body", request => JSON.stringify(request.body));
const tiny_format = ":method :url :status :res[content-length] - :response-time ms :body";
app.use(morgan(tiny_format));

/* Routes */

app.use("/api/blogs", blogsRouter);

/* Own middleware */
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;