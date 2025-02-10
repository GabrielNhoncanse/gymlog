import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { SessionLog } from '../types'

export type GetSessionLogsBySessionIdResult = {
  sessionLogs: SessionLog[]
}

export function useGetSessionLogsBySessionId () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const getSessionLogsBySessionId = async (id: number): Promise<GetSessionLogsBySessionIdResult | void> => {
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    const getSessionLogsQuery = await db.prepareAsync(`
      SELECT
        id,
        exercise_id AS exerciseId,
        set_number AS setNumber,
        load,
        repetitions,
        rir,
        note
      FROM session_logs
      WHERE session_id = $sessionId;
    `)

    try {
      const getSessionLogsResult = await getSessionLogsQuery.executeAsync({
        $sessionId: id
      })
      const sessionLogs = await getSessionLogsResult.getAllAsync() as SessionLog[]

      return { sessionLogs }
    } catch (error) {
      setError(error as Error)
      return
    } finally {
      await getSessionLogsQuery.finalizeAsync()
      setLoading(false)
    }
  }

  return { getSessionLogsBySessionId, loading, error }
}
