import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { useCallback, useEffect, useState } from 'react'
import { GetTrainingByIdResult, useGetTrainingById, useListTrainings } from '../../../../src/hooks'
import { Exercise, TrainingType } from '../../../../src/types'
import { useFocusEffect } from 'expo-router'
import { ExercisesTable } from '../../../../src/components'

export default function StartSession () {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const { listTrainings } = useListTrainings()
  const { getTrainingById } = useGetTrainingById()

  useFocusEffect(
    useCallback(() => {
      const list = async () => {
        const trainings = await listTrainings()
        setTrainingTypes(trainings ?? [])
      }
      list()
    }, []))

  const handleTrainingSelected = async (trainingId: number) => {
    const trainingData = await getTrainingById(trainingId!) as GetTrainingByIdResult
    setExercises(trainingData.exercises)
  }

  return (
    <View style={{ padding: 20 }}>
      <Picker
        onValueChange={(selectedId: number) => handleTrainingSelected(selectedId)}>
        {trainingTypes?.map((training) => (
          <Picker.Item key={training.id} label={training.name} value={training.id} />
        ))}
      </Picker>

      {exercises.length !== 0 && (
        <ExercisesTable exercises={exercises} />
      )}
    </View>
  )
}
