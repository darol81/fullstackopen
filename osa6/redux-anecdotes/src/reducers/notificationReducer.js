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

export const setNotification = (msg, seconds) =>
{
    return async dispatch =>
    {
        if(timeoutId)
        {
            clearTimeout(timeoutId);
        }
        const { notificationChange } = notificationSlice.actions;   
        dispatch(notificationChange(msg));
        timeoutId = setTimeout(() => 
        { 
            dispatch(notificationChange(null));
            timeoutId = null;
        }, (seconds * 1000));
    }
}


export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;

