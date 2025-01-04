import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
           return [...state, action.payload];
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

export const createBlog = (blog, token) => 
{
    return async dispatch => 
    {
        const newBlog = await blogService.postBlog(token, blog);
        dispatch(addBlog(newBlog));
    };
};

export default blogSlice.reducer;

