import User from "@/domain/models/user.model"
import { API_KEY, PROJECT_ID } from "./constantsMiddleware"

export const getUserById = async (userId: string): Promise<User | null> => {
	const document = `users/${userId}`
	const url = `https://firestore.googleapis.com/v1beta1/projects/${PROJECT_ID}/databases/(default)/documents/${document}?key=${API_KEY}`
	let data = await (await fetch(url)).json()
	if (data.error) {
		return null
	}
	return data ? data : null
}
