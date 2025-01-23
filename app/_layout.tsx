import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SQLiteProvider } from 'expo-sqlite'
import { initDatabase } from '../src/database/initDatabase'

export default function Layout () {
  return (
    <SQLiteProvider databaseName='sqlite.db' onInit={initDatabase}>
      <Tabs>
        <Tabs.Screen name='add-training/index' options={{
          headerShown: false,
          tabBarLabel: 'Add Training',
          tabBarIcon: ({ color, size }) => <Ionicons name='add' color={color} size={size} />
        }} />
        <Tabs.Screen name='index' options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
        }} />
      </Tabs>
    </SQLiteProvider>
  )
}
