import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => 
{
    return axios.get(baseUrl).then(res => res.data).catch(error => 
    {
        throw new Error("getAnecdotes fails.");
    });
}

export const createAnecdote = async (newAnecdote) => 
{
    try 
    {
        const response = await axios.post(baseUrl, newAnecdote);
        return response.data;
    } 
    catch(error) 
    {
        /* Käsitellään virhe täällä, tai oikeammin muodostetaan sen pohjalta oma virhe, joka heitetään */
        const myError = 
        { 
            msg: error.response.data.error,
            status: error.response.status 
        };
        throw myError;
    }
};

export const voteAnecdote = (anecdote) =>
{
    const id = anecdote.id;
    return axios.put(`${baseUrl}/${id}`, anecdote).then(res => res.data).catch(error =>
    {
        throw new Error("voteAnecdote fails.");
    });
}
