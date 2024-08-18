import { useState } from 'react'
import blogService from '../services/blogs'

/*  Blog saa propsina myös listan blogeista ja sortBlogs-funktion. Niitä tarvitaan
    jotta blogien järjestystä voidaan muuttaa, kun klikataan like-näppäintä.
*/
const Blog = ({ blog, token, sortBlogs, blogs }) => 
{
    const [inView, setInView] = useState(false); // näkyvissä vai ei
    const [currentBlog, setCurrentBlog] = useState(blog); // jotta liket päivittyisi, seurataan statea
    const blogStyle = 
    {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLikeButton = async () => 
    {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        try 
        {
            const resultBlog = await blogService.updateBlog(token, blog.id, updatedBlog);
            setCurrentBlog(resultBlog); // päivittää liket 
            const updatedBlogs = blogs.map(b => b.id === blog.id ? resultBlog : b);
            sortBlogs(updatedBlogs); // päivittää järjestyksen 
        } 
        catch(error) 
        {
            console.error('Error updating blog:', error);
        }
    };

    return  (
                <div>
                    <div style={blogStyle}>
                        {currentBlog.title} {currentBlog.author} <button onClick={() => setInView(!inView)}>{inView ? "Hide" : "View"}</button>
                    {inView &&  (
                                    <>
                                        <br/>
                                        {currentBlog.url}<br/>
                                        likes {currentBlog.likes} <button onClick={handleLikeButton}>Like</button><br/>
                                        {currentBlog.user && currentBlog.user.name}
                                    </>
                                )}            
                    </div>
                </div>
            );
}

export default Blog;
