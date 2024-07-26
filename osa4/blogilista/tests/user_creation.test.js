const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);
const User = require('../models/user');

describe("user creation", () =>
{
    /* testejä */
    test("it returns with 400 status code if password is missing", async() =>
    {
		const user = 
        {
            "username": "testuser",
            "name": "Test User"
        };
        // returns 400 if password missing 
        await api.post("/api/users").send(user).expect(400);
    });
    test("it returns with 400 status code password is too short ", async() =>
    {
		const user = 
        {
            "username": "testuser",
            "name": "Test User",
            "password": "sa" // should be minimum of 3 
        };
        // returns 400 if password too short
        await api.post("/api/users").send(user).expect(400);
    });
    test("it returns with 400 status code if username doesn't exist", async() =>
    {
		const user = 
        {
            "name": "Test User",
            "password": "password"
        };
        // username must exist
        await api.post("/api/users").send(user).expect(400);
    });
    test("it returns with 400 status code if username is too short", async() =>
    {
		const user = 
        {
            "username": "te", // should be minimum of 3 
            "name": "Test User",
            "password": "password"
        };
        // username is too short 
        await api.post("/api/users").send(user).expect(400);
    });
    test("it returns with 400 status code if username is not unique", async() =>
    {
		const user = 
        {
            "username": "testuser", // should be minimum of 3 
            "name": "Test User",
            "password": "password"
        };
        await api.post("/api/users").send(user).expect(201); // first should work
        await api.post("/api/users").send(user).expect(400); // second shouldn't because uniqueness is required 
    });
});

after(async() =>
{
    await User.deleteMany({}); // Poistetaan kaikki käyttäjät testikannasta, jotta unique-testi toimii jatkossakin.
	await mongoose.connection.close();
});
