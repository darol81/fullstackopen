import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice
({
    name: "authentication",
    initialState: null,
    reducers: 
    {
        setUserJSON(state, action)
        {
            return action.payload;
        }
    }
});

export const { setUserJSON } = authenticationSlice.actions;

export const setUser = (userJSON) =>
{
    return async dispatch =>
    {
        dispatch(setUserJSON(userJSON));
    }
}

export default authenticationSlice.reducer;

