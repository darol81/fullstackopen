import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => 
{
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    /* Type voi olla error tai success. Jos on jotain muuta, ei CSS tunnista */
    const inform = (msg, type) =>
    {
        setNotification({ message: msg, type: type });
        setTimeout(() => 
        {          
            setNotification(null);
        }, 5000);
    }

    /* Järjestetään suurimmasta pienimpään, ja merkataan blogs stateen */
    const sortBlogs = (list) => 
    {
        const sortedBlogs = [...list].sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
    };

    useEffect(() => 
    {   
        const fetchBlogs = async () => 
        {
            const tmp = await blogService.getAll();
            sortBlogs(tmp); // Järjestetään blogit oikeaan järjestykseen heti aluksi
        };
        fetchBlogs();
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


    const handleBlogSubmit = async (title, author, url) => 
    {
        try 
        {
            const newBlog = await blogService.postBlog(user.token, { title, author, url });
            newBlog.user = { username: user.username, name: user.name, id: user.id }; 
            sortBlogs([...blogs, newBlog]);
            inform("Blog " + newBlog.title + " by " + newBlog.author + " added successfully.", "success");
        } 
        catch (exception) 
        {
            inform("Couldn't create blog.", "error");
        }
    }

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
    /* Login screen */
    if(user === null) 
    {
        return  (
                    <div>
                        <h2>Log in to application</h2>
                        <Notification data={notification}></Notification>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" data-testid="username" onChange={({ target }) => setUsername(target.value)} required/><br/>

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" data-testid="password" onChange={({ target }) => setPassword(target.value)} required/><br/>

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
                    {blogs.map(blog => 
                        <Blog key={blog.id} blog={blog} user={user} sortBlogs={sortBlogs} blogs={blogs}/>
                    )}
                    <br></br>
                    
                    <Togglable buttonLabel="New note">
                        <BlogForm submitHandler={handleBlogSubmit}/>
                    </Togglable>
                </div>

            );
}

export default App;