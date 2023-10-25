import User from "./user.model"
import { User as FirebaseUser } from "firebase/auth"

export default interface Session {
	user: User
	providerSession: FirebaseUser
}
