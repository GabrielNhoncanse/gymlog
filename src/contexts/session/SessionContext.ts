import { createContext } from 'react'
import { Exercise, SessionLog } from '../../types'

type SessionContextType = {
  sessionLogs: Record<number, SessionLog[]>
  updateSessionLog: (exerciseId: number, setNumber: number, field: string, value: string) => void
  initSessionLogs: (exercises: Exercise[]) => void
  clearSession: () => void
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined)
