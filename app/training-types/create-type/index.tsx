import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { useCreateTraining } from '../../../src/hooks'
import { useState } from 'react'
import { CreateTrainingForm, ExerciseListCard } from '../../../src/components'
import { Button, Text, TextInput } from 'react-native-paper'
import { Exercise } from '../../../src/types'
import { router } from 'expo-router'

export default function CreateType () {
  const [open, setOpen] = useState<boolean>(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [trainingName, setTrainingName] = useState<string | undefined>(undefined)
  const [trainingDescription, setTrainingDescription] = useState<string | undefined>(undefined)
  const { createTraining } = useCreateTraining()

  const handleCreateClick = async (event: GestureResponderEvent) => {
    event.preventDefault()

    if (!trainingName) {
      alert('Name is required.')
      return
    }

    await createTraining({
      name: trainingName,
      description: trainingDescription,
      exercises
    })

    router.push('/training-types')
  }

  const handleAddExercise = (newExercise: Exercise) => {
    setExercises((prev) => [...prev, newExercise])
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Name"
        value={trainingName}
        onChangeText={(value: string) => setTrainingName(value)}
      />

      <TextInput
        style={styles.input}
        label="Description (optional)"
        value={trainingDescription}
        onChangeText={(value: string) => setTrainingDescription(value)}
      />

      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant='titleLarge'>Exercises</Text>
          <Button
            mode='contained'
            onPress={() => setOpen(true)}
            contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
          >
            Add
          </Button>
        </View>

        <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
          <Text style={{ flex: 3, fontWeight: 'bold' }}>Name</Text>
          <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Sets</Text>
          <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Note</Text>
        </View>

        {exercises.length === 0 && (
          <Text>No exercises found</Text>
        )}
        {exercises.map((exercise, index) => (
          <ExerciseListCard key={`exercise-${index}`} exercise={exercise} />
        ))}
      </View>

      <Button
        onPress={handleCreateClick}
      >
        Create
      </Button>

      {open && (
        <CreateTrainingForm
          onClose={() => setOpen(false)}
          onSubmit={handleAddExercise}
        />
      )}
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
