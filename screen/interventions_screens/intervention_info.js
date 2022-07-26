import React from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from '../../assets/styles'

function InterventionInfo(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.mainBody}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

const MemoizedInterventionInfo = React.memo(InterventionInfo)
export { MemoizedInterventionInfo as InterventionInfo }
