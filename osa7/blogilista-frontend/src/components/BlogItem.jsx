import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
/*  Blog saa propsina myös listan blogeista ja sortBlogs-funktion. Niitä tarvitaan
    jotta blogien järjestystä voidaan muuttaa, kun klikataan like-näppäintä.
*/
const BlogItem = ({ blog, user }) => 
{
    const [inView, setInView] = useState(false); // näkyvissä vai ei
    const dispatch = useDispatch();
  
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
        dispatch(likeBlog(user, blog));
    };

    const handleRemoveButton = async() =>
    {
        if(confirm("Are you sure you want to delete "+ blog.title +" by "+ blog.author +"?") == true)
        {
            dispatch(deleteBlog(user, blog.id));
        }     
    };

    return (
        <div data-testid="blog">
            <div className="blog" style={blogStyle}>
                {blog.title} {blog.author}<button onClick={() => setInView(!inView)}>{inView ? "Hide" : "View"}</button>
                {inView && (
                    <>
                        <br/>{blog.url}<br />
                        <span data-testid="likes">likes {blog.likes}</span><button onClick={handleLikeButton}>Like</button><br/>
                        {blog.user && (
                            <span>
                                {blog.user.name}
                            </span>
                        )}
                        {(user.username === (blog.user && blog.user.username)) && (
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

BlogItem.propTypes = 
{
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default BlogItem
