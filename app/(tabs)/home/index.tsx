import { StyleSheet, Text, View } from 'react-native'

export default function Home () {
  return (
    <View style={styles.container}>
      <Text>TESTEEEE HOMEEE</Text>
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
