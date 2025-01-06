import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users';  

const userSlice = createSlice
({
    name: "user",
    initialState: [],
    reducers: 
    {
       setUserList(state, action)
       {
           return action.payload;
       },
    }
});

export const { setUserList } = userSlice.actions;

export const initializeUsers = () => 
{
    return async dispatch => 
    {
        const users = await userService.getAll();
        dispatch(setUserList(users));
    };
};


export default userSlice.reducer;

