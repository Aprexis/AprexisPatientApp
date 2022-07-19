import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../assets/styles'

function LazyPlaceholder({ route }) {
  return (
    <View style={styles.scene}>
      <Text>Loading {route.title}…</Text>
    </View>
  )
}

export { LazyPlaceholder }
