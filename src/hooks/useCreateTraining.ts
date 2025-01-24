import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'

export type useCreateTrainingParams = {
  name: string
  description?: string | null
}

/**
 * Hook used to insert a new training type into 'training_types' table.
 * @param params - Object containing the name and description.
 * @returns The id of the new training, loading status, and error.
 */
export function useCreateTraining () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const createTraining = async (params: useCreateTrainingParams): Promise<{ id: number } | void> => {
    const { name, description } = params

    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    const query = await db.prepareAsync(`
      INSERT INTO training_types (name, description) VALUES ($name, $description);
    `)

    try {
      const response = await query.executeAsync({
        $name: name,
        $description: description ?? null
      })
      const id = response.lastInsertRowId
      return { id }
    } catch (error) {
      setError(error as Error)
    } finally {
      await query.finalizeAsync()
      setLoading(false)
    }
  }

  return { createTraining, loading, error }
}
