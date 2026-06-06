import { useEffect } from "react";

const Total = ({ parts }) => {
	useEffect(() => {
		console.log("Total props: ", parts);
	}, []);

	const total = parts.reduce((accumulator, current) => {
		return accumulator + current.exercises
	}, 0)

	return <b>
		Total of {total} {(total == 1) ? "exercise" : "exercises"}
	</b>
}

export default Total;