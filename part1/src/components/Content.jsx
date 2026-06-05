import Part from "./Part";
import { useEffect } from "react";

const Content = (props) => {
    useEffect(() => {
        console.log("Content props: ", props);
    }, []);

    return props.lesson.map((value) => {
        return <Part key={value.key} part={value.part} exercises={value.exercises}></Part>
    })
}

export default Content;