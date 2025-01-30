import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { useCreateTraining } from '../../../../src/hooks'
import { useState } from 'react'
import { CreateExerciseForm, ExercisesTable } from '../../../../src/components'
import { Button, Text, TextInput } from 'react-native-paper'
import { Exercise } from '../../../../src/types'
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

        <ExercisesTable exercises={exercises} />
      </View>

      <Button
        onPress={handleCreateClick}
      >
        Create
      </Button>

      {open && (
        <CreateExerciseForm
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
