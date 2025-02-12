import { View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { Exercise, SessionLog } from '../types'

type SessionSetInputsProps = {
  exercise: Exercise
  previousLogs: SessionLog[]
  onSetChange: (exerciseId: number, setNumber: number, field: string, value: string) => void
}

export function SessionSetInputs (props: SessionSetInputsProps) {
  const { exercise, previousLogs, onSetChange } = props

  return (
    <View>
      <Text>{exercise.name}</Text>
      {[...Array(exercise.sets)].map((_, index) => (
        <View key={index}>
          <Text>Set {index + 1}</Text>
          <TextInput
            placeholder={`Load (kg) - ${previousLogs[index]?.load}`}
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'load', value)}
          />
          <TextInput
            placeholder={`Repetitions - ${previousLogs[index].repetitions}`}
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'repetitions', value)}
          />
          <TextInput
            placeholder={`RIR - ${previousLogs[index].rir ?? ''}`}
            keyboardType="numeric"
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'rir', value)}
          />
          <TextInput
            placeholder={`Note - ${previousLogs[index].note ?? ''}`}
            onChangeText={(value) => onSetChange(exercise.id!, index + 1, 'note', value)}
          />
        </View>
      ))}
    </View>
  )
}
