import { Stack } from 'expo-router'

export default function Layout () {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false
      }} />
      <Stack.Screen name='create-type/index' options={{
        title: 'New training type'
      }} />
      <Stack.Screen name='edit-type/[id]' options={{
        title: 'Edit training type'
      }} />
    </Stack>
  )
}
