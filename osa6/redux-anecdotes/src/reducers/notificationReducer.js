import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice
({
    name: "notification",
    initialState: null,
    reducers: 
    {
        notificationChange(state, action)
        {
            return action.payload;
        }
    }
});

let timeoutId = null;

export const inform = (dispatch, msg) =>
{
    const { notificationChange } = notificationSlice.actions;   
    dispatch(notificationChange(msg));
    if(timeoutId)
    {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => 
    { 
        dispatch(notificationChange(null));
        timeoutId = null;
    }, 5000);
}

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;

