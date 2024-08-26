
const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Blog App", () => 
{
    beforeEach(async ({ page, request }) => 
    {    
        await request.post("/api/testing/reset");
        await request.post("/api/users",
        {
            data: 
            {
                name: "Teppo Testaaja", 
                username: "teppo",
                password: "salasana"
            }
        });
        await page.goto("/");
    })

    /* Apufunktio Loginiin */
    const loginWith = async(page, username, password) =>
    {
        await page.getByTestId("username").fill(username);
        await page.getByTestId("password").fill(password);
        await page.getByRole("button", { name: "Login" }).click() 
    }
    /* Apufunktio Blogin luontiin */
    const createBlog = async (page, title, author, url) => 
    {  
        await page.getByRole("button", { name: "New note" }).click();
        await page.getByTestId("title").fill(title);
        await page.getByTestId("author").fill(author);
        await page.getByTestId("url").fill(url);
        await page.getByRole("button", { name: "Create" }).click();
    }

    test("Login form is shown", async ({ page }) => 
    {
        await expect(page.getByRole("heading", { name: "Log in to application" })).toBeVisible();
    });
    
    describe("Login", () =>
    {
        test("succeeds with correct credentials", async ({ page }) => 
        {
            await loginWith(page, "teppo", "salasana");
            await expect(page.getByText("Teppo Testaaja logged in")).toBeVisible();
        }); 
        test("fails with wrong credentials", async ({ page }) => 
        {
            await loginWith(page, "teppo", "wrong");
            const errorDiv = await page.locator(".error");
            await expect(errorDiv).toContainText("Wrong credentials");
            await expect(errorDiv).toHaveCSS("border-style", "solid");
            await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
        });
    });
    describe('When logged in', () => 
    {
        beforeEach(async ({ page }) => 
        {
            await loginWith(page, "teppo", "salasana");
        });

        test("a new blog can be created", async ({ page }) => 
        {
            await createBlog(page, "Test blog", "Teppo Testaaja", "http://www.teppo.com");
            await expect(page.getByText("Test blog Teppo Testaaja")).toBeVisible();
        });
        test("a blog can be liked", async ({ page }) => 
        {
            await createBlog(page, "Test blog", "Teppo Testaaja", "http://www.teppo.com");
            await page.getByRole("button", { name: "View" }).click();
            await expect(page.getByText("likes 0")).toBeVisible();
            await page.getByRole("button", { name: "Like" }).click();
            await expect(page.getByText("likes 1")).toBeVisible();
        });
    });
});


