import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { Exercise, TrainingType } from '../types'

export type GetTrainingDataByIdResult = {
  training: TrainingType
  exercises: Exercise[]
}

export function useGetTrainingDataById () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const db = useSQLiteContext()

  const getTrainingDataById = async (id: number): Promise<GetTrainingDataByIdResult | void> => {
    if (!db) {
      setError(new Error('An error occurred while getting the database.'))
      return
    }

    setLoading(true)
    const getTrainingQuery = await db.prepareAsync(`
      SELECT * FROM training_types WHERE id = $id;
    `)

    const getExercisesQuery = await db.prepareAsync(`
      SELECT * FROM exercises WHERE training_type_id = $training_type_id;
    `)

    try {
      const getTrainingResult = await getTrainingQuery.executeAsync({
        $id: id
      })
      const trainingData = await getTrainingResult.getFirstAsync() as TrainingType

      if (!trainingData) {
        setError(new Error('Training not found'))
        return
      }

      const getExercisesResult = await getExercisesQuery.executeAsync({
        $training_type_id: trainingData.id
      })
      const exercisesData = await getExercisesResult.getAllAsync() as Exercise[]

      return { training: trainingData, exercises: exercisesData }
    } catch (error) {
      setError(error as Error)
      return
    } finally {
      await getTrainingQuery.finalizeAsync()
      if (getExercisesQuery) await getExercisesQuery.finalizeAsync()
      setLoading(false)
    }
  }

  return { getTrainingDataById, loading, error }
}
