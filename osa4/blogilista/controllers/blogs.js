const blogsRouter = require("express").Router();

/* Models */
const Blog = require("../models/blog");

/* POST routes */

blogsRouter.post("/", (request, response, next) => 
{
    const blog = new Blog(request.body)

    blog.save().then(result => 
    {    
        response.status(201).json(result);
    }).catch(error => next(error));
});

/* GET routes */

blogsRouter.get("", (request, response, next) => 
{
    Blog.find({}).then(blogs => 
    {
        response.json(blogs);
    }).catch(error => next(error));
});

module.exports = blogsRouter;