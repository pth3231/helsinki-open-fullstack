import { useEffect } from "react"
import PersonsDisplayItem from "./PersonsDisplayItem";

const PersonsDisplay = ({ persons, setPersons, filterString }) => {
    // Add safety checks to prevent accessing properties of undefined
    const filtered_persons = (persons || []).filter(
        (person) => person && person.name && 
        (person.name.toLowerCase().includes(filterString) || filterString === undefined || filterString === "")
    )

    useEffect(() => {
        console.log("Received props for displaying: ", { persons, filterString, filtered_persons });
    }, [persons, filterString])

    return <div>
        <h2>Numbers</h2>
        {
            filtered_persons.map(({ id, name, number }) =>
                <PersonsDisplayItem 
                    key={id} 
                    id={id}
                    name={name} 
                    number={number} 
                    persons={persons}
                    setPersons={setPersons} />
            )
        }
    </div>
}

export default PersonsDisplay;