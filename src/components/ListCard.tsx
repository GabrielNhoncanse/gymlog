import { StyleSheet } from 'react-native'
import { ReactNode } from 'react'
import { Card } from 'react-native-paper'

type ListCardProps = {
  children: ReactNode
  onPress: () => void
}

export function ListCard (props: ListCardProps) {
  const { children, onPress } = props

  return (
    <Card style={styles.container} onPress={onPress}>
      {children}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    width: '40%',
    borderRadius: 8,
    padding: 10
  }
})
