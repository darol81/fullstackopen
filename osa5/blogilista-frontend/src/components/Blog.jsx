import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

/*  Blog saa propsina myös listan blogeista ja sortBlogs-funktion. Niitä tarvitaan
    jotta blogien järjestystä voidaan muuttaa, kun klikataan like-näppäintä.
*/
const Blog = ({ blog, user, sortBlogs, blogs }) => 
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
            const resultBlog = await blogService.updateBlog(user.token, blog.id, updatedBlog);
            setCurrentBlog(resultBlog); // päivittää liket 
            const updatedBlogs = blogs.map(b => b.id === blog.id ? resultBlog : b);
            sortBlogs(updatedBlogs); // päivittää järjestyksen 
        } 
        catch(error) 
        {
            console.log("Error updating blog.")
        }
    };

    const handleRemoveButton = async() =>
    {
        try
        {
            if(confirm("Are you sure you want to delete "+ blog.title +" by "+ blog.author +"?") == true)
            {
                await blogService.deleteBlog(user.token, blog.id);
                setCurrentBlog(null);
                const updatedBlogs = blogs.filter(b => b.id !== blog.id);
                sortBlogs(updatedBlogs);
            }
        }
        catch(error)
        {
            console.log("Error deleting blog.");
        }
    };

    return (
        <div>
            <div className="blog" style={blogStyle}>
                {currentBlog.title} {currentBlog.author}<button onClick={() => setInView(!inView)}>{inView ? "Hide" : "View"}</button>
                {inView && (
                    <>
                        <br/>{currentBlog.url}<br />
                        likes {currentBlog.likes} <button onClick={handleLikeButton}>Like</button><br/>
                        {currentBlog.user && (
                            <span>
                                {currentBlog.user.name}
                            </span>
                        )}
                        {(user.username === (currentBlog.user && currentBlog.user.username)) && (
                            <div>
                                <button onClick={handleRemoveButton}>Remove</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

Blog.propTypes = 
{
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    sortBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
}

export default Blog;
