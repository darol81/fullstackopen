import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogItem from '../components/BlogItem';

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
                <BlogItem key={blog.id} blog={blog} />
            )}
            <br/>
            <Togglable buttonLabel="New blog">
                <BlogForm user={user} />
            </Togglable>
        </div>
    );
}

export default Blogs;
