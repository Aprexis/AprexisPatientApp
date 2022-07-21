import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function MedicationInteractions(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.medicationInteractions.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

const MemoizedMedicationInteractions = React.memo(MedicationInteractions)
export { MemoizedMedicationInteractions as MedicationInteractions }

const styles = StyleSheet.create(
  {
    medicationInteractions: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
