import { useState, useEffect } from 'react';
import { getAllPersons } from './services/db';

import PersonForm from './components/PersonForm';
import PersonsDisplay from './components/PersonsDisplay';
import Filter from './components/Filter';
import Notification from './components/Notification';
import useNotification from './hooks/useNotification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filterString, setFilterString] = useState("");
    const { notiStatus, showNotification, setNotiStatus } = useNotification();

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
                showNotification={showNotification}
                setNotiStatus={setNotiStatus} />
            <PersonsDisplay
                persons={persons}
                setPersons={setPersons}
                filterString={filterString}
                showNotification={showNotification}
                setNotiStatus={setNotiStatus} />
        </div>
    )
}

export default App;