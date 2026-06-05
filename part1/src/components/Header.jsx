import { useEffect } from "react";

const Header = (props) => {
    useEffect(() => {
        console.log("Header props: ", props);
    }, []);

    return <h1>{props.course}</h1>
}

export default Header;