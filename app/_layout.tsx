import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SQLiteProvider } from 'expo-sqlite'
import { initDatabase } from '../src/database/initDatabase'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { PaperProvider } from 'react-native-paper'

export default function Layout () {
  return (
    <PaperProvider>
      <SQLiteProvider databaseName='sqlite.db' onInit={initDatabase}>
        <Tabs>
          <Tabs.Screen name='training-types' options={{
            headerShown: false,
            tabBarLabel: 'Training Types',
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
          }} />
          <Tabs.Screen name='index' options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
          }} />
        </Tabs>
      </SQLiteProvider>
    </PaperProvider>
  )
}
