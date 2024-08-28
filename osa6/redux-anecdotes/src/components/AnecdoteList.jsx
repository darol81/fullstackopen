import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { inform } from '../reducers/notificationReducer'

const AnecdoteList = () => 
{
    const anecdotes = useSelector(state => state.anecdotes);
    const filterWord = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const vote = (id) => 
    {
        const foundAnecdote = anecdotes.find(anecdote => anecdote.id === id);
        inform(dispatch, `You voted '${foundAnecdote.content}'`);
        dispatch(voteAction(id)); 
    }
    return  (
                <>
                    {anecdotes.filter(anecdote => anecdote.content.includes(filterWord)).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                    )}
                </>
            );
}

export default AnecdoteList