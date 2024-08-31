import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => 
{
    const response = await axios.get(baseUrl);
    return response.data;
}

const getId = async(id) =>
{
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const createNew = async (content) => 
{ 
    const object = { content: content, votes: 0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
}

const voteId = async (id) =>
{
    let anecdoteData = await getId(id);
    anecdoteData.votes += 1; 
    const response = await axios.patch(`${baseUrl}/${id}`, anecdoteData);
    return response.data;
}

export default { getAll, createNew, getId, voteId }