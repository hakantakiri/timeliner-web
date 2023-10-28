import serverAuth from "@/server/io/firebase/firebaseAdminAuth"

class AuthServerServivce {
	public async validateFirebaseToken(token: string): Promise<boolean> {
		// app.auth().verifyIdToken

		const decodedToken = await serverAuth
			.verifyIdToken(token)
			.then((decodedToken) => {
				const uid = decodedToken.uid
				console.log("Decoded token is")
				console.log(decodedToken)

				return decodedToken
			})
			.catch((error) => {
				console.error("Error in auth token validation")
				console.error(error)
				return null
			})

		return decodedToken ? true : false
	}
}

export default new AuthServerServivce()
