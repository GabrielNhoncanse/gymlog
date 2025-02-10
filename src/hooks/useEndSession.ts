import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { useSessionContext } from './useSessionContext'

type AddSessionSetParams = {
  sessionId: number
}

export function useEndSession () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()
  const { sessionLogs } = useSessionContext()

  const endSession = async (params: AddSessionSetParams): Promise<void> => {
    const { sessionId } = params
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)

    const endDate = new Date().toISOString().replace('T', ' ').split('.')[0]

    const updateSessionEndDate = await db.prepareAsync(`
      UPDATE sessions SET end_date = $endDate WHERE id = $sessionId;
    `)

    const insertSessionLog = await db.prepareAsync(`
      INSERT INTO session_logs (session_id, exercise_id, set_number, load, repetitions, rir, note)
      VALUES ($sessionId, $exerciseId, $setNumber, $load, $repetitions, $rir, $note);
    `)

    try {
      await updateSessionEndDate.executeAsync({
        $endDate: endDate,
        $sessionId: sessionId
      })

      for (const exerciseId of Object.keys(sessionLogs)) {
        for (const log of sessionLogs[Number(exerciseId)]) {
          await insertSessionLog.executeAsync([
            sessionId,
            Number(exerciseId),
            log.setNumber,
            log.load,
            log.repetitions,
            log.rir ?? null,
            log.note ?? null
          ])
        }
      }
      await insertSessionLog.finalizeAsync()

      return
    } catch (error) {
      setError(error as Error)
      return
    } finally {
      await updateSessionEndDate.finalizeAsync()
      setLoading(false)
    }
  }

  return { endSession, loading, error }
}
