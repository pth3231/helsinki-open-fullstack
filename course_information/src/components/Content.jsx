import Part from "./Part";
import { useEffect } from "react";

const Content = ({ parts }) => {
    useEffect(() => {
        console.log("Content props: ", parts);
    }, []);

    return parts.map(({ id, name, exercises }) => {
        return <Part key={id} name={name} exercises={exercises}></Part>
    })
}

export default Content;