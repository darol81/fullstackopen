import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

/* CSS */  
import { AppContainer, Heading, SubHeading, StyledList, StyledListItem } from '../components/styles/styledComponents';

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
            <AppContainer>  
                <div>   
                    <Heading>{user.name}</Heading>
                    <SubHeading>Added blogs</SubHeading>
                    <StyledList>
                        {user.blogs.map(blog => (
                                <StyledListItem key={blog.id}>{blog.title}</StyledListItem>
                            ))} 
                    </StyledList>
                </div>  
            </AppContainer>
    );
}

export default User;
