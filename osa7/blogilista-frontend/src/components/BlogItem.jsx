
import PropTypes from 'prop-types'

import { StyledLink } from '../components/styles/styledComponents';
const BlogItem = ({ blog }) => 
{
    return (
        
            <div data-testid="blog">
                <StyledLink to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                </StyledLink>
            </div>
            
          );
};

BlogItem.propTypes = 
{
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}


export default BlogItem;
