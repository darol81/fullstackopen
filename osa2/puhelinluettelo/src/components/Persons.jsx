
import DeleteButton from "./DeleteButton";

// Destructuroidaan suorilta
const Persons = ({ persons, filter, deleteHandler }) => 
{
    return  (
                <ul>
                    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => 
                    (
                        <li key={person.id}> {person.name} {person.number} <DeleteButton label="Delete" onClick={() => deleteHandler(person.id, person.name)} /></li>
                    ))}
                </ul>
            )
}

export default Persons;

