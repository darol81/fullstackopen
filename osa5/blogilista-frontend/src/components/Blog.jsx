import { useState } from 'react'

const Blog = ({ blog }) => 
{
    const [inView, setInView] = useState(false);

    const blogStyle = 
    {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return  (
                <div>
                    <div style={blogStyle}>
                        {blog.title} {blog.author} <button onClick={() => setInView(!inView)}>{inView ? "Hide" : "View"}</button>
                    {inView &&  (
                                    <>
                                        <br/>
                                        {blog.url}<br/>
                                        likes {blog.likes} <button>Like</button><br/>
                                        {blog.user && blog.user.name}
                                    </>
                                )}            
                    </div>
                </div>
            );
}

export default Blog;
