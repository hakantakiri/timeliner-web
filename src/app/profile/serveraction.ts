"use server"

import authServerService from "@/server/domian/auth/auth.server.service"

export async function myAction(idToken: string) {
	let validate = await authServerService.validateFirebaseToken(idToken)
	console.log("-------VALIDATION")
	console.log(validate)
	return validate ? true : false
}
