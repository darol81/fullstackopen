import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import './Users.css';   // CSS

const Users = () =>
{
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user);
    
    useEffect(() => 
    {
        dispatch(initializeUsers());
    }, [dispatch]);

    if(userList === null) return null;
    return (
        <div className="users-container">
            <h2>Users</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th className="users-table-header">Username</th>
                        <th className="users-table-header">Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user.id} className="users-table-row">
                            <td className="users-table-cell">
                                <Link to={`/users/${user.id}`} className="users-link">{user.name}</Link>
                            </td>
                            <td className="users-table-cell">{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;

