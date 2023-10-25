"use client"

import authService from "@/domain/services/auth.service"

export default function SignUpPage() {
	const googleSignup = () => {
		console.log("Signin in with Google")
		authService.signInWithGoogle()
	}

	return (
		<div className="flex h-full flex-col items-center p-8">
			<section className="flex-col items-center text-center p-8">
				<h1>Sign up</h1>
				<button onClick={googleSignup}>Continue with Google</button>
			</section>
		</div>
	)
}
