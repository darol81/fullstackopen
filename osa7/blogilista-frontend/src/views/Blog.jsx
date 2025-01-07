import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { initializeBlogs } from "../reducers/blogReducer";
import './Blog.css';
import { likeBlog, deleteBlog, postComment } from "../reducers/blogReducer";

const Blog = () => 
{
    const { blogid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const blogs = useSelector(state => state.blog);
    const user = useSelector(state => state.authentication);
    const blog = blogs.find(b => b.id === blogid);

    const handleLikeButton = async () => 
    {
        dispatch(likeBlog(user, blog));
    };

    const handleRemoveButton = async () => 
    {
        if (confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) 
        {
            dispatch(deleteBlog(user, blog.id));
            navigate('/blogs');
        }
    };
    const handleAddComment = async () =>    
    {
        dispatch(postComment(user, blog, comment));
        setComment("");
    };
    
    useEffect(() => 
    {
        dispatch(initializeBlogs()); 
    }, [dispatch]);

    if (!blog) return <div>Blog not found.</div>;

   return (
            <div>
                <h2>{blog.title} by {blog.author}</h2>
                <a href={blog.url}>{blog.url}</a>
                <p>
                    Likes: {blog.likes} <button onClick={handleLikeButton}>Like</button>
                </p>
                {blog.user && <span>Added by {blog.user.name}</span>}
                {(user.username === (blog.user && blog.user.username)) && (
                    <div>
                        <button onClick={handleRemoveButton}>Remove</button>
                    </div>
                )}
                <br />
                {blog.comments && (
                    <div>
                        <div>
                            <h3>Comments</h3>
                            <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} required/>
                            <button onClick={handleAddComment}>Add comment</button>
                            
                            <ul>
                                {blog.comments.map((comment, index) => (
                                    <li key={index}>{comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
};

export default Blog;
