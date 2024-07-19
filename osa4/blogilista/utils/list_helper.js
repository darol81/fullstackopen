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
    let most = 0; 
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


module.exports = 
{
	dummy, totalLikes, favoriteBlog
};