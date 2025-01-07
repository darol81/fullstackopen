import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogItem from '../components/BlogItem';

/* CSS */
import { AppContainer, Heading } from '../components/styles/styledComponents';

const Blogs = () =>
{
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blog);
    const user = useSelector(state => state.authentication); 

    useEffect(() => 
    {
        dispatch(initializeBlogs());
    }, [dispatch]);

    if (!blogs) 
    {
        return <div>Loading blogs...</div>;
    }
    return (
        <AppContainer>
            <div>
                <Heading>Blogs</Heading>
                {blogs.map(blog => 
                    <BlogItem key={blog.id} blog={blog} />
                )}
                <br/>
                <Togglable buttonLabel="New blog">
                    <BlogForm user={user} />
                </Togglable>
            </div>
        </AppContainer>
        
    );
}

export default Blogs;
