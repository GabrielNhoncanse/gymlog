import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { TrainingType } from '../types'

/**
 * Hook used to list all existing training types.
 * @returns The list of training types, loading status, and error.
 */
export function useListTrainings () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const listTrainings = async (): Promise<TrainingType[] | void> => {
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    const query = 'SELECT * FROM training_types'

    setLoading(true)
    try {
      const response = await db.getAllAsync<TrainingType>(query)
      return response
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { listTrainings, loading, error }
}
