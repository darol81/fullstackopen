const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

/* Route controllers */

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

/* Database Connection with Mongoose */

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connectMongo()
{
	try
	{
		await mongoose.connect(config.MONGODB_URI);
		logger.info("Connected to MongoDB.");
	}
	catch(error)
	{
		logger.error("Error connecting to MongoDB:", error.message);
	}
}
connectMongo();

/* Middlewares */
app.use(cors());
//app.use(express.static('dist'));
app.use(express.json());

/* Morgan middleware */
if (process.env.NODE_ENV !== "test")
{
	morgan.token("body", request => JSON.stringify(request.body));
	const tiny_format = ":method :url :status :res[content-length] - :response-time ms :body";
	app.use(morgan(tiny_format));
}
/* Extractor middlewares */
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

/* Routes */
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if(process.env.NODE_ENV === "test") 
{  
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}
/* Other middleware */
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;