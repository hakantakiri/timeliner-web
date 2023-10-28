import User from "@/domain/models/user.model"
import firebaseConfig from "@/secrets/firebase-sdk.json"

export const getUserById = async (userId: string) => {
	const projectId = firebaseConfig.projectId
	const apiKey = firebaseConfig.apiKey
	const doc = "users/2452452435"
	const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/${doc}?key=${apiKey}`

	let data = await fetch(url)
		.then((response) => response.json())
		.then((json) => {
			console.log("getUseraction in server")
			console.log(json)
		})
}
