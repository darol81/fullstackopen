import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe("<Blog/>:", () =>
{
    test("it renders blog and title without url or likes ", async() => 
    {
        const user =
        {
            name: "Tom Tester",
            token: "abc"
        }
        const blog = 
        {
            id: "abc",
            title: "Testing with Vitest",
            author: "Tom Tester",
            url: "http://www.testingwithtom.com",
            likes: 15,
        };
        const blogs = [];

        const mockHandler = vi.fn();
        const { container } = render( <Blog key={blog.id} blog={blog} user={user} sortBlogs={mockHandler} blogs={blogs}/> );
        const div = container.querySelector(".blog");
        expect(div).toHaveTextContent("Testing with Vitest Tom Tester");
        expect(div).not.toHaveTextContent("http://www.testingwithtom.com");
        expect(div).not.toHaveTextContent("likes 15");
    });
    test("It renders url, likes and author when View is clicked", async() => 
    {
        const userObj =
        {
            name: "Tom Tester",
            token: "abc"
        }
        const blog = 
        {
            id: "abc",
            title: "Testing with Vitest",
            author: "Tom Tester",
            url: "http://www.testingwithtom.com",
            likes: 15,
            user: 
            {   
                username: "tom",
                name: "Tom Tester",
                id: "abc"
            },
        };
        const blogs = [];

        const mockHandler = vi.fn();
        const { container } = render( <Blog key={blog.id} blog={blog} user={userObj} sortBlogs={mockHandler} blogs={blogs}/> );
        const div = container.querySelector(".blog");

        const user = userEvent.setup();
        const button = screen.getByText("View");
        await user.click(button);
        expect(div).toHaveTextContent("http://www.testingwithtom.com");
        expect(div).toHaveTextContent("likes 15");
        expect(div).toHaveTextContent("Tom Tester");
    });
});


