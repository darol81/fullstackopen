import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { initializeBlogs } from "../reducers/blogReducer";
import { likeBlog, deleteBlog, postComment } from "../reducers/blogReducer";

/* CSS */  
import { AppContainer, Heading, SubHeading, Button, Input, Text, StyledLink, StyledList, StyledListItem } from '../components/styles/styledComponents';

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
            <AppContainer>
                <div>
                    <Heading>{blog.title} by {blog.author}</Heading>
                    <StyledLink href={blog.url}>{blog.url}</StyledLink>
                    <Text>
                        Likes: {blog.likes} <Button onClick={handleLikeButton}>Like</Button>
                    </Text> 
                    {blog.user && <span>Added by {blog.user.name}</span>}
                    {(user.username === (blog.user && blog.user.username)) && (
                        <div>
                            <Button onClick={handleRemoveButton}>Remove</Button>
                        </div>
                    )}
                    <br />
                    {blog.comments && (
                        <div>
                            <div>
                                <SubHeading>Comments</SubHeading>
                                <Input type="text" value={comment} onChange={({ target }) => setComment(target.value)} required/>
                                <Button onClick={handleAddComment}>Add comment</Button>
                                
                                <StyledList>
                                    {blog.comments.map((comment, index) => (
                                        <StyledListItem key={index}>{comment}</StyledListItem>
                                    ))}
                                </StyledList>
                            </div>
                        </div>
                    )}
                </div>
            </AppContainer>
        );
};

export default Blog;
