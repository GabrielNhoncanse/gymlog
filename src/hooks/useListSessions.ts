import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { Session } from '../types'

export function useListSessions () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const listSessions = async (): Promise<Session[] | void> => {
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    const query = `
      SELECT
        s.id,
        s.training_type_id AS trainingTypeId,
        s.start_date AS startDate,
        s.end_date AS endDate,
        t.name AS trainingName
      FROM sessions s
      JOIN training_types t on s.training_type_id = t.id
      ORDER BY start_date DESC;
    `

    setLoading(true)
    try {
      const response = await db.getAllAsync<Session>(query)
      return response
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { listSessions, loading, error }
}
