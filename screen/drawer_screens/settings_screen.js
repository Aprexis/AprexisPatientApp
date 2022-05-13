import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }
          }>
          <Text
            style={
              {
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 16
              }
            }>
            Aprexis Patient Application
            {'\n\n'}
            This is the Settings Screen
          </Text>
        </View>
        <Text
          style={
            {
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }
          }>
          Aprexis Patient Application
          {'\n'}
          React Native
        </Text>
        <Text
          style={
            {
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }
          }>
          www.aprexis.com
        </Text>
      </View>
    </SafeAreaView>
  )
}

export { SettingsScreen }
