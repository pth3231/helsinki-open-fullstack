import { useEffect } from "react";
import Course from "./components/Course";
import { courses } from "./data";

const App = () => {
    useEffect(() => {
        console.log("Data import: ", courses)
    }, [])
    return <>
        {
            courses.map(({id, name, parts}) => {
                return <Course key={id} name={name} parts={parts}></Course>
            })
        }
    </>

}

export default App;