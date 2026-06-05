import { useEffect } from "react";

const Total = (props) => {
	useEffect(() => {
		console.log("Total props: ", props);
	}, []);

	return <p>
		{
			props.lesson.reduce((accumulator, current) => {
				return accumulator + current.exercises
			}, 0)
		}
	</p>
}

export default Total;