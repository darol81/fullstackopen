const blogsRouter = require("express").Router();

/* Models */
const Blog = require("../models/blog");

/* POST routes */

blogsRouter.post("/", async(request, response) =>
{
	const { title, author, url, likes } = request.body;
	const blog = new Blog
	({
		title,
		author,
		url,
		likes: likes || 0
	});
	const result = await blog.save();
	response.status(201).json(result);
});

/* GET routes */

blogsRouter.get("/", async(request, response) =>
{
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) =>
{
	const blog = await Blog.findById(request.params.id);
	if(blog)
	{
		response.json(blog);
	}
	else
	{
		response.status(404).end();
	}
});

/* PUT routes */
blogsRouter.put("/:id", async (request, response) =>
{
	const body = request.body;

	const content = 
    {
    	title: body.title,
    	author: body.author,
    	url: body.url,
    	likes: body.likes,
    };
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, content,
    {
        new: true,
        runValidators: true,
        context: "query"
    });
	response.json(updatedBlog);
});

/* DELETE routes */

blogsRouter.delete("/:id", async (request, response) =>
{
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;