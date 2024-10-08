
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotify } from './NotificationContext';

const AnecdoteForm = () => 
{
    const queryClient = useQueryClient();
    const notify = useNotify();
    const anecdoteMutation = useMutation
    ({ 
        mutationFn: createAnecdote,
        onSuccess: () => 
        {      
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] })    
        },
        onError: (error) =>
        {   
            notify(error.msg);
        },
    });
    
    const onCreate = (event) => 
    {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        console.log("new anecdote");
        anecdoteMutation.mutate({ content, votes: 0 })
        notify(`anecdote '${content}' created`);
    }

    return  (
                <div>
                    <h3>create new</h3>
                    <form onSubmit={onCreate}>
                    <input name='anecdote' />
                    <button type="submit">create</button>
                    </form>
                </div>
            );
}

export default AnecdoteForm
