import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { Exercise } from '../types/Exercise'

export type useCreateTrainingParams = {
  name: string
  description?: string | null
  exercises: Exercise[]
}

/**
 * Hook used to insert a new training type into 'training_types' table.
 * Includes inserting related exercises.
 * @param params - Object containing the name, description and exercises.
 * @returns The id of the new training, loading status, and error.
 */
export function useCreateTraining () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const createTraining = async (params: useCreateTrainingParams): Promise<{ id: number } | void> => {
    const { name, description, exercises } = params

    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    const insertTrainingQuery = await db.prepareAsync(`
      INSERT INTO training_types (name, description) VALUES ($name, $description);
    `)

    try {
      // Starts transaction
      await db.execAsync('BEGIN TRANSACTION')

      // Insert new training type
      const { lastInsertRowId: newTrainingId } = await insertTrainingQuery.executeAsync({
        $name: name,
        $description: description ?? null
      })

      for (const exercise of exercises) {
        const insertExerciseQuery = await db.prepareAsync(`
          INSERT INTO exercises (training_type_id, name, sets, note)
          VALUES ($trainingId, $name, $sets, $note);
        `)

        await insertExerciseQuery.executeAsync({
          $trainingId: newTrainingId,
          $name: exercise.name,
          $sets: exercise.sets,
          $note: exercise.note ?? null
        })

        await insertExerciseQuery.finalizeAsync()

        // Commit transaction
        await db.execAsync('COMMIT')
      }

      return { id: newTrainingId }
    } catch (error) {
      setError(error as Error)

      // Rollback transaction on error
      await db.execAsync('ROLLBACK')
    } finally {
      await insertTrainingQuery.finalizeAsync()
      setLoading(false)
    }
  }

  return { createTraining, loading, error }
}
