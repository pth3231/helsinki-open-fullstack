import { useState, useEffect } from 'react';
import { getAllPersons } from './services/db';

import PersonForm from './components/PersonForm';
import PersonsDisplay from './components/PersonsDisplay';
import Filter from './components/Filter';
import Notification from './components/Notification';


const App = () => {
    const [persons, setPersons] = useState([]);
    const [filterString, setFilterString] = useState("");
    const [notiStatus, setNotiStatus] = useState({
        display: false,
        type: "info",
        content: ""
    });

    useEffect(() => {
        getAllPersons()
            .then(response => {
                console.log("Initial load: ", response.data);
                setPersons(response.data);
            })
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        console.log("Current state persons: ", persons);
    }, [persons]);

    return (
        <div>
            <Notification notiStatus={notiStatus} />
            <Filter
                filterString={filterString}
                setFilterString={setFilterString} />
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                notiStatus={notiStatus}
                setNotiStatus={setNotiStatus} />
            <PersonsDisplay
                persons={persons}
                setPersons={setPersons}
                filterString={filterString}
                setNotiStatus={setNotiStatus} />
        </div>
    )
}

export default App;