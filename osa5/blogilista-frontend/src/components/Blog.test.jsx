import { render } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('clicking the button calls event handler once', async () => 
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