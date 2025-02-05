import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, useEffect, useState } from 'react'
import { Exercise, SessionLog } from '../../types'
import { SessionContext } from './SessionContext'

type SessionProviderProps = {
  children: ReactNode
}

export function SessionProvider (props: SessionProviderProps) {
  const [sessionLogs, setSessionLogs] = useState<Record<number, SessionLog[]>>({})

  useEffect(() => {
    const loadSessionData = async () => {
      const storedData = await AsyncStorage.getItem('sessionLogs')
      if (storedData) setSessionLogs(JSON.parse(storedData))
    }
    loadSessionData()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('sessionLogs', JSON.stringify(sessionLogs))
  }, [sessionLogs])

  const initSessionLogs = (exercises: Exercise[]) => {
    const initialLogs: Record<number, SessionLog[]> = {}
    exercises.forEach((exercise) => {
      initialLogs[exercise.id!] = Array(exercise.sets).fill(null).map((_, index) => ({
        setNumber: index + 1,
        load: 0,
        repetitions: 0,
        rir: null,
        note: null
      }))
    })
    setSessionLogs(initialLogs)
  }

  const updateSessionLog = (exerciseId: number, setNumber: number, field: string, value: string) => {
    setSessionLogs((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((set) =>
        set.setNumber === setNumber ? { ...set, [field]: value } : set
      )
    }))
  }

  const clearSession = () => {
    setSessionLogs([])
    AsyncStorage.removeItem('sessionLogs')
  }

  return (
    <SessionContext.Provider value={{ sessionLogs, updateSessionLog, initSessionLogs, clearSession }}>
      {props.children}
    </SessionContext.Provider>
  )

}
