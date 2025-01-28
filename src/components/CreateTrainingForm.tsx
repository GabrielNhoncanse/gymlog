import { Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import { Exercise } from '../../app/training-types/create-type'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  sets: yup.number().required('Sets is a required field').positive('Sets must be a positive number').integer('Sets must be an integer'),
  note: yup.string().nullable()
})

type createTrainingFormProps = {
  onClose: () => void
  onSubmit: (exercise: Exercise) => void
}

export function CreateTrainingForm (props: createTrainingFormProps) {
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
                mode='outlined'
                label='Name'
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && <Text>{errors.name}</Text>}

              <TextInput
                mode='outlined'
                label='Number of sets'
                value={values.sets.toString()}
                onChangeText={handleChange('sets')}
                keyboardType='numeric'
              />
              {errors.sets && <Text>{errors.sets}</Text>}

              <TextInput
                mode='outlined'
                label='Note (optional)'
                value={values.note ?? ''}
                onChangeText={handleChange('note')}
              />
              {errors.note && <Text>{errors.note}</Text>}

              <View style={styles.buttonsContainer}>
                <Button onPress={() => handleSubmit()}>
                  Create
                </Button>
                <Button
                  mode='text'
                  onPress={() => {
                    resetForm()
                    onClose()
                  }}
                >
                  Cancel
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
    margin: 20
  }
})

