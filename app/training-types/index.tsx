import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import { useCreateTraining } from '../../src/hooks'
import { Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'

export default function TrainingTypes () {
  const handleCreateClick = () => {
    router.push('/training-types/create-type')
  }

  return (
    <View style={styles.container}>
      <Text>ADD TRAINIaaaNG</Text>
      <Button mode='elevated' onPress={handleCreateClick}>
        <Ionicons name='add' color={'black'} />
        Adicionar novo treino
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    gap: 10,
    padding: 10
  }
})
