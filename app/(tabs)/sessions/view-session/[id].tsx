import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { SessionLog } from '../../../../src/types'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { GetTrainingDataByIdResult, useGetSessionLogsBySessionId, useGetTrainingDataById } from '../../../../src/hooks'
import { useCallback, useState } from 'react'
import { LogDataSection } from '../../../../src/components'

export default function ViewSessionPage () {
  const [sessionLogs, setSessionLogs] = useState<SessionLog[] | null>(null)
  const [trainingData, setTrainingData] = useState<GetTrainingDataByIdResult | null>()
  const { id, trainingTypeId } = useLocalSearchParams()

  const { getSessionLogsBySessionId } = useGetSessionLogsBySessionId()
  const { getTrainingDataById } = useGetTrainingDataById()

  useFocusEffect(
    useCallback(() => {
      const getSessionLogs = async () => {
        const sessionLogs = await getSessionLogsBySessionId(Number(id))
        setSessionLogs(sessionLogs!.sessionLogs)

        const trainingData = await getTrainingDataById(Number(trainingTypeId))
        setTrainingData(trainingData || null)
      }
      getSessionLogs()
    }, [])
  )

  const getExerciseNameById = (exerciseId: number) => {
    const exercise = trainingData?.exercises.find((exercise) => {
      if (exercise.id === exerciseId) return exercise
    })
    return exercise?.name
  }

  const aggregatedLogs = sessionLogs?.reduce((acc, log) => {
    if (!acc[log.exerciseId!]) {
      acc[log.exerciseId!] = []
    }

    acc[log.exerciseId!].push(log)

    return acc
  }, {} as Record<number, SessionLog[]>)

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{trainingData?.training.name}</Text>
      <Text variant="bodyLarge">
        {trainingData?.training.description || 'No Description'}
      </Text>

      {aggregatedLogs &&
        Object.entries(aggregatedLogs).map(([exerciseId, logs]) => (
          <View key={exerciseId}>
            <Text>{getExerciseNameById(Number(exerciseId))}</Text>

            <LogDataSection logs={logs} />
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
  },
  container: {
    gap: 10,
    padding: 14
  }
})
