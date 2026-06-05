import { useEffect } from "react";

const Part = (props) => {
    useEffect(() => {
        console.log("Part props: ", props);
    }, []);

    return <p> {props.part} {props.exercises} </p>
}

export default Part;