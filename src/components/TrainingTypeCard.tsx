import { Pressable, StyleSheet } from 'react-native'
import { TrainingType } from '../types'
import { Text } from 'react-native-paper'
import { router } from 'expo-router'

type TrainingTypeCardProps = {
  training: TrainingType
}

export function TrainingTypeCard (props: TrainingTypeCardProps) {
  const { id, name } = props.training

  return (
    <Pressable style={styles.container} onPress={() => router.push(`/training-types/edit-type/${id}`)}>
      <Text>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    width: '40%',
    borderRadius: 8,
    padding: 10
  }
})
