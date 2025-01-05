import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';


const App = () => 
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blog);

    /* Type voi olla error tai success. Jos on jotain muuta, ei CSS tunnista */
    const inform = (msg, type) =>
    {
        dispatch(setNotification(msg, type, 5)); // Redux
    };
    useEffect(() => 
    {   
        const fetchBlogs = async () => 
        {
            dispatch(initializeBlogs()); // Redux
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
                        <Notification/>
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
                    <Notification/>
                    <h2>Blogs</h2>
                    {blogs.map(blog => 
                        <Blog key={blog.id} blog={blog} user={user}/>
                    )}
                    <br></br>
                    
                    <Togglable buttonLabel="New blog">
                        <BlogForm user={user}/>
                    </Togglable>
                </div>

            );
}

export default App;