import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => 
{
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notificationMsg, setNotificationMsg] = useState(null);

    const setErrorMessage = (message) =>
    {
        setNotificationMsg(message);
        setTimeout(() => 
        {        
            setNotificationMsg(null);
        }, 5000);    
    };

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
            setErrorMessage("Wrong credentials");     
        }
    }

    const handleLogout = async(event) =>
    {
        event.preventDefault();
        window.localStorage.removeItem("currentLogin");
        setUser(null);
    }

    /* Login screen */
    if(user === null) 
    {
        return  (
                    <div>
                        <h2>Log in to application</h2>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" onChange={({ target }) => setUsername(target.value)} required/><br/>

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={({ target }) => setPassword(target.value)} required/><br/>

                            <button type="submit">Login</button>
                        </form> 
                        <Notification message={notificationMsg}></Notification>
                    </div>
                );
    }
    /* Main screen (show blogs) */
    return  (   
                <div>
                    {user.name} logged in <button type="button" onClick={handleLogout}>Logout</button>
                    <h2>blogs</h2>
                    {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
                </div>
            );
}

export default App;