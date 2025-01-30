import { Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import { Exercise } from '../types'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  sets: yup.number().required('Sets is a required field').positive('Sets must be a positive number').integer('Sets must be an integer'),
  note: yup.string().nullable()
})

type createExerciseFormProps = {
  onClose: () => void
  onSubmit: (exercise: Exercise) => void
}

export function CreateExerciseForm (props: createExerciseFormProps) {
  const { onClose, onSubmit } = props

  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={styles.formContainer}>
        <Formik
          initialValues={{ name: '', sets: 1, note: null }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            resetForm()
            onClose()
          }}
        >
          {({ handleChange, handleSubmit, resetForm, values, errors }) => (
            <View>
              <TextInput
                style={styles.input}
                mode='outlined'
                label='Name'
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && <Text>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Number of sets'
                value={values.sets.toString()}
                onChangeText={handleChange('sets')}
                keyboardType='numeric'
              />
              {errors.sets && <Text>{errors.sets}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Note (optional)'
                value={values.note ?? ''}
                onChangeText={handleChange('note')}
              />
              {errors.note && <Text>{errors.note}</Text>}

              <View style={styles.buttonsContainer}>
                <Button
                  onPress={() => {
                    resetForm()
                    onClose()
                  }}
                  textColor='#e67d7a'
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => handleSubmit()}
                >
                  Create
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10
  },
  input: {
    backgroundColor: 'transparent'
  }
})

