import { Stack } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { PaperProvider } from 'react-native-paper'
import { theme } from '../src/theme/theme'
import { initDatabase } from '../src/database/initDatabase'


export default function Layout () {
  return (
    <PaperProvider theme={theme}>
      <SQLiteProvider databaseName='sqlite.db' onInit={initDatabase}>
        <Stack>
          <Stack.Screen name='index' options={{
            headerShown: false
          }} />
          <Stack.Screen name='(tabs)' options={{
            headerShown: false
          }} />
        </Stack>
      </SQLiteProvider>
    </PaperProvider >
  )
}
