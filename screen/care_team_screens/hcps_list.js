import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { styles } from '../../assets/styles'

function HcpsList(_props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.mainBody}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Not implemented yet</Text>
    </ScrollView>
  )
}

export { HcpsList }
