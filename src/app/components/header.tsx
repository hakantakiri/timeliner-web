import authService from "@/domain/services/auth.service"
import Link from "next/link"
import { useContext } from "react"
import SessionContext from "../context/session.context"
import Session from "@/domain/models/session.model"

const Header = () => {
	const session: Session | null = useContext(SessionContext)
	const signOut = () => {
		authService.signOut()
	}
	return (
		<div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
			<ul className="flex">
				<li>
					<Link href="/">
						<strong>TIMELINER</strong>
					</Link>
				</li>
			</ul>
			<ul className="flex">
				{!session?.user || !session?.providerSession ? (
					<Link href="/signup">Join</Link>
				) : (
					<button onClick={signOut}>Sign Out</button>
				)}
			</ul>
		</div>
	)
}

export default Header
