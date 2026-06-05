import { useEffect } from "react";

const Part = (props) => {
    const { part, exercises } = props;

    useEffect(() => {
        console.log("Part props: ", props);
    }, []);

    return <p> {part} {exercises} </p>
}

export default Part;