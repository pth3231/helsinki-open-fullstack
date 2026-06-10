import { deletePersonById } from "../services/db";

const PersonsDisplayItem = ({ person, persons, setPersons, showNotification }) => {
    const {id, name, number} = person;

    const deleteItemHandler = () => {
        console.log("Deleting: ", name);
        const deleteConfirmation = window.confirm(`Delete ${name}?`);
        if (!deleteConfirmation) return;
        
        deletePersonById(id)
            .then(response => {
                console.log(response.data)
                const updated = persons.filter(p => p.id !== id);
                setPersons(updated);
                showNotification("info", `Deleted user named ${response.data.name}`);
            })
            .catch(err => {
                console.error(err);
                showNotification("error", "Failed to delete user!");
            });
    }

    return <div>
        <span>{name} {number}</span>
        <button onClick={deleteItemHandler}>delete</button>
    </div>
}

export default PersonsDisplayItem;