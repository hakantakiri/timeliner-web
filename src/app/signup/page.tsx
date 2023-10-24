"use client"

import authService from "@/domain/services/auth.service"

export default function SignUpPage() {
	const googleSignup = () => {
		console.log("Signin in with Google")
		authService.signInWithGoogle()
	}
	return (
		<>
			<h1>Sign up</h1>
			<button onClick={googleSignup}>Google</button>
		</>
	)
}
