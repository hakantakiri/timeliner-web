import * as admin from "firebase-admin"
const serviceAccount = require("@/secrets/firebase-admin-sdk.json")

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://timelinerapp.firebaseio.com",
})

console.log("firebase admin app initialized")

export default app
