import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useGetTrainingById, GetTrainingByIdResult } from '../../../../src/hooks'
import { ExercisesTable } from '../../../../src/components'

export default function EditType () {
  const { id } = useLocalSearchParams()
  const { getTrainingById } = useGetTrainingById()

  const [trainingData, setTrainingData] = useState<GetTrainingByIdResult | null>(null)

  useFocusEffect(
    useCallback(() => {
      const getById = async () => {
        if (!id || Array.isArray(id)) return
        const trainingData = await getTrainingById(Number(id))
        setTrainingData(trainingData || null)
      }

      getById()
    }, [id])
  )

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{trainingData?.training.name}</Text>
      <Text variant="bodyLarge">
        {trainingData?.training.description || 'No Description'}
      </Text>

      <View style={{ padding: 16 }}>
        <Text variant='titleLarge'>Exercises</Text>

        <ExercisesTable exercises={trainingData?.exercises ?? []} />
      </View>
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
