import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { voteAnecdote, getAnecdotes } from './requests';
import { useNotify } from './components/NotificationContext';

const App = () => 
{
    const queryClient = useQueryClient();
    const notify = useNotify();

    const voteMutation = useMutation
    ({ 
        mutationFn: voteAnecdote,
        onSuccess: () => 
        {      
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] })    
        },
    });

    const handleVote = (anecdote) => 
    {
        console.log('vote')
        notify(`anecdote '${anecdote.content}' voted`);
        voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    }
    const result = useQuery
    ({    
        queryKey: ["anecdotes"],    
        queryFn: getAnecdotes
        // refetchOnWindowFocus: false
    });
    
    if (result.isLoading) 
    {    
        return <div>loading anecdotes..</div>  
    }
    if(result.isError || !result.data)
    {
        return (<div>anecdote service not available due to problems in server</div>);
        //return <div>Tapahtui virhe: {result.error.message}</div>
    }
    const anecdotes = result.data;

    return (
            <div>
                <h3>Anecdote app</h3>
                <Notification />
                <AnecdoteForm />

                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>has {anecdote.votes}<button onClick={() => handleVote(anecdote)}>vote</button></div>
                    </div>
                )}
            </div>
            );
}

export default App