import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

function Allergies(props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.allergies.scrollContext}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

export { Allergies }

const styles = StyleSheet.create(
  {
    allergies: {
      scrollContext: { flexDirection: "column" }
    }
  }
)
