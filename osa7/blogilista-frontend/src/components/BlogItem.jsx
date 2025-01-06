import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const BlogItem = ({ blog }) => 
{
    const blogStyle = 
    {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }; 
    return (
        <div data-testid="blog">
            <div className="blog" style={blogStyle}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                </Link>
            </div>
        </div>
    );
};

BlogItem.propTypes = 
{
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}


export default BlogItem;
