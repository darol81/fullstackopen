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

const countMost = (blogs, callbackFunc, valueKey) => 
{
    let most = -1;
    let author;

    let blogAmounts = { };
    blogs.forEach( (blog) => 
    {
        if (!(blog.author in blogAmounts)) 
        {
            blogAmounts[blog.author] = 0;
        }
        blogAmounts[blog.author] += callbackFunc(blog);
        if (!author || blogAmounts[blog.author] > most) 
        {
            most = blogAmounts[blog.author];
            author = blog.author;
        }
    });
    return { author: author, [valueKey]: most };
};

const mostLikes = (blogs) =>
{
    return countMost(blogs, blog => blog.likes, "likes"); // haetaan blogin likemäärät
};

const mostBlogs = (blogs) =>
{
    return countMost(blogs, () => 1, "blogs"); // jokainen blogi palauttaa ykkösen, lasketaan blogien määrää foreachin sisällä.
}

module.exports = 
{
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};