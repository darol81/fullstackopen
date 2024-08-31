
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService';
import { setNotification } from './notificationReducer';

/*
const anecdotesAtStart = 
[
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => 
{
    return  {
                content: anecdote,
                id: getId(),
                votes: 0
            };
}

const initialState = anecdotesAtStart.map(asObject);
*/

const anecdoteSlice = createSlice
({
    name: 'anecdotes',
    initialState: [],
    reducers: 
    {
        voteAction(state, action)
        {
            const id = action.payload;
            const targetAnecdote = state.find(anecdote => anecdote.id === id);
            const updatedAnecdote = {...targetAnecdote, votes: targetAnecdote.votes + 1 };
            return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote).sort((a, b) => b.votes - a.votes);        
        },
        addAnecdoteAction(state, action)
        {
            //console.log(action.payload);
            //console.log(JSON.parse(JSON.stringify(state)));
            //return [...state, { id: getId(), content: action.payload, votes: 0 }];
            return [...state, action.payload];
        },
        setAnecdotes(state, action)
        {
            return action.payload;
        }

    },
});

export const { voteAction, addAnecdoteAction, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => 
{ 
    return async dispatch => 
    {    
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    }
}

export const createAnecdote = content => 
{ 
    return async dispatch => 
    {    
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(setNotification(`You created anecdote '${content}'`, 5)); 
        dispatch(addAnecdoteAction(newAnecdote)); 
    }
}

export const voteAnecdote = (anecdote) =>
{
    return async dispatch =>
    {
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
        await anecdoteService.voteId(anecdote.id);
        dispatch(voteAction(anecdote.id));
    }
}

export default anecdoteSlice.reducer


