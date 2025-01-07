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
import Blog from './views/Blog';

/* CSS */

import { AppContainer, Nav, Button, Input, LoginForm, Text, Heading } from './components/styles/styledComponents';

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
                <AppContainer>
                    <div>
                            <Heading>Login</Heading> 
                            <Notification/>
                            <LoginForm onSubmit={handleLogin}>
                                <label htmlFor="username">Username</label>
                                <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="password">Password</label>
                                <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button type="submit">Login</Button>
                            </LoginForm>
                        </div>
                </AppContainer>
        );
    }

    return (
        <Router>
            <AppContainer>
                <div>
                    <Text>{user.name} logged in <Button type="button" onClick={handleLogout}>Logout</Button></Text>
                    <Notification/>
                    <Nav>
                        <Link className="nav-link" to="/blogs">Blogs</Link>
                        <Link className="nav-link" to="/users">Users</Link>
                    </Nav>
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:userid" element={<User />} /> 
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:blogid" element={<Blog />} />
                        <Route path="/" element={<Blogs />} />
                    </Routes>
                </div>
            </AppContainer>
        </Router>
    );
}

export default App;
