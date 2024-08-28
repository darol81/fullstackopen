
import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { inform } from '../reducers/notificationReducer'

const AnecdoteForm = () => 
{
    const dispatch = useDispatch();
    const addAnecdote = (event) =>
    {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        inform(dispatch, `You created note '${content}'`);
        dispatch(addAnecdoteAction(content)); 
    }
    return  (
                <>
                    <h2>create new</h2>
                    <form onSubmit={addAnecdote}>
                        <div><input name="anecdote"/></div>
                        <button>create</button>
                    </form>
                </>
            );
}

export default AnecdoteForm