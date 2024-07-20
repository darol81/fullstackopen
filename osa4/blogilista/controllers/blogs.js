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

module.exports = blogsRouter;