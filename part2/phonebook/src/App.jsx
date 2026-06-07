import { useState, useEffect } from 'react';
import { getAllPersons } from './services/db';

import PersonForm from './components/PersonForm';
import PersonsDisplay from './components/PersonsDisplay';
import Filter from './components/Filter';


const App = () => {
    const [persons, setPersons] = useState([]);
    const [filterString, setFilterString] = useState("");

    useEffect(() => {
        getAllPersons()
            .then(response => {
                console.log("Initial load: ", response);
                setPersons(response);
            })
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        console.log("Current state persons: ", persons);
    }, [persons]);

    return (
        <div>
            <Filter filterString={filterString} setFilterString={setFilterString}></Filter>
            <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
            <PersonsDisplay persons={persons} setPersons={setPersons} filterString={filterString}></PersonsDisplay>
        </div>
    )
}

export default App;