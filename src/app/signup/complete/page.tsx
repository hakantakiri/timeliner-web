"use client"
import SessionContext from "@/app/context/session.context"
import authService from "@/domain/services/auth.service"
import { redirect } from "next/navigation"
import { useContext, useEffect } from "react"

export default function JoinPage() {
	const sessionContext = useContext(SessionContext)
	const join = (e: any) => {
		e.preventDefault()
		console.log("Creating user")
	}

	useEffect(() => {
		console.log("setting up useEffect")
	}, [])

	return (
		<>
			{sessionContext ? (
				<div>
					<form onSubmit={join}>
						<label>name</label>
						<input type="text" />
						<select>Accept terms and services</select>
						<button onClick={join}>Join</button>
					</form>
					<button
						onClick={() => {
							authService.signOut().then()
						}}
					>
						Choose another signup method
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
