import { useEffect } from "react";

const Header = (props) => {
    const { course } = props;

    useEffect(() => {
        console.log("Header props: ", props);
    }, []);

    return <h1>{course}</h1>
}

export default Header;