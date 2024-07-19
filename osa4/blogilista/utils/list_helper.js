const dummy = (blogs) => 
{
	return 1;
};
  
const totalLikes = (blogs) => 
{
	return blogs.reduce( (sum, blog) =>
	{
		return sum + blog.likes;
	},  0);
};

const favoriteBlog = (blogs) =>
{
    let most = -1;
    let selectedBlog;
    blogs.map(blog => 
    {
        if(selectedBlog == undefined || blog.likes > most)
        {
            selectedBlog = blog; 
            most = blog.likes;
        }
    });
    return selectedBlog;
};

const mostBlogs = (blogs) =>
{
    let most = -1;
    let author;

    let blogAmounts = { };
    blogs.map( (blog) => 
    {
        if(!(blog.author in blogAmounts))
        {
            blogAmounts[blog.author] = 0;
        }
        blogAmounts[blog.author]++;
        if(!author || blogAmounts[blog.author] > most)
        {
            most = blogAmounts[blog.author];
            author = blog.author;
        }
    });
    return { author: author, blogs: most };
};

module.exports = 
{
	dummy, totalLikes, favoriteBlog, mostBlogs
};