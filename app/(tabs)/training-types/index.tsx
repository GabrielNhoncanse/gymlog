import { Button, Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { FlatList, View, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { useListTrainings } from '../../../src/hooks'
import { TrainingType } from '../../../src/types'
import { ListCard } from '../../../src/components'

export default function TrainingTypes () {
  const { listTrainings } = useListTrainings()
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[] | null>([])

  useFocusEffect(
    useCallback(() => {
      const list = async () => {
        const trainings = await listTrainings()
        setTrainingTypes(trainings ?? [])
      }
      list()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Button mode='elevated' onPress={() => router.push('/training-types/create-type')}>
        <Ionicons name='add' color={'black'} />
        Add new training
      </Button>

      <FlatList
        data={trainingTypes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.typesContainer}
        renderItem={({ item }) => (
          <ListCard key={item.id} onPress={() => router.push(`/training-types/edit-type/${item.id}`)}>
            <Text>{item.name}</Text>
          </ListCard>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    gap: 10,
    padding: 10
  },
  typesContainer: {
    width: '100%',
    height: 100,
    marginVertical: 20,
    justifyContent: 'space-around'
  }
})
