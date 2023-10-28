"use client"
import authService from "@/domain/services/auth.service"
import { myAction } from "./serveraction"
import { useTransition } from "react"

const ProfilePage = () => {
	let [isPending, startTransition] = useTransition()
	return (
		<>
			My profile
			<button
				onClick={() => {
					console.log("This session is: ", authService.getSession())
				}}
			>
				Log session
			</button>
			<button
				onClick={() => {
					authService.getIdToken().then((token) => {
						startTransition(() => {
							myAction(String(token))
						})
					})
				}}
			>
				validate session
			</button>
		</>
	)
}

export default ProfilePage
