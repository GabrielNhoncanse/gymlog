import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'

/**
 * Hook used to retrieve the most recent completed session for a given training type.
 * @param trainingTypeId - The Id of the training type to search for.
 * @returns The Id of the most recent completed session, loading status, and error.
 */
export function useGetPreviousSessionId () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const getPreviousSessionId = async (trainingTypeId: number): Promise<{ id: number } | void> => {
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    try {
      const query = await db.prepareAsync(`
        SELECT id
        FROM sessions
        WHERE training_type_id = $trainingTypeId
        AND end_date IS NOT NULL
        ORDER BY end_date DESC
        LIMIT 1;
      `)

      const queryResult = await query.executeAsync({
        $trainingTypeId: trainingTypeId
      })
      const latestSessionId = await queryResult.getFirstAsync() as { id: number }

      return { id: latestSessionId.id }
    } catch (error) {
      setError(error as Error)
      return
    } finally {
      setLoading(false)
    }
  }

  return { getPreviousSessionId, loading, error }
}
