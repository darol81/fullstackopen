import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => 
{
    return axios.get(baseUrl).then(res => res.data).catch(error => 
    {
        throw new Error("getAnecdotes fails.");
    });
}

export const createAnecdote = (newAnecdote) =>
{
    return axios.post(baseUrl, newAnecdote).then(res => res.data).catch(error =>
    {
        throw new Error("createAnecdote fails.");
    });
}

export const voteAnecdote = (anecdote) =>
{
    const id = anecdote.id;
    return axios.put(`${baseUrl}/${id}`, anecdote).then(res => res.data).catch(error =>
    {
        throw new Error("voteAnecdote fails.");
    });
}
