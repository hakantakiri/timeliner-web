import { API_KEY } from "./constantsMiddleware"

export interface ProviderSession {
	localId: string
}

export const isAuthByProvider = async (
	idToken: string | undefined
): Promise<ProviderSession | null> => {
	if (!idToken) return null

	const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`

	let data = await (
		await fetch(url, {
			method: "POST",
			body: JSON.stringify({ idToken: idToken }),
		})
	).json()

	if (data.error) {
		console.log("Error getting provider session")
		console.log(data.error)
		return null
	}
	return data
}
