import { useEffect } from "react";

const Header = ({ name }) => {

    useEffect(() => {
        console.log("Header props: ", name);
    }, []);

    return <h1>{name}</h1>
}

export default Header;