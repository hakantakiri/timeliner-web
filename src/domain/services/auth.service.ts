import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth"
import { auth } from "@/io/firebase/firebaseAuth"
import { User as FirebaseUser } from "firebase/auth"
import Session from "../models/session.model"
import { deleteCookie, setCookie } from "cookies-next"
import User from "../models/user.model"
import userService from "./user.service"

type SessionListener = (session: Session | null) => void

class AuthService {
	private session: Session
	private sessionListeners: SessionListener[] = []
	private signOutListeners: SessionListener[] = []

	constructor() {
		this.session = {}
	}

	public getSession() {
		return this.session
	}

	public async signInWithGoogle() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithRedirect(auth, googleProvider)
	}

	public async getIdToken() {
		return await auth.currentUser?.getIdToken()
	}

	public async updateProviderSession(
		providerSession: FirebaseUser | null
	): Promise<void> {
		if (!providerSession) return this.emmitSessionChange(null)

		this.session.providerSession = providerSession
		const idToken = await auth.currentUser?.getIdToken()
		setCookie("firebaseIdToken", idToken)
		const user: User | null = await userService.getUserById(
			providerSession.uid
		)
		if (user) this.session.user = user

		this.emmitSessionChange(this.session)
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
