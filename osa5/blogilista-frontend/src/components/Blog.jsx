import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, token }) => 
{
    const [inView, setInView] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(blog);
    const blogStyle = 
    {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLikeButton = async(token, id) =>
    {
        let curBlog = await blogService.getbyID(id);
        curBlog.likes = curBlog.likes + 1;
        const updatedBlog = await blogService.updateBlog(token, id, curBlog);
        setCurrentBlog(updatedBlog);
    }

    return  (
                <div>
                    <div style={blogStyle}>
                        {currentBlog.title} {currentBlog.author} <button onClick={() => setInView(!inView)}>{inView ? "Hide" : "View"}</button>
                    {inView &&  (
                                    <>
                                        <br/>
                                        {currentBlog.url}<br/>
                                        likes {currentBlog.likes} <button onClick={() => handleLikeButton(token, currentBlog.id)}>Like</button><br/>
                                        {currentBlog.user && currentBlog.user.name}
                                    </>
                                )}            
                    </div>
                </div>
            );
}

export default Blog;
