import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function MedicationAdherence(props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.medicationAdherence.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

const MemoizedMedicationAdherence = React.memo(MedicationAdherence)
export { MemoizedMedicationAdherence as MedicationAdherence }

const styles = StyleSheet.create(
  {
    medicationAdherence: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
