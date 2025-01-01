import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';

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
            {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}</li>)}
        </ul>
    </div>
);

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
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => 
	{
        e.preventDefault();
        addNew({ content, author, info, votes: 0 });
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

const App = () => 
{
    const [anecdotes, setAnecdotes] = useState([
        { content: 'If it hurts, do it more often', author: 'Jez Humble', info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0, id: 1 },
        { content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', info: 'http://wiki.c2.com/?PrematureOptimization', votes: 0, id: 2 }
    ]);

    const addNew = (anecdote) => 
	{
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    return (
        <Router>
            <div>
                <h1>Software anecdotes</h1>
                <Menu />
                <Routes>
                    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                    <Route path="/create" element={<CreateNew addNew={addNew} />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
