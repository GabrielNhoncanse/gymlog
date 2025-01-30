import { StyleSheet, View } from 'react-native'
import { TrainingType } from '../types'
import { Text } from 'react-native-paper'

type TrainingTypeCardProps = {
  training: TrainingType
}

export function TrainingTypeCard (props: TrainingTypeCardProps) {
  const { name } = props.training

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
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
