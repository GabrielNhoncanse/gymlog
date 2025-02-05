import { View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { Exercise } from '../types'

type SessionSetProps = {
  exercise: Exercise
  onSetChange: (exerciseId: number, setNumber: number, field: string, value: string) => void
}

export function SessionSet (props: SessionSetProps) {
  const { exercise, onSetChange } = props

  return (
    <View>
      <Text>{exercise.name}</Text>
      {[...Array(exercise.sets)].map((_, index) => (
        <View key={index}>
          <Text>Set {index + 1}</Text>
          <TextInput
            placeholder="Load (kg)"
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'load', value)}
          />
          <TextInput
            placeholder="Repetitions"
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'repetitions', value)}
          />
          <TextInput
            placeholder="RIR"
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'rir', value)}
          />
          <TextInput
            placeholder="Note"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'note', value)}
          />
        </View>
      ))}
    </View>
  )
}
