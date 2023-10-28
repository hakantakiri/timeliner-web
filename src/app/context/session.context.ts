import Session from "@/domain/models/session.model"
import { createContext } from "react"

const SessionContext = createContext<Session | null>(null)

export default SessionContext
