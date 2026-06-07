import { deletePersonById } from "../services/db";

const PersonsDisplayItem = ({ person, persons, setPersons, setNotiStatus }) => {
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
                setNotiStatus({
                    display: true,
                    type: "info",
                    content: `Deleted user named ${response.data.name}`
                });
            })
            .catch(err => console.error(err));
    }

    return <div>
        <span>{name} {number}</span>
        <button onClick={deleteItemHandler}>delete</button>
    </div>
}

export default PersonsDisplayItem;