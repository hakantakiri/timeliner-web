const JoinPage = () => {
	const join = (e: any) => {
		e.preventDefault()
		console.log("Creating user")
	}

	return (
		<div>
			<form onSubmit={join}>
				<label>name</label>
				<input type="text" />
				<select>Accept terms and services</select>
				<button onClick={join}>Join</button>
			</form>
		</div>
	)
}
