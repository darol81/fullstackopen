const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

/* Route controllers */
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

/* Database Connection with Mongoose */
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
logger.info("Connecting to", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).then( () =>
{
	logger.info("Connected to MongoDB.");
}).catch( (error) =>
{
	logger.error("Error connecting to MongoDB:", error.message);
});

/* Middlewares */
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

/* Morgan middleware */
morgan.token("body", request => JSON.stringify(request.body));
const tiny_format = ":method :url :status :res[content-length] - :response-time ms :body";
app.use(morgan(tiny_format));

/* Routes */
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === 'test') 
{  
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}
/* Own middleware */
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;