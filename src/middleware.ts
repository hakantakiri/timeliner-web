import { NextRequest, NextResponse } from "next/server"
import {
	PROTECTED_ROUTES,
	REDIRECT_TO_FINISH_SIGNUP,
	REDIRECT_WHEN_AUTHORIZED,
	RETURN_TO_START_SIGNUP,
} from "./app/auth/protectedRoutes"
import { getUserById } from "./middleware/userMiddleware.service"
import {
	ProviderSession,
	isAuthByProvider,
} from "./middleware/authMiddleware.service"
import User from "./domain/models/user.model"

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
	const routeName = getRouteName(req)
	if (PROTECTED_ROUTES.includes(routeName)) {
		console.log(`🔒 Route ${routeName} is protected.`)

		let firebaseIdToken = req.cookies.get("firebaseIdToken")?.value
		let authorized: authType = await isAuth(firebaseIdToken)
		if (authorized !== authType.AUTHORIZED) {
			console.log("❌ Not authorized")
			const absoluteURL = new URL("/signup", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		} else {
			console.log("✅ Authorized")
			return NextResponse.next()
		}
	}

	if (REDIRECT_WHEN_AUTHORIZED.includes(routeName)) {
		console.log(`🔒 Route ${routeName} only when not authorized.`)
		let firebaseIdToken = req.cookies.get("firebaseIdToken")?.value
		let authorized: authType = await isAuth(firebaseIdToken)

		if (authorized === authType.AUTHORIZED) {
			console.log("❌ Already authorized. Going to /profile.")
			const absoluteURL = new URL("/profile", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		}
		if (
			authorized === authType.FINISH_SIGNUP &&
			REDIRECT_TO_FINISH_SIGNUP.includes(routeName)
		) {
			const absoluteURL = new URL("/signup/complete", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		}

		if (
			authorized === authType.NO_SESSION &&
			RETURN_TO_START_SIGNUP.includes(routeName)
		) {
			const absoluteURL = new URL("/signup", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		}

		console.log("✅ Can stay here, there is no session")
		return NextResponse.next()
	}

	return NextResponse.next()
}

const getRouteName = (req: NextRequest) => {
	return req.nextUrl.pathname
}

enum authType {
	AUTHORIZED,
	FINISH_SIGNUP,
	NO_SESSION,
}
const isAuth = async (idToken: string | undefined): Promise<authType> => {
	let providerSession: ProviderSession | null = await isAuthByProvider(
		idToken
	)
	if (!providerSession) {
		console.log("Couldn't retrieve provider session.")
		return authType.NO_SESSION
	}

	let registeredUser: User | null = await getUserById(providerSession.localId)
	if (!registeredUser) {
		console.log("User has provider session but is not signed up.")
		return authType.FINISH_SIGNUP
	}
	return authType.AUTHORIZED
}
