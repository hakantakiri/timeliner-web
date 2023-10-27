import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth"
import { auth } from "@/io/firebase/firebaseAuth"
import { User as FirebaseUser } from "firebase/auth"
import Session from "../models/session.model"
import { deleteCookie, setCookie } from "cookies-next"

type SessionListener = (session: Session | null) => void

class AuthService {
	private sessionListeners: SessionListener[] = []
	private signOutListeners: SessionListener[] = []

	public async signInWithGoogle() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithRedirect(auth, googleProvider)
	}

	public async updateProviderSession(
		providerSession: FirebaseUser | null
	): Promise<void> {
		if (!providerSession) return this.emmitSessionChange(null)

		const idToken = await auth.currentUser?.getIdToken()
		setCookie("firebaseIdToken", idToken)

		let session: Session = {
			user: {
				id: "a",
				displayName: "a",
				email: "a",
				photoUrl: "a",
				createdDate: "a",
				modifiedDate: "a",
				lastSession: "a",
			},
			providerSession: providerSession,
		}

		this.emmitSessionChange(session)
	}

	public async signOut() {
		deleteCookie("firebaseIdToken")
		await signOut(auth).then(() => {
			this.emmitSignOut()
		})
	}

	// ---- Session Listeners
	public async onSessionChange(sessionListener: SessionListener) {
		this.sessionListeners = [...this.sessionListeners, sessionListener]
	}

	private async emmitSessionChange(session: Session | null) {
		this.sessionListeners.forEach((l) => {
			l(session)
		})
	}

	// Signout Listeners
	public async onSignOut(sessionListener: SessionListener) {
		this.signOutListeners = [...this.signOutListeners, sessionListener]
	}

	private emmitSignOut() {
		this.signOutListeners.forEach((l) => {
			l(null)
		})
	}
}

export default new AuthService()
