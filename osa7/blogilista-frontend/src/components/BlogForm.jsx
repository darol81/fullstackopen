import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer';

/* Css */
import { AppContainer, Heading, Input, Button } from '../components/styles/styledComponents';

const BlogForm = ({ user }) => 
{
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    
    const handler = async(event) => 
    {
        event.preventDefault();
        dispatch(createBlog(user, title, author, url));
        setTitle("");            
        setAuthor("");
        setUrl("");   
    }
    return  (
                <AppContainer>    
                   
                    <Heading>Create new</Heading>
                    <form onSubmit={handler}>
                        <label htmlFor="title">Title:</label>
                        <Input type="text" id="title" name="title" value={title} data-testid="title" onChange={(event) => setTitle(event.target.value)}/><br/>
                        <label htmlFor="author">Author:</label>
                        <Input type="text" id="author" name="author" value={author} data-testid="author" onChange={(event) => setAuthor(event.target.value)} /><br/>
                        <label htmlFor="url">Url:</label>
                        <Input type="url" id="url" name="url" value={url} data-testid="url" onChange={(event) => setUrl(event.target.value)} /><br/>
                        <Button type="submit">Create</Button>
                    </form>            
                </AppContainer>
            );
}

BlogForm.propTypes = 
{
    submitHandler: PropTypes.func.isRequired
}

export default BlogForm;