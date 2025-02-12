import { ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useCallback, useState } from 'react'
import { GetTrainingDataByIdResult, useStartSession, useEndSession, useGetTrainingDataById, useListTrainings, useSessionContext, useGetPreviousSessionId, useGetSessionLogsBySessionId, GetSessionLogsBySessionIdResult } from '../../../../src/hooks'
import { SessionLog, TrainingType } from '../../../../src/types'
import { router, useFocusEffect } from 'expo-router'
import { SessionSetInputs } from '../../../../src/components'
import { Button } from 'react-native-paper'

export default function StartSession () {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([])
  const [selectedTrainingData, setSelectedTrainingData] = useState<GetTrainingDataByIdResult | null>(null)
  const [sessionId, setSessionId] = useState<number | null>(null)

  const { sessionLogs, updateSessionLog, initSessionLogs } = useSessionContext()
  const { listTrainings } = useListTrainings()
  const { getTrainingDataById } = useGetTrainingDataById()
  const { startSession } = useStartSession()
  const { endSession } = useEndSession()

  const [previousSessionData, setPreviousSessionData] = useState<GetSessionLogsBySessionIdResult | null>(null)

  const { getPreviousSessionId } = useGetPreviousSessionId()
  const { getSessionLogsBySessionId } = useGetSessionLogsBySessionId()

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
    const { id: newSessionId } = await startSession({ trainingTypeId }) as { id: number } //TO-DO: improve return
    setSessionId(newSessionId)

    const trainingData = await getTrainingDataById(trainingTypeId!) as GetTrainingDataByIdResult
    setSelectedTrainingData(trainingData)

    if (Object.keys(sessionLogs).length === 0) {
      initSessionLogs(trainingData.exercises)
    }

    const latestSessionId = await getPreviousSessionId(trainingTypeId)
    if (latestSessionId) {
      const previousLogs = await getSessionLogsBySessionId(latestSessionId.id)
      setPreviousSessionData(previousLogs!)
    }
  }

  const handleFinishSession = () => {
    endSession({ sessionId: sessionId! })
    router.push('/home')
  }

  const exercises = selectedTrainingData?.exercises

  const aggregatedPreviousLogs = previousSessionData?.sessionLogs?.reduce((acc, log) => {
    if (!acc[log.exerciseId!]) {
      acc[log.exerciseId!] = []
    }

    acc[log.exerciseId!].push(log)

    return acc
  }, {} as Record<number, SessionLog[]>)

  return (
    <ScrollView style={{ padding: 20 }}>
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

      {sessionId && exercises && exercises.length > 0 && exercises.map((exercise) => (
        <SessionSetInputs key={exercise.id} exercise={exercise} onSetChange={updateSessionLog} previousLogs={aggregatedPreviousLogs ? aggregatedPreviousLogs[exercise.id!] : []} />
      ))
      }

      {sessionId && <Button
        onPress={handleFinishSession}>
        Finish session
      </Button>}
    </ScrollView>
  )
}
