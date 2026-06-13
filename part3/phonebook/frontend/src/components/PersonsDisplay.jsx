import { useEffect } from "react"
import PersonsDisplayItem from "./PersonsDisplayItem";
import { deletePersonById } from "../services/db";

const PersonsDisplay = ({ persons, setPersons, filterString, showNotification }) => {
    // Add safety checks to prevent accessing properties of undefined
    const filtered_persons = (persons || []).filter(
        (person) => person && person.name && 
        (person.name.toLowerCase().includes(filterString.toLowerCase()) || filterString === undefined || filterString === "")
    )

    const deleteItemHandler = ({id, name}) => {
        console.log("Deleting: ", {id, name});
        const deleteConfirmation = window.confirm(`Delete ${name}?`);
        if (!deleteConfirmation) return;
        
        deletePersonById(id)
            .then(() => {
                const updated = persons.filter(p => p.id !== id);
                setPersons(updated);
                showNotification("info", `Deleted user named ${name}`);
            })
            .catch(err => {
                console.error(err);
                showNotification("error", "Failed to delete user!");
            });
    }

    useEffect(() => {
        console.log("Received props for displaying: ", { persons, filterString });
    }, [persons, filterString])

    return <div>
        <h2>Numbers</h2>
        {
            filtered_persons.map((person) => {
                return <PersonsDisplayItem 
                    key={person.id}
                    person={person}
                    deleteItemHandler={() => deleteItemHandler(person)} />
                }
            )
        }
    </div>
}

export default PersonsDisplay;