const PersonsDisplayItem = ({ person, deleteItemHandler }) => {
    const {name, number} = person;

    return <div>
        <span>{name} {number}</span>
        <button onClick={deleteItemHandler}>delete</button>
    </div>
}

export default PersonsDisplayItem;