import { useState } from 'react';
import { useNavigate, useMatch, Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import  { useField } from './hooks'

const Menu = () => 
{
    const padding = { paddingRight: 5 };
    return (
        <div>
            <Link to="/" style={padding}>anecdotes</Link>
            <Link to="/create" style={padding}>create new</Link>
            <Link to="/about" style={padding}>about</Link>
        </div>
    );
};

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
			{anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
        </ul>
    </div>
);

const Anecdote = ({ Anecdote }) =>
{
	return Anecdote ? (
		<div>
			<h2>{Anecdote.content} by {Anecdote.author}</h2>
			<p>has {Anecdote.votes} votes</p>
			<p>for more info see <a href={Anecdote.info}>{Anecdote.info}</a></p>
		</div>
	) : null;
}
const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        <em>An anecdote is a brief, revealing account of an individual person or an incident...</em>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
);

const Footer = () => (
    <div>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>source code</a>.
    </div>
);

const CreateNew = ({ addNew }) => 
{
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');
	const navigate = useNavigate();
    const handleSubmit = (e) => 
    {
        e.preventDefault();
        addNew({ content: content.value, author: author.value, info: info.value, votes: 0 });
        navigate('/');
    };
    const resetAction = (e) =>
    {
        e.preventDefault();
        content.reset();
        author.reset();
        info.reset();
    }
    const showField = ({ reset, ...field }) => field;
 
    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name="content" {...showField(content)} />
                </div>
                <div>
                    author
                    <input name="author" {...showField(author)} />
                </div>
                <div>
                    url for more info
                    <input name="info" {...showField(info)} />
                </div>
                <button>create</button>
                <button onClick={resetAction}>reset</button>
            </form>
        </div>
    );
};

const Notification = ({ message }) =>	
{
	if (message === null) return null;
	return (
		<div>
			{message}
		</div>
	);
}

const App = () => 
{
    const [anecdotes, setAnecdotes] = useState([
        { content: 'If it hurts, do it more often', author: 'Jez Humble', info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0, id: 1 },
        { content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', info: 'http://wiki.c2.com/?PrematureOptimization', votes: 0, id: 2 }
    ]);
	const [notification, setNotification] = useState(null);
	const inform = (message) =>
	{
		setNotification(message);
		setTimeout(() => setNotification(null), 5000);
	}
    const addNew = (anecdote) => 
	{
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
		inform("A new anecdote " + anecdote.content + " created!");
    };
	const match = useMatch('anecdotes/:id') 
	const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null;

    return (
			<div>
                <h1>Software anecdotes</h1>
                <Menu />
				<Notification message={notification} />
                <Routes>
                    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                    <Route path="/create" element={<CreateNew addNew={addNew} />} />
                    <Route path="/about" element={<About />} />
					<Route path="/anecdotes/:id" element={<Anecdote Anecdote={anecdote} />} />
                </Routes>
                <Footer />
            </div>
    );
};

export default App;
