import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => 
{
    const anecdotes = useSelector(state => state.anecdotes);
    const filterWord = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const vote = (anecdote) => 
    {
        dispatch(voteAnecdote(anecdote));
    }
    return  (
                <>
                    {anecdotes.filter(anecdote => anecdote.content.includes(filterWord)).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                    )}
                </>
            );
}

export default AnecdoteList