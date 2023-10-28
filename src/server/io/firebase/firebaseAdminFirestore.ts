import { initializeFirestore } from "firebase-admin/firestore"
import app from "./firebaseAdminApp"

const db = initializeFirestore(app)

export default db
