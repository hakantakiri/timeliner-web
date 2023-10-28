import { getAuth } from "firebase-admin/auth"
import app from "./firebaseAdminApp"

const serverAuth = getAuth(app)
export default serverAuth
