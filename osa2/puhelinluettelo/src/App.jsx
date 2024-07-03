import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import { PersonForm, InputElement } from "./components/PersonForm";
import Persons from "./components/Persons";

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

    const handleFilterChange = (event) =>
    {
        setFilter(event.target.value);
    }
        
    const handleNameChange = (event) => 
    {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => 
    {
        setNewNumber(event.target.value);
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
                    <Filter handler={handleFilterChange} value={curFilter} />
                    <PersonForm submit={submitHandler}>
                        <InputElement label="Name" value={newName} changer={handleNameChange}/>
                        <InputElement label="Number" value={newNumber} changer={handleNumberChange}/>
                    </PersonForm>
                    <h2>Numbers</h2>
                    <Persons persons={persons} filter={curFilter}/>
                </div>
            )
}

export default App