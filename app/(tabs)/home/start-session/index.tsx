import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useCallback, useState } from 'react'
import { GetTrainingDataByIdResult, useAddSession, useGetTrainingDataById, useListTrainings } from '../../../../src/hooks'
import { TrainingType } from '../../../../src/types'
import { useFocusEffect } from 'expo-router'
import { ExercisesTable } from '../../../../src/components'

export default function StartSession () {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([])
  const [selectedTrainingData, setSelectedTrainingData] = useState<GetTrainingDataByIdResult | null>(null)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const { listTrainings } = useListTrainings()
  const { getTrainingDataById } = useGetTrainingDataById()
  const { addSession } = useAddSession()

  useFocusEffect(
    useCallback(() => {
      const list = async () => {
        const trainings = await listTrainings()
        setTrainingTypes(trainings ?? [])
      }
      list()
    }, []))

  const handleTrainingSelected = async (trainingTypeId: number | null) => {
    if (!trainingTypeId) return
    const { id: newSessionId } = await addSession({ trainingTypeId }) as { id: number } //TO-DO: improve return
    setSessionId(newSessionId)

    const trainingData = await getTrainingDataById(trainingTypeId!) as GetTrainingDataByIdResult
    setSelectedTrainingData(trainingData)
  }

  return (
    <View style={{ padding: 20 }}>
      <Picker
        selectedValue={selectedTrainingData?.training.id}
        enabled={!sessionId}
        onValueChange={(selectedId: number | null) => handleTrainingSelected(selectedId)}
      >
        <Picker.Item label={'Select a training type'} value={null} />
        {trainingTypes?.map((training) => (
          <Picker.Item key={training.id} label={training.name} value={training.id} />
        ))}
      </Picker>

      {selectedTrainingData?.exercises && selectedTrainingData.exercises.length > 0 && (
        <ExercisesTable exercises={selectedTrainingData.exercises} />
      )}
    </View>
  )
}
