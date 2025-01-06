import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Notification from './components/Notification';

import loginService from './services/login';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/authenticationReducer';
import { useState, useEffect } from 'react';

/* Views */
import Blogs from './views/Blogs';
import Users from './views/Users'; 
import User from './views/User';

/* CSS */
import './App.css';

const App = () => 
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const user = useSelector(state => state.authentication);

    const inform = (msg, type) => 
    {
        dispatch(setNotification(msg, type, 5)); // Redux
    };

    useEffect(() => 
    {
        const LoggedInUser = window.localStorage.getItem("currentLogin");
        if(LoggedInUser) 
        {
            const userJSON = JSON.parse(LoggedInUser);
            dispatch(setUser(userJSON)); // Redux
        }
    }, []);

    const handleLogout = async (event) => 
    {
        event.preventDefault();
        window.localStorage.removeItem("currentLogin");
        dispatch(setUser(null)); // Redux
    }

    const handleLogin = async (event) => 
    {    
        event.preventDefault();  
        try 
        {      
            const user = await loginService.login({ username, password }); 
            window.localStorage.setItem("currentLogin", JSON.stringify(user));
            dispatch(setUser(user)); // Redux
            setUsername("");
            setPassword("");    
        } 
        catch (exception) 
        {     
            inform("Wrong credentials", "error");
        }
    }

    if(user === null) 
    {
        return (
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

    return (
        <Router>
            <div>
                {user.name} logged in <button type="button" onClick={handleLogout}>Logout</button>
                <Notification/>
                <nav>
                    <Link className="nav-link" to="/blogs">Blogs</Link>
                    <Link className="nav-link" to="/users">Users</Link>
                </nav>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:userid" element={<User />} /> 
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/" element={<Blogs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
