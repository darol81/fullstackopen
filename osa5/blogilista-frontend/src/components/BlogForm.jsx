import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitHandler }) => 
{
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    
    const handler = async(event) => 
    {
        event.preventDefault();
        await submitHandler(title, author, url);
        setTitle("");            
        setAuthor("");
        setUrl("");
    }
    return  (
                <>
                    <h2>Create new</h2>
                        <form onSubmit={handler}>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)}/><br/>
                            <label htmlFor="author">Author:</label>
                            <input type="text" id="author" name="author" onChange={(event) => setAuthor(event.target.value)} /><br/>
                            <label htmlFor="url">Url:</label>
                            <input type="url" id="url" name="url" onChange={(event) => setUrl(event.target.value)} /><br/>
                            <button type="submit">Create</button>
                        </form>            
                </>
            );
}

BlogForm.propTypes = 
{
    submitHandler: PropTypes.func.isRequired
}

export default BlogForm;