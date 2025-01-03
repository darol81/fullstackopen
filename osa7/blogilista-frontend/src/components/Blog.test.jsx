import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs';
import { vi } from 'vitest';
import { afterEach } from 'vitest';

afterEach(() => 
{
    vi.clearAllMocks(); 
});

describe("<Blog/>:", () =>
{
    /* Samoja vakioita voi käyttää useammassakin testissä */
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
    };
    const blogs = [];

    test("it renders blog and title without url or likes ", async() => 
    {
        const mockHandler = vi.fn();
        const { container } = render( <Blog key={blog.id} blog={blog} user={userObj} sortBlogs={mockHandler} blogs={blogs}/> );
        const div = container.querySelector(".blog");
        expect(div).toHaveTextContent("Testing with Vitest Tom Tester");
        expect(div).not.toHaveTextContent("http://www.testingwithtom.com");
        expect(div).not.toHaveTextContent("likes 15");
    });
    test("It renders url, likes and author when View is clicked", async() => 
    {
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
    test("handler gets called twice, when Like-button is clicked twice.", async() =>
    {
        vi.mock('../services/blogs'); // Mockataan blogservice
        const mockHandler = vi.fn();
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        blogService.updateBlog.mockResolvedValue(updatedBlog); 

        render( <Blog key={blog.id} blog={blog} user={userObj} sortBlogs={mockHandler} blogs={blogs}/> );
        const user = userEvent.setup();
        const viewButton = screen.getByText("View");
        await user.click(viewButton);

        const likeButton = screen.getByText("Like");
        await user.click(likeButton);
        await user.click(likeButton);
        // Like-button kutsuu sortblogs, joka on mockattu mockHandlerilla.
        expect(mockHandler).toHaveBeenCalledTimes(2);
    });
});


