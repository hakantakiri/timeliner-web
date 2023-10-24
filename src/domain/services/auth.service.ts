import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth"
import { auth } from "@/io/firebase/firebaseAuth"

class AuthService {
	public async signInWithGoogle() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithRedirect(auth, googleProvider)
	}

	public async signOut() {
		await signOut(auth)
	}
}

export default new AuthService()
