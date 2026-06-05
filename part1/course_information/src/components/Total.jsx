import { useEffect } from "react";

const Total = (props) => {
	const { lesson } = props

	useEffect(() => {
		console.log("Total props: ", props);
	}, []);

	return <p>
		{
			lesson.reduce((accumulator, current) => {
				return accumulator + current.exercises
			}, 0)
		}
	</p>
}

export default Total;