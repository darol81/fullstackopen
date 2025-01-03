const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");
describe("list_helper", () =>
{
	const listWithManyBlogs = testHelper.listWithManyBlogs;
	describe("totalLikes", () =>
	{
		test("when list has only one blog equals the likes of that", () =>
		{
			const listWithOneBlog =
            [
            	{
            		_id: "5a422aa71b54a676234d17f8",
            		title: "Go To Statement Considered Harmful",
            		author: "Edsger W. Dijkstra",
            		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            		likes: 5,
            		__v: 0
            	}
            ];
			const result = listHelper.totalLikes(listWithOneBlog);
			assert.strictEqual(result, 5);
		});
		test("when list has many blogs equals the likes of that", () =>
		{
			const result = listHelper.totalLikes(listWithManyBlogs);
			assert.strictEqual(result, 36);
		});
	});
	describe("favoriteBlog", () =>
	{
		test("favoriteBlog returns blog with most likes", () =>
		{
			const favoriteBlog = listHelper.favoriteBlog(listWithManyBlogs);
			const resultBlog =
            {
            	_id: "5a422b3a1b54a676234d17f9",
            	title: "Canonical string reduction",
            	author: "Edsger W. Dijkstra",
            	url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            	likes: 12,
            	__v: 0
            };
			assert.deepEqual(favoriteBlog, resultBlog);
		});
	});
	describe("mostBlogs", () =>
	{
		test("mostBlogs returns author with most written blogs", () =>
		{
			const resultObj = listHelper.mostBlogs(listWithManyBlogs);
			const compareObj =
            {
            	author: "Robert C. Martin",
            	blogs: 3
            };
			assert.deepEqual(resultObj, compareObj);
		});
	});
	describe("mostLikes", () =>
	{
		test("mostLikes returns author with most likes", () =>
		{
			const resultObj = listHelper.mostLikes(listWithManyBlogs);
			const compareObj =
            {
            	author: "Edsger W. Dijkstra",
            	likes: 17
            };
			assert.deepEqual(resultObj, compareObj);
		});
	});
});