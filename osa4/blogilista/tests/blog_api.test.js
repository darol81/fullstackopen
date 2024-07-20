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
});


after(async() =>
{
	await mongoose.connection.close();
});
