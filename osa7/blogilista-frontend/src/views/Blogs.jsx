import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import Blog from '../components/Blog';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';

const Blogs = () =>
{
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blog);
    const user = useSelector(state => state.authentication); 

    useEffect(() => 
    {
        dispatch(initializeBlogs()); // Haetaan blogitiedot
    }, [dispatch]);

    if (!blogs) 
    {
        return <div>Loading blogs...</div>;
    }
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
