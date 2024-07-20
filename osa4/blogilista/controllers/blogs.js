const blogsRouter = require("express").Router();

/* Models */
const Blog = require("../models/blog");

/* POST routes */

blogsRouter.post("/", async(request, response) =>
{
	const blog = new Blog(request.body);
	const result = await blog.save();
	response.status(201).json(result);
});

/* GET routes */

blogsRouter.get("/", async(request, response) =>
{
	const blogs = await Blog.find({});
	response.json(blogs);
});

module.exports = blogsRouter;