import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => 
{
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const inform = (msg, type) =>
    {
        setNotification({ message: msg, type: type });
        setTimeout(() => 
        {          
            setNotification(null);
        }, 5000);
    }

    useEffect(() => 
    {
        blogService.getAll().then(blogs => setBlogs(blogs));
    }, []);

    useEffect(() => 
    {
        const LoggedInUser = window.localStorage.getItem("currentLogin");
        if(LoggedInUser)
        {
            const userJSON = JSON.parse(LoggedInUser);
            setUser(userJSON);
        }
    }, []);

    const handleLogout = async(event) =>
    {
        event.preventDefault();
        window.localStorage.removeItem("currentLogin");
        setUser(null);
    }
    const handleLogin = async(event) => 
    {    
        event.preventDefault();  
        try 
        {      
            const user = await loginService.login({ username, password, }); 
            window.localStorage.setItem("currentLogin", JSON.stringify(user));
            setUser(user);
            setUsername("");
            setPassword("");    
        } 
        catch(exception) 
        {     
            inform("Wrong credentials", "error");
        }
    }
    const handleBlogSubmit = async(event) =>
    {
        event.preventDefault();
        try
        {
            const newBlog = await blogService.postBlog(user.token, { title, author, url });
            setBlogs([...blogs, newBlog]); 
            setTitle("");            
            setAuthor("");
            setUrl("");
            inform("Blog "+ newBlog.title +" by "+ newBlog.author +" added successfully.", "success");
        }
        catch(exception)
        {
            inform("Couldn't create blog.", "error");
        }
    }
    /* Login screen */
    if(user === null) 
    {
        return  (
                    <div>
                        <h2>Log in to application</h2>
                        <Notification data={notification}></Notification>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" onChange={({ target }) => setUsername(target.value)} required/><br/>

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={({ target }) => setPassword(target.value)} required/><br/>

                            <button type="submit">Login</button>
                        </form> 
                    </div>
                );
    }
    /* Main screen (show blogs) */
    return  (   
                <div>
                    {user.name} logged in <button type="button" onClick={handleLogout}>Logout</button>
                    <Notification data={notification}></Notification>
                    <h2>Blogs</h2>
                    {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
                    <br></br>
                    <Togglable buttonLabel="New note">
                        <h2>Create new</h2>
                            <form onSubmit={handleBlogSubmit}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" name="title" onChange={({ target }) => setTitle(target.value)} /><br/>
                                <label htmlFor="author">Author:</label>
                                <input type="text" id="author" name="author" onChange={({ target }) => setAuthor(target.value)} /><br/>
                                <label htmlFor="url">Url:</label>
                                <input type="url" id="url" name="url" onChange={({ target }) => setUrl(target.value)} /><br/>
                                <button type="submit">Create</button>
                            </form>
                    </Togglable>
                </div>

            );
}

export default App;