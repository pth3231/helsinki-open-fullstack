import { useState, useEffect } from 'react';
import { createNewPerson, updateExistingPerson } from '../services/db';

const PersonForm = ({ persons, setPersons, setNotiStatus }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const updateExistingPersonFunc = (id) => {
        const updateConfirmation = window.confirm(`${newName} is already added to phonebook, want to update?`);

        const person = {
            name: newName,
            number: newNumber
        };

        if (updateConfirmation) {
            updateExistingPerson(id, person)
                .then(response => {
                    console.log("updated: ", response.data);
                    // Update the persons state with the updated person
                    const updatedPersons = persons.map(p => 
                        p.id === id ? response.data : p
                    );
                    setPersons(updatedPersons);
                    setNotiStatus({
                        display: true,
                        type: "info",
                        content: `Updated all user named ${person.name}`
                    });
                })
                .catch(err => {
                    console.error(err);
                    setNotiStatus({
                        display: true,
                        type: "error",
                        content: "Error occurred! This name might have been deleted!"
                    });
                })
        } else {
            console.log("Existed and user don't want to update, aborted!");
            setNotiStatus({
                display: true,
                type: "info",
                content: "User existed, but did not change anything! Aborted!"
            });
            return;
        }

        // Clear the form
        setNewName('');
        setNewNumber('');
    }

    const addNewPersonFunc = () => {
        const person = {
            name: newName,
            number: newNumber
        }

        createNewPerson(person)
            .then(response => {
                console.log("Creating new person: ", response.data);
                const tempPersons = [...persons, response.data];
                setPersons(tempPersons);
                setNotiStatus({
                    display: true,
                    type: "info",
                    content: `Added ${person.name}!`
                });
            })
            .catch(err => {
                console.error(err);
                setNotiStatus({
                    display: true,
                    type: "error",
                    content: "Unexpected error occurred!"
                });
            });

        // Clear the form
        setNewName('');
        setNewNumber('');
    }

    const checkInvalidInput
        = () => (!newName || !newNumber || newName.length == 0 || newNumber.length == 0);

    const findExistingPerson = () => {
        console.log("Start finding existing person in: ", persons);
        const matchingPerson = persons.find((person) => person.name === newName);
        console.log("Matching? ", matchingPerson);
        return matchingPerson;
    }

    const nameChangeHandler = (e) => {
        const value = e.target.value;
        setNewName(value);
    }

    const numberChangeHandler = (e) => {
        const value = e.target.value;
        setNewNumber(value);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (checkInvalidInput()) {
            alert("Bro, invalid input!");
            return;
        }

        const existedPerson = findExistingPerson();
        if (existedPerson == undefined) {
            addNewPersonFunc();
        } else {
            updateExistingPersonFunc(existedPerson.id);
        }
    }

    useEffect(() => {
        console.log("Persons state in PersonForm: ", persons)
    }, [persons])

    return <>
        <h2>add a new</h2>
        <form onSubmit={formSubmitHandler}>
            <div>name: <input value={newName} onChange={nameChangeHandler} /></div>
            <div>number: <input value={newNumber} onChange={numberChangeHandler} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>
}

export default PersonForm;