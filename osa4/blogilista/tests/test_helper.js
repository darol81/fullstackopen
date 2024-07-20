const Blog = require("../models/blog");

const initialBlogs =
[
	{
		"title": "Mastering JavaScript",
		"author": "Jane Doe",
		"url": "http://www.jsmastery.com",
		"likes": 120,
	},
	{
		"title": "Understanding React Hooks",
		"author": "Emily Davis",
		"url": "http://www.reactinsights.com",
		"likes": 95,
	},
	{
		"title": "Python for Data Science",
		"author": "John Smith",
		"url": "http://www.datasciencenow.com",
		"likes": 85,
	},
	{
		"title": "Building APIs with Express",
		"author": "Alex Johnson",
		"url": "http://www.expressapi.com",
		"likes": 68,
	}
];

module.exports =
{
	initialBlogs
};