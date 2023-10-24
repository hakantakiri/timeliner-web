import { initializeApp } from "firebase/app"
import * as firebaseConfig from "../../secrets/firebase-sdk.json"

const app = initializeApp(firebaseConfig)
export { app }
