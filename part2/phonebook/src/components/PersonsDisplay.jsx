import { useEffect } from "react"
import PersonsDisplayItem from "./PersonsDisplayItem";

const PersonsDisplay = ({ persons, setPersons, filterString, setNotiStatus }) => {
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
            filtered_persons.map((person) =>
                <PersonsDisplayItem 
                    key={person.id} 
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    setNotiStatus={setNotiStatus} />
            )
        }
    </div>
}

export default PersonsDisplay;