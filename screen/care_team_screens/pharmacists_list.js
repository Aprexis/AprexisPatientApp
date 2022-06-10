import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function PharmacistsList(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.pharmacists.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

export { PharmacistsList }

const styles = StyleSheet.create(
  {
    pharmacists: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
