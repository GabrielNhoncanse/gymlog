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
        id,
        training_type_id AS trainingTypeId,
        start_date AS startDate,
        end_date AS endDate
      FROM sessions;
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
