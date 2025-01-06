import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

const User = () => 
{
    const { userid } = useParams(); 
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user);
    const user = userList.find(u => u.id === userid);

    useEffect(() => 
    {
        dispatch(initializeUsers());
    }, [dispatch]);

    if(userList === null || user == null) return null;
 
    return (
            <div>   
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>   
                <ul>
                    {user.blogs.map(blog => (
                        <li key={blog.id}>{blog.title}</li>
                    ))} 
                </ul>
            </div>  
    );
}

export default User;
