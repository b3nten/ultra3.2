import React from "react"

export function Counter(){
	const [count, setCount] = React.useState(0)
		return (
				<div>
						<h1>Counter</h1>
						<button onClick={() => setCount(c => c + 1)}>The count is {count} </button>
				</div>
		)
}