import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function CheckInteractions(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.checkInteractions.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

export { CheckInteractions }

const styles = StyleSheet.create(
  {
    checkInteractions: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
