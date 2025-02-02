import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { SessionLog } from '../types'

type AddSessionSetParams = {
  sessionId: number
  exerciseId: number
  sessionLog: SessionLog
}

export function useAddSessionSet () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const addSessionSet = async (params: AddSessionSetParams): Promise<{ id: number } | void> => {
    const { sessionId, exerciseId, sessionLog } = params
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    const query = await db.prepareAsync(`
      INSERT INTO session_logs (session_id, exercise_id, set_number, load, repetitions, rir, note)
      VALUES ($sessionId, $exerciseId, $setNumber, $load, $repetitions, $rir, $note);
    `)

    try {
      const { lastInsertRowId: newSessionId } = await query.executeAsync({
        $sessionId: sessionId,
        $exerciseId: exerciseId,
        $setNumber: sessionLog.setNumber,
        $load: sessionLog.load,
        $repetitions: sessionLog.repetitions,
        $rir: sessionLog.rir ?? null,
        $note: sessionLog.note ?? null
      })

      return { id: newSessionId }
    } catch (error) {
      setError(error as Error)
      return
    } finally {
      await query.finalizeAsync()
      setLoading(false)
    }
  }

  return { addSessionSet, loading, error }
}
