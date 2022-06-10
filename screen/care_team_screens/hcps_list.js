import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function HcpsList(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.hcps.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

export { HcpsList }

const styles = StyleSheet.create(
  {
    hcps: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
