import User from "./user.model"
import { User as FirebaseUser } from "firebase/auth"
import UserToCreate from "./userToCreate.mode"

export default interface IncompleteSession {
	user?: User | UserToCreate
	providerSession: FirebaseUser
}
