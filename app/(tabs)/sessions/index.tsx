import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Session } from '../../../src/types'
import { router, useFocusEffect } from 'expo-router'
import { useListSessions } from '../../../src/hooks'
import { ListCard } from '../../../src/components'

export default function SessionsPage () {
  const [previousSessions, setPreviousSessions] = useState<Session[] | null>(null)
  const { listSessions } = useListSessions()

  useFocusEffect(
    useCallback(() => {
      const list = async () => {
        const sessions = await listSessions()
        setPreviousSessions(sessions ?? [])
      }
      list()
    }, [])
  )

  return (
    <View style={styles.container}>

      <FlatList
        data={previousSessions}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.typesContainer}
        renderItem={({ item }) => (
          <ListCard onPress={() => router.push(`sessions/view-session/${item.id}?trainingTypeId=${item.trainingTypeId}`)}>
            <Text>{item.trainingName}</Text>
            <Text>{formatDate(item.startDate)}</Text>
          </ListCard>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    gap: 10,
    padding: 10,
    paddingBottom: 0
  },
  typesContainer: {
    width: '100%',
    height: 100,
    marginVertical: 20,
    justifyContent: 'space-around'
  }
})

function formatDate (dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
