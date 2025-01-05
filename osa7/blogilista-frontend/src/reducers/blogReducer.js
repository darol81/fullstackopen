import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice
({
    name: "blog",
    initialState: [],
    reducers: 
    {
       setBlogs(state, action)
       {
           return action.payload.sort((a, b) => b.likes - a.likes);
       },
       addBlog(state, action)
       {
           return [...state, action.payload].sort((a, b) => b.likes - a.likes);
       }   
    }
});


export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => 
{
    return async dispatch => 
    {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};


export const createBlog = (user, title, author, url) =>   
{
    return async (dispatch)=> 
    {
        try 
        {
            const newBlog = await blogService.postBlog(user.token, { title, author, url });
            newBlog.user = { username: user.username, name: user.name, id: user.id }; // Lisätään user tiedot 
            dispatch(addBlog(newBlog));
            dispatch(setNotification(`Blog "${newBlog.title}" by ${newBlog.author} added successfully.`, "success", 5));
        } 
        catch (exception) 
        {
            dispatch(setNotification("Couldn't create blog.", "error", 5));
        }
    }
};

export const deleteBlog = (user, id) =>
{
    return async dispatch =>
    {
        try
        {
            await blogService.deleteBlog(user.token, id);
            dispatch(setNotification("Blog deleted successfully.", "success", 5));
            dispatch(initializeBlogs());
        }
        catch(exception)
        {
            dispatch(setNotification("Couldn't delete blog.", "error", 5));
        }
    }
};

export default blogSlice.reducer;

