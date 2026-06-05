import Part from "./Part";
import { useEffect } from "react";

const Content = (props) => {

    const { lesson } = props;

    useEffect(() => {
        console.log("Content props: ", props);
    }, []);

    return lesson.map((value) => {
        const {key, part, exercises } = value;
        return <Part key={key} part={part} exercises={exercises}></Part>
    })
}

export default Content;