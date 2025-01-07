import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";

/* CSS */  
import { AppContainer, Heading, UsersTableHeader, UsersTable, StyledLink, UsersTableRow, UsersTableCell } from '../components/styles/styledComponents';

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
        <AppContainer>        
                <Heading>Users</Heading>
                <UsersTable>
                    <thead>
                        <tr>
                            <UsersTableHeader>Username</UsersTableHeader>
                            <UsersTableHeader>Blogs created</UsersTableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => (
                            <UsersTableRow key={user.id}>
                                <UsersTableCell>
                                    <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
                                </UsersTableCell>
                                <UsersTableCell>{user.blogs.length}</UsersTableCell>
                            </UsersTableRow>
                        ))}
                    </tbody>
                </UsersTable>
        </AppContainer>
    );
}

export default Users;

