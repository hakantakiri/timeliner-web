"use client"

import authService from "@/domain/services/auth.service"
import { useRouter } from "next/navigation"
import { useContext, useLayoutEffect } from "react"
import SessionContext from "../context/session.context"

export default function SignUpPage() {
	const router = useRouter()
	const sessionContext = useContext(SessionContext)
	const googleSignup = () => {
		console.log("Signin in with Google")
		authService.signInWithGoogle()
	}
	useLayoutEffect(() => {
		if (sessionContext) {
			router.push("/profile")
		}
	}, [])

	return (
		<>
			{!sessionContext ? (
				<div className="flex h-full flex-col items-center p-8">
					<section className="flex-col items-center text-center p-8">
						<h1>Sign up</h1>
						<button onClick={googleSignup}>
							Continue with Google
						</button>
					</section>
				</div>
			) : (
				<> No ves naditaaaaa</>
			)}
		</>
	)
}
