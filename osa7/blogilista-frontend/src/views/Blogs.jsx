
import Blog from '../components/Blog';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';

const Blogs = ({ blogs, user }) =>
{
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog => 
                <Blog key={blog.id} blog={blog} user={user} />
            )}
            <br/>
            <Togglable buttonLabel="New blog">
                <BlogForm user={user} />
            </Togglable>
        </div>
    );
}

export default Blogs;
