import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { SessionLog } from '../types'

type LogDataTableProps = {
  logs: SessionLog[]
}

export function LogDataSection (props: LogDataTableProps) {
  const { logs } = props

  return (
    <View>

      {logs.map((log) => (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Set {log.setNumber}</Text>

          <Text>Load: {log.load}</Text>
          <Text>Repetitions: {log.repetitions}</Text>
          {log.rir && (<Text>RIR: {log.rir}</Text>)}
          {log.note && (<Text>Note: {log.note}</Text>)}

        </View>
      ))}
    </View>
  )
}
