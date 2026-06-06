import { useEffect } from "react";

const Part = ({ name, exercises }) => {

    useEffect(() => {
        console.log("Part props: ", name, exercises);
    }, []);

    return <p> {name} {exercises} </p>
}

export default Part;