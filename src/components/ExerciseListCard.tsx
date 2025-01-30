import { View, StyleSheet } from 'react-native'
import { Exercise } from '../types'
import { Modal, Portal, Text } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState } from 'react'

type ExerciseListCardProps = {
  exercise: Exercise
}

export function ExerciseListCard (props: ExerciseListCardProps) {
  const { exercise } = props
  const { name, sets, note } = exercise
  const [noteOpen, setNoteOpen] = useState<boolean>(false)

  const changeNoteVisibility = () => {
    if (note) {
      setNoteOpen(!noteOpen)
    }
  }

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
      <Text style={{ flex: 3 }}>{name}</Text>
      <Text style={{ flex: 1, textAlign: 'right' }}>{sets}</Text>
      <Text style={{ flex: 1, textAlign: 'right' }} onPress={changeNoteVisibility}>
        <MaterialIcons name="notes" size={24} color={note ? 'black' : 'lightgrey'} />
      </Text>

      <Portal>
        <Modal visible={noteOpen} contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Note</Text>
            <MaterialIcons name="close" size={24} onPress={changeNoteVisibility} />
          </View>
          <Text style={styles.modalContent}>{note}</Text>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContent: {
    textAlign: 'center',
    fontSize: 16
  },
})
