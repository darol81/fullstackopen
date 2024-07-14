import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import { PersonForm, InputElement } from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import server from "./services/server";

const App = () => 
{
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [curFilter, setFilter] = useState("");
    const [notificationData, setNotification] = useState(null);

    useEffect(() => 
    {
        server.getAll().then(response => 
        {
           setPersons(response);
        });
    }, []);

    const inform = (msg, type) =>
    {
        setNotification({ message: msg, type: type });
        setTimeout(() => 
        {          
            setNotification(null);
        }, 5000);
    }
   
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
            if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
            {
                let Obj = persons.find(person => person.name === newName);
                const UpdatedPerson = { ...Obj, number: newNumber };
                server.update(Obj.id, UpdatedPerson).then(response => 
                {
                    setPersons(persons.map(person => person.id !== Obj.id ? person : response));
                    setNewName("");
                    setNewNumber("");
                    inform(`Updated ${newName}`, "notification");
                }).catch(error => 
                {
                    inform(`Update for ${newName} failed. The existing information does not exist.`, "error");
                });
            }
            return;
        }
        const newPerson = { name: newName, number: newNumber };
        server.create(newPerson).then(addedPerson => 
        {      
            setPersons(persons.concat(addedPerson));
            setNewName("");
            setNewNumber("");
            inform(`Added ${newName}`, "notification");
        }).catch(error => 
        {
            inform(`Could not add ${newName}, Error: ${error.response.data.error}`, "error");
        });        
    }
    

    const deleteHandler = (id, name) => 
    {
        if(window.confirm(`Delete ${name}?`)) 
        {
            server.deleteId(id).then(() => 
            {
                setPersons(persons.filter(person => person.id !== id));
                inform(`Deleted ${name}`, "notification");
            }).catch(error => 
            {
                inform(`Deleting ${name} failed`, "error");
            });
        }
    }
    return  (
                <div>
                    <h2>Phonebook</h2>
                    <Notification data={notificationData}/>
                    <Filter handler={handleFilterChange} value={curFilter} />
                    <PersonForm submit={submitHandler}>
                        <InputElement label="Name" value={newName} changer={handleNameChange}/>
                        <InputElement label="Number" value={newNumber} changer={handleNumberChange}/>
                    </PersonForm>
                    <h2>Numbers</h2>
                    <Persons persons={persons} filter={curFilter} deleteHandler={deleteHandler}/>
                </div>
            )
}

export default App