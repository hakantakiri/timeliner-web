import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth"
import { auth } from "@/io/firebase/firebaseAuth"
import Session from "../models/session.model"

type SessionListener = (session: Session | null) => void

class AuthService {
	private sessionListeners: SessionListener[] = []
	private signOutListeners: SessionListener[] = []

	public async signInWithGoogle() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithRedirect(auth, googleProvider)
	}

	public async updateProviderSession(
		providerSession: Session | null
	): Promise<void> {
		if (!providerSession) {
			this.emmitSessionChange(null)
			return
		}
		this.emmitSessionChange(providerSession) //TODO verify is user is created if not then redirect to create user
	}

	public async signOut() {
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
