import Session from "@/domain/models/session.model"
import { useState } from "react"

const useSessionState = () => {
	const [sessionState, setState] = useState<Session | null>(null)
	const setSessionState = (session: Session | null) => {
		setState(session)
	}
	return {
		sessionState,
		setSessionState,
	}
}

export default useSessionState
