import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'

export type AddSessionParams = {
  trainingTypeId: number
}

export function useStartSession () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const startSession = async (params: AddSessionParams): Promise<{ id: number } | void> => {
    const { trainingTypeId } = params
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)

    const startDate = new Date().toISOString().replace('T', ' ').split('.')[0]

    const query = await db.prepareAsync(`
      INSERT INTO sessions (training_type_id, start_date) VALUES ($trainingTypeId, $startDate);
    `)

    try {
      const { lastInsertRowId: newSessionId } = await query.executeAsync({
        $trainingTypeId: trainingTypeId,
        $startDate: startDate
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

  return { startSession, loading, error }
}
