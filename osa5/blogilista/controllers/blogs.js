const blogsRouter = require("express").Router();

/* Models */
const Blog = require("../models/blog");
const User = require("../models/user");

/* POST routes */
blogsRouter.post("/", async(request, response) =>
{
	const { title, author, url, likes } = request.body;
	const userId = request.user;

	if(!userId)
	{
		return response.status(401).json({ error: "token invalid" });
	}
	const user = await User.findById(userId);
 	const blog = new Blog
	({
		title,
		author,
		url,
		likes: likes || 0,
		user: user._id
	});

	const result = await blog.save();
	user.blogs = user.blogs.concat(result._id);
	await user.save();
	response.status(201).json(result);
});

/* GET routes */

blogsRouter.get("/", async(request, response) =>
{
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 , id: 1 });
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
	const blog = await Blog.findById(request.params.id);
	if (!blog)
	{
		return response.status(404).json({ error: "Blog not found" });
	}
	const user = request.user;
	if(!user)
	{
		return response.status(401).json({ error: "token invalid" });
	}
	/* Katsotaan, että blogin kirjoittaja ja poistaja on sama */
	if(blog.user._id.toString() !== user)
	{
	    return response.status(401).json({ error: "unauthorized deletion" });
	}
	await Blog.findByIdAndDelete(request.params.id);
	await User.findByIdAndUpdate(blog.user._id, { $pull: { blogs: blog._id } });
	response.status(204).end();
});

module.exports = blogsRouter;