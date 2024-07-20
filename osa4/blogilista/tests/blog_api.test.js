const { test, after, beforeEach } = require("node:test");
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

test("it returns correct amoung of blogs", async() =>
{
	const response = await api.get("/api/blogs");
	assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

after(async() =>
{
	await mongoose.connection.close();
});
