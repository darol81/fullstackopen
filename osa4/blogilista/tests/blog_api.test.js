const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);
const Blog = require("../models/blog.js");

beforeEach(async() =>
{
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe("blog_api", () =>
{
    test("it returns correct amoung of blogs", async() =>
    {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test("it returns id as identifying field instead of _id", async() =>
    {
        const response = await api.get("/api/blogs");
        const blogs = response.body;

        blogs.forEach(blog => 
        {
            assert.ok(blog.id);
            assert.strictEqual(blog._id, undefined);
        });
    });
    test("it adds a blog with POST request", async() => 
    {
        const content = 
        {
            "title": "Mastery of PHP",
            "author": "Peter Pan",
            "url": "http://www.php.net",
            "likes": 21
        };
        const response = await api.post("/api/blogs/").send(content).expect('Content-Type', /application\/json/).expect(201);
        const savedBlog = await Blog.findById(response.body.id); 
        assert.strictEqual(savedBlog.title, content.title);
        assert.strictEqual(savedBlog.author, content.author);
        assert.strictEqual(savedBlog.url, content.url);
        assert.strictEqual(savedBlog.likes, content.likes);
    });
    test("it sets 0 likes if likes-property is not given", async() =>
    {
        const content = 
        {
            "title": "Java for Dummies",
            "author": "Warren Buffett",
            "url": "http://www.oracleofomaha.com"
        };
        const response = await api.post("/api/blogs/").send(content).expect('Content-Type', /application\/json/).expect(201);
        const savedBlog = await Blog.findById(response.body.id); 
        assert.strictEqual(savedBlog.likes, 0);
    });
    test("it responds with 400 Bad Request when title or url is missing", async() =>
    {
        const content = 
        {
            "title": "Learn Cobol in 4000 days",
            "author": "Christopher Kobold",
            "url": "http://www.cobol.net",
            "likes": 21
        };
        let blog = { ...content };
        delete blog.title;
        await api.post("/api/blogs/").send(blog).expect(400);
        blog = { ...content };
        delete blog.url;
        await api.post("/api/blogs/").send(blog).expect(400);
    }); 
});


after(async() =>
{
	await mongoose.connection.close();
});
