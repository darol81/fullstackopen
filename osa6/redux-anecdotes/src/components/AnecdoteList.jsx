import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = () => 
{
    const anecdotes = useSelector(state => state.anecdotes);
    const filterWord = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const vote = (id) => 
    {
        //console.log('vote', id);
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