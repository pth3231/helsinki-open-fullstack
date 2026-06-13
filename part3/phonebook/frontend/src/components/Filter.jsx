import { useEffect } from 'react';

const Filter = ({ filterString, setFilterString }) => {
    useEffect(() => {
        console.log("Filtering: ", filterString);
    }, [filterString])

    const filterEveryChangeHandler = (e) => setFilterString(e.target.value);

    return <form>
        <h1>Phonebook</h1>
        <p>filter shown with <input onChange={filterEveryChangeHandler}/></p>
    </form>
}

export default Filter;