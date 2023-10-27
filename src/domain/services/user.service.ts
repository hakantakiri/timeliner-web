import User from "../models/user.model"
import db from "@/io/firebase/firebaseFirestore"
import { doc, getDoc } from "firebase/firestore"

class UserService {
	private getById = async (id: string) => {
		const ref = doc(db, "users", id)
		const snap = await getDoc(ref)
		return snap.data()
	}

	public async getUserById(userId: string): Promise<User | null> {
		const user: User = (await this.getById(userId)) as User
		return user
	}
}

export default new UserService()
