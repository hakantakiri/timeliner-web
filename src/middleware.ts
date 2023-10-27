import { NextRequest, NextResponse } from "next/server"
import {
	PROTECTED_ROUTES,
	REDIRECT_WHEN_AUTHORIZED,
} from "./app/auth/protectedRoutes"

export const middleware = async (req: NextRequest) => {
	const routeName = getRouteName(req)
	if (PROTECTED_ROUTES.includes(routeName)) {
		console.log(`🔒 Route ${routeName} is protected.`)

		let firebaseIdToken = req.cookies.get("firebaseIdToken")?.value
		let authorized: boolean = await isAuth(firebaseIdToken)

		if (!authorized) {
			console.log("❌ No autorizado")
			const absoluteURL = new URL("/", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		} else {
			console.log("✅ Autorizado")
			return NextResponse.next()
		}
	}

	if (REDIRECT_WHEN_AUTHORIZED.includes(routeName)) {
		console.log(`🔒 Route ${routeName} only when not authorized.`)
		let firebaseIdToken = req.cookies.get("firebaseIdToken")?.value
		let authorized: boolean = await isAuth(firebaseIdToken)
		if (authorized) {
			console.log("❌ Already authorized. Going to /profile.")
			const absoluteURL = new URL("/profile", req.nextUrl.origin)
			return NextResponse.redirect(absoluteURL.toString())
		} else {
			console.log("✅ Can stay here, there is no session")
			return NextResponse.next()
		}
	}

	return NextResponse.next()
}

const getRouteName = (req: NextRequest) => {
	return req.nextUrl.pathname
}

const isAuth = async (idToken: string | undefined) => {
	return idToken ? true : false
}
