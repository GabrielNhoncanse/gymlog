import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useSessionContext } from '../../../src/hooks'

export default function Home () {
  const { clearSession } = useSessionContext()

  const handleStartSession = () => {
    clearSession()
    router.push('/home/start-session')
  }

  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        onPress={handleStartSession}
      >
        Start Session
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
