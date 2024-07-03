import { useState } from 'react'
import './App.css';

const App = () => 
{
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");
    
    const handleNameChange = (event) => 
    {
        setNewName(event.target.value);
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
        const new_persons = persons.concat({ name: newName });
        setPersons(new_persons);
        setNewName("")
    }

    return  (
                <div>
                    <h2>Phonebook</h2>
                    <form onSubmit={submitHandler}>
                    
                        <div>
                            name: <input value={newName} onChange={handleNameChange}/>
                            
                        </div>
                        <div>
                            <button type="submit">add</button>
                        </div>
                    </form>
                    <h2>Numbers</h2>
                    <ul>
                        {persons.map(person => <li key={person.name}>{person.name}</li>)}
                    </ul>
                </div>
            )
}

export default App