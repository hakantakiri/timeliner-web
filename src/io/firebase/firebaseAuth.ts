import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./firebaseApp"
import authService from "@/domain/services/auth.service"

const auth = getAuth(app)
onAuthStateChanged(auth, (firebaseSession) => {
	console.log("New firebase Session", firebaseSession)
	authService.updateProviderSession(firebaseSession)
})

export { auth }
