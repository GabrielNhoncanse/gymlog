import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Layout () {
  return (
    <Tabs>
      <Tabs.Screen name='training-types' options={{
        headerShown: false,
        tabBarLabel: 'Training Types',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
      }} />
      <Tabs.Screen name='home' options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
      }} />
      <Tabs.Screen name='sessions' options={{
        headerShown: false,
        tabBarLabel: 'Sessions',
        tabBarIcon: ({ color, size }) => <Ionicons name="calendar-clear" size={size} color={color} />
      }} />
    </Tabs>
  )
}
