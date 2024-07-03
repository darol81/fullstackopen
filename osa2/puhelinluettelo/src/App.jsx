import { useState } from 'react'
import './App.css';

const App = () => 
{
    const [persons, setPersons] = useState
    ([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [curFilter, setFilter] = useState("");
    
    const handleNameChange = (event) => 
    {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => 
    {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) =>
    {
        setFilter(event.target.value);
    }

    const submitHandler = (event) => 
    {
        event.preventDefault();

        /* Tarkistetaan, että nimi (newName) ei ole vielä listassa */
        const names = persons.map(person => person.name);
        if(names.includes(newName))
        {
            alert(`${newName} is already added to phonebook`);
            return; 
        }
        const new_persons = persons.concat({ name: newName, number : newNumber });
        setPersons(new_persons);
        setNewName("");
        setNewNumber("");
    }

    return  (
                <div>
                    <h2>Phonebook</h2>
                    <div>
                        filter shown with <input value={curFilter} onChange={handleFilterChange} />
                    </div>
                    <form onSubmit={submitHandler}>
                    <h2>Add a new</h2>
                        <div>
                            name: <input value={newName} onChange={handleNameChange}/>
                        </div>
                        <div>
                            number: <input value={newNumber} onChange={handleNumberChange}/>
                        </div>                        
                        <div>
                            <button type="submit">add</button>
                        </div>
                    </form>
                    <h2>Numbers</h2>
                    <ul>
                        {persons.filter(person => person.name.toLowerCase().includes(curFilter.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
                    </ul>
                </div>
            )
}

export default App