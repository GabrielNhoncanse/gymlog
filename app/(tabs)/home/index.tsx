import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Home () {
  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        onPress={() => router.push('/home/start-session')}
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
