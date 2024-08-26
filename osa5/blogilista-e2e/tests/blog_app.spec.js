
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

    const loginWith = async(page, username, password) =>
    {
        await page.getByTestId("username").fill(username);
        await page.getByTestId("password").fill(password);
        await page.getByRole("button", { name: "Login" }).click() 
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
});


  