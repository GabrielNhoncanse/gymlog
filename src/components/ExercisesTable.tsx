import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Exercise } from '../types'
import { ExerciseListCard } from './ExerciseListCard'

type ExercisesTableProps = {
  exercises: Exercise[]
}

export function ExercisesTable (props: ExercisesTableProps) {
  const { exercises } = props

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
        <Text style={{ flex: 3, fontWeight: 'bold' }}>Name</Text>
        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Sets</Text>
        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Note</Text>
      </View>

      {exercises.length === 0 && (
        <Text>No exercises added</Text>
      )}
      {exercises.map((exercise, index) => (
        <ExerciseListCard key={`exercise-${index}`} exercise={exercise} />
      ))}
    </View>
  )
}
